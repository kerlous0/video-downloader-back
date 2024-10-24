# Use the appropriate base image
FROM node:18

# Install Python (for youtube-dl-exec)
RUN apt-get update && apt-get install -y python3

# Set environment variable to point to the correct Python version
ENV PYTHON=python3

# Your existing Docker commands
ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
COPY . /app/.

# Install dependencies
RUN --mount=type=cache,id=s/0af4a996-29b0-4d24-b652-66452d4e964e-/root/npm,target=/root/.npm npm install

# Build and other steps
