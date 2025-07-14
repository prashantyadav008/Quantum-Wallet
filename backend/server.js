/** @format */

import express from "express";
import { exec } from "child_process";
import multer from "multer";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import cors from "cors";

const app = express();
const PORT = 8080;
const containerName = "quantum-vault";
const basePathInContainer = "/home/quantum-vault/storage";

app.use(cors()); //

// Ensure required folders exist
const downloadsDir = path.join(process.cwd(), "downloads");
const uploadsDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for file uploads (temporary local storage)
const upload = multer({ dest: "uploads/" });

app.use(express.json());

// Get API
app.get("/", (req, res) => {
  res.json({ message: "Hello from Quantum Vault!" });
});

// 1. List all folders/files in base storage path inside container
app.get("/api/list", (req, res) => {
  exec(
    `docker exec ${containerName} ls -l ${basePathInContainer}`,
    (err, stdout, stderr) => {
      if (err) return res.status(500).json({ error: stderr || err.message });

      const lines = stdout.trim().split("\n").slice(1); // skip total line
      const items = lines.map((line) => {
        const parts = line.split(/\s+/);
        const isFolder = line.startsWith("d");
        const name = parts[8];
        const size = parseInt(parts[4]);
        const modifiedDate = `${parts[5]} ${parts[6]} ${parts[7]}`;
        return {
          name,
          path: `/${name}`,
          type: isFolder ? "folder" : "file",
          size,
          modifiedDate,
        };
      });
      res.json({ folders: items });
    }
  );
});

// 2. List files inside a specific folder in container storage
app.get("/api/list/:folder", (req, res) => {
  const folder = req.params.folder;
  exec(
    `docker exec ${containerName} ls -l ${path.posix.join(
      basePathInContainer,
      folder
    )}`,
    (err, stdout, stderr) => {
      if (err) return res.status(500).json({ error: stderr || err.message });

      const lines = stdout.trim().split("\n").slice(1); // skip total line
      const items = lines.map((line) => {
        const parts = line.split(/\s+/);
        const isFolder = line.startsWith("d");
        const name = parts[8];
        const size = parseInt(parts[4]);
        const modifiedDate = `${parts[5]} ${parts[6]} ${parts[7]}`;
        return {
          name,
          path: `/${folder}/${name}`,
          type: isFolder ? "folder" : "file",
          size,
          modifiedDate,
        };
      });
      res.json({ files: items });
    }
  );
});

// 3. Download pura folder as zip
app.get("/api/download-folder/:folder", (req, res) => {
  const folder = req.params.folder;
  const folderInContainer = path.posix.join(basePathInContainer, folder);
  const tempZipPath = path.join("downloads", `${folder}.zip`);

  exec(
    `docker cp ${containerName}:${folderInContainer} downloads/${folder}`,
    (err, stdout, stderr) => {
      if (err) return res.status(500).json({ error: stderr || err.message });

      const output = fs.createWriteStream(tempZipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        res.download(tempZipPath, `${folder}.zip`, (downloadErr) => {
          fs.rmSync(path.join("downloads", folder), {
            recursive: true,
            force: true,
          });
          fs.unlink(tempZipPath, () => {});
          if (downloadErr) console.error("Download error:", downloadErr);
        });
      });

      archive.on("error", (err) =>
        res.status(500).json({
          status: false,
          message: "Something went wrong!",
          error: err.message,
        })
      );

      archive.pipe(output);
      archive.directory(path.join("downloads", folder), false);
      archive.finalize();
    }
  );
});

// 4. Download multiple files from folder as zip
app.get("/api/download-files/:folder", (req, res) => {
  const folder = req.params.folder;
  let files = req.query.files;

  if (!files)
    return res.status(400).json({ error: "Files query parameter required" });

  files = files.split(",");

  const copyCommands = files.map((filename) => {
    const containerFilePath = path.posix.join(
      basePathInContainer,
      folder,
      filename
    );
    const localFilePath = path.join("downloads", filename);
    return new Promise((resolve, reject) => {
      exec(
        `docker cp ${containerName}:${containerFilePath} ${localFilePath}`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  });

  Promise.all(copyCommands)
    .then(() => {
      const zipName = `${folder}_selected_files.zip`;
      const zipPath = path.join("downloads", zipName);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        res.download(zipPath, zipName, (downloadErr) => {
          files.forEach((f) => fs.unlinkSync(path.join("downloads", f)));
          fs.unlink(zipPath, () => {});
          if (downloadErr) console.error("Download error:", downloadErr);
        });
      });

      archive.on("error", (err) =>
        res.status(500).json({ error: err.message })
      );

      archive.pipe(output);
      files.forEach((f) =>
        archive.file(path.join("downloads", f), { name: f })
      );
      archive.finalize();
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// 5. Upload a file into a specific folder inside container storage
app.post("/api/upload", upload.array("files"), (req, res) => {
  const targetFolder = req.body.targetFolder;
  if (!targetFolder) {
    return res.status(400).json({ error: "Target folder is required" });
  }

  // Step 1: Create folder inside container (if not exists)
  exec(
    `docker exec ${containerName} mkdir -p ${path.posix.join(
      basePathInContainer,
      targetFolder
    )}`,
    (err, stdout, stderr) => {
      if (err) {
        // Clean up uploaded files anyway
        req.files.forEach((file) => fs.unlink(file.path, () => {}));
        return res.status(500).json({ error: stderr || err.message });
      }

      // Step 2: Copy files one by one into container
      let copyPromises = req.files.map((file) => {
        const localFilePath = file.path;
        const fileName = file.originalname;
        const containerFilePath = path.posix.join(
          basePathInContainer,
          targetFolder,
          fileName
        );
        return new Promise((resolve, reject) => {
          exec(
            `docker cp ${localFilePath} ${containerName}:${containerFilePath}`,
            (err) => {
              fs.unlink(localFilePath, () => {});
              if (err) reject(err);
              else resolve();
            }
          );
        });
      });

      Promise.all(copyPromises)
        .then(() => {
          res.json({ message: "Files uploaded successfully!" });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  );
});

app.delete("/api/delete-files/:folder", (req, res) => {
  const folder = req.params.folder;
  const { files } = req.body; // expects { files: ["file1.txt", "file2.png"] }

  if (!files || !Array.isArray(files) || files.length === 0) {
    return res
      .status(400)
      .json({ error: "Files array required in request body" });
  }

  // Prepare docker exec rm commands
  const deletePromises = files.map((filename) => {
    const filePathInContainer = path.posix.join(
      basePathInContainer,
      folder,
      filename
    );
    return new Promise((resolve, reject) => {
      exec(
        `docker exec ${containerName} rm -f ${filePathInContainer}`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  });

  Promise.all(deletePromises)
    .then(() => {
      res.json({ message: "Selected files deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/container/status", (req, res) => {
  exec(
    `docker inspect -f '{{.State.Running}}' ${containerName}`,
    (err, stdout, stderr) => {
      if (err) return res.status(500).json({ error: stderr || err.message });
      const isRunning = stdout.trim() === "true";
      res.json({ status: isRunning ? "running" : "stopped" });
    }
  );
});

app.post("/container/start", (req, res) => {
  exec(`docker start ${containerName}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr || err.message });
    res.json({ message: `Container ${containerName} started successfully!` });
  });
});

app.post("/container/stop", (req, res) => {
  exec(`docker stop ${containerName}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr || err.message });
    res.json({ message: `Container ${containerName} stopped successfully!` });
  });
});

app.get("/container/info", (req, res) => {
  exec(`docker inspect ${containerName}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr || err.message });
    const info = JSON.parse(stdout)[0];
    res.json({
      id: info.Id,
      name: info.Name.replace(/^\//, ""),
      status: info.State.Status,
      startedAt: info.State.StartedAt,
      finishedAt: info.State.FinishedAt,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
