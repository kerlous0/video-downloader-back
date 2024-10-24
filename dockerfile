# Dockerfile
FROM node:alpine

# Install Python and ffmpeg
RUN apk add --no-cache python3 ffmpeg

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Command to run your application
CMD ["node", "index.js"]  # Replace with your actual entry point file
