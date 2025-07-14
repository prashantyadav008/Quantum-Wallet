# FROM ubuntu:latest

# # # Install necessary packages
# # RUN apt-get update && apt-get install -y \
# #     curl \
# #     wget \
# #     git \
# #     nodejs \
# #     npm \
# #     && rm -rf /var/lib/apt/lists/*

# # Create storage directory inside container
# RUN mkdir -p /home/quantum-vault/storage

# # Set working directory
# WORKDIR /home/quantum-vault

# # Copy backend code
# COPY backend/ /home/quantum-vault/

# # Install dependencies
# RUN npm install

# # Expose the API port
# EXPOSE 3001

# # Run the server
# CMD ["node", "server.js"]


# Base Ubuntu image
FROM ubuntu:latest

# Create storage directory
RUN mkdir -p /home/quantum-vault/storage

# Set working directory
WORKDIR /home/quantum-vault/storage

# Keep container alive
CMD ["tail", "-f", "/dev/null"]
