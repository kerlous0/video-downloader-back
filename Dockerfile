# Use the appropriate base image
FROM node:18

# Install Python (for youtube-dl-exec)
RUN apt-get update && apt-get install -y python3

# Set environment variable to point to the correct Python version
ENV PYTHON=python3

# Your existing Docker commands
ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
COPY . /app/.

# Clear NPM cache to avoid potential conflicts
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Build and other steps
