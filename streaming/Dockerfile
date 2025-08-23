# LusoTown Portuguese-speaking Community Streaming Dockerfile
FROM node:18-alpine

# Install FFmpeg for Portuguese content processing
RUN apk add --no-cache \
    ffmpeg \
    curl \
    bash

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Create necessary directories for Portuguese-speaking community
RUN mkdir -p \
    /app/media \
    /app/www \
    /app/logs \
    /app/recordings \
    /app/recordings/cultural \
    /app/recordings/business

# Copy application code
COPY . .

# Set permissions
RUN chown -R node:node /app
USER node

# Health check for Portuguese-speaking community streaming
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3002/health || exit 1

# Expose ports for Portuguese-speaking community streaming
EXPOSE 3002

# Portuguese-speaking community streaming command
CMD ["node", "server.js"]