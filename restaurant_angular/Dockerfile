# Use a base image with Node.js and npm installed
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container

# Build the Angular application
RUN npm run build --prod

# Use a lightweight base image to run the Angular application
FROM nginx:alpine

# Copy the built Angular application from the previous stage to the NGINX web server directory
COPY --from=builder /app/dist/restaurant_angular /usr/share/nginx/html/

# Expose port 80 to the outside world
