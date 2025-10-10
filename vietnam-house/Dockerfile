# ==========================================
# Vietnam House - Production Dockerfile
# Multi-stage build for React + Vite SPA
# ==========================================

# ============ Stage 1: Build ============
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
# Use --production=false to include devDependencies needed for build
RUN npm ci --production=false

# Copy application source
COPY . .

# Build the application
# Vite will output to /app/dist
RUN npm run build

# ============ Stage 2: Production ============
FROM nginx:alpine

# Install curl for healthchecks (optional but recommended)
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80 (Traefik will route to this)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
