# Base image for building the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app based on the provided environment (default is development)
ARG ENV=development
RUN npm run build --configuration=$ENV

# Use nginx to serve the built files
FROM nginx:alpine

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Angular app's built files into the nginx serving directory
COPY --from=build /app/dist/remote-frontend-web-application/browser /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]