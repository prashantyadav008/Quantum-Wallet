/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../components/UI/Typography";
import Button from "../components/UI/Button";
import { Upload, Download, FileCode, Server } from "lucide-react";
import Card from "../components/UI/Card";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Upload size={28} className="text-cyber-blue-400" />,
      title: "File Upload",
      description:
        "Upload files and folders to your Docker container with structure preservation",
      action: () => navigate("/upload"),
      buttonText: "Upload Files",
    },
    {
      icon: <Download size={28} className="text-cyber-purple-400" />,
      title: "File Download",
      description:
        "Browse and download files from your container to your local system",
      action: () => navigate("/files"),
      buttonText: "Browse Files",
    },
    {
      icon: <FileCode size={28} className="text-cyber-pink-400" />,
      title: "VS Code Integration",
      description:
        "Open container folders directly in Visual Studio Code for seamless editing",
      action: () => navigate("/vscode"),
      buttonText: "Connect VS Code",
    },
    {
      icon: <Server size={28} className="text-cyber-green-400" />,
      title: "Container Management",
      description:
        "Start, stop, and manage your Docker containers from the web interface",
      action: () => navigate("/settings"),
      buttonText: "Manage Containers",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Typography
            variant="h1"
            className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue-400 via-cyber-purple-500 to-cyber-pink-500">
            Quantum Vault
          </Typography>

          <Typography
            variant="subtitle"
            className="text-xl md:text-2xl mb-8 text-gray-300">
            A futuristic web-based storage platform for seamless file management
            between your local system and Docker containers
          </Typography>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/upload")}
              icon={<Upload size={20} />}>
              Upload Files
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/files")}
              icon={<Download size={20} />}>
              Browse Files
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Typography variant="h2" className="text-center mb-12 cyber-glow">
          Core Features
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="bordered"
              glowing
              className="h-full transition-all duration-300 hover:scale-[1.02]">
              <div className="p-6 h-full flex flex-col">
                <div className="w-14 h-14 rounded-full bg-cyber-dark flex items-center justify-center mb-6">
                  {feature.icon}
                </div>

                <Typography variant="h4" className="mb-3">
                  {feature.title}
                </Typography>

                <Typography
                  variant="body"
                  className="text-gray-400 mb-6 flex-grow">
                  {feature.description}
                </Typography>

                <Button
                  variant={index % 2 === 0 ? "primary" : "secondary"}
                  onClick={feature.action}>
                  {feature.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-cyber-dark/50 rounded-lg p-8 my-8">
        <Typography variant="h2" className="text-center mb-12 cyber-glow">
          How It Works
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-cyber-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Typography variant="h3" className="text-cyber-blue-400">
                1
              </Typography>
            </div>
            <Typography variant="h5" className="mb-3">
              Upload
            </Typography>
            <Typography variant="body" className="text-gray-400">
              Select files or folders from your local system and specify a
              target folder in the container
            </Typography>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-cyber-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Typography variant="h3" className="text-cyber-purple-400">
                2
              </Typography>
            </div>
            <Typography variant="h5" className="mb-3">
              Store
            </Typography>
            <Typography variant="body" className="text-gray-400">
              Your files are preserved with the same structure inside the Docker
              container
            </Typography>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-cyber-pink-500/20 flex items-center justify-center mx-auto mb-4">
              <Typography variant="h3" className="text-cyber-pink-400">
                3
              </Typography>
            </div>
            <Typography variant="h5" className="mb-3">
              Manage
            </Typography>
            <Typography variant="body" className="text-gray-400">
              Browse, download, or open files directly in VS Code for seamless
              editing
            </Typography>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <Card variant="glass" className="p-12 max-w-3xl mx-auto">
          <Typography variant="h3" className="mb-4">
            Ready to Get Started?
          </Typography>
          <Typography
            variant="body"
            className="text-gray-300 mb-8 max-w-xl mx-auto">
            Experience the next generation of container file management with
            Quantum Vault's futuristic interface and powerful features.
          </Typography>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/upload")}>
            Start Uploading Now
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
