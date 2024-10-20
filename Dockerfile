###############################################################################
# Step 1 : Builder image
#
FROM node:20-alpine AS builder

# Define working directory
WORKDIR /app

# NPM files
COPY package*.json tsconfig*.json ./

# Install timezone and dependencies
RUN apk add --no-cache tzdata git \
	&& npm ci

# Copy source
COPY . ./

# Build
RUN npm run build
###############################################################################
# Step 2 : Run image

FROM node:20-alpine

# Production environment
ENV NODE_ENV=production

# Define working directory
WORKDIR /app

# NPM files 
COPY package*.json ./

RUN apk add --no-cache tzdata \
	&& npm install --cache /tmp/empty-cache \
	&& rm -rf /tmp/empty-cache

# Copy builded source from the upper builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/static ./static

# Start the app
CMD [ "npm", "start" ]

# Expose port to the world
EXPOSE 3000
