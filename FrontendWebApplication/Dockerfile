# Base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx to serve the built files
FROM nginx:alpine

# Set the environment variable
ENV REMOTE_ENTRY_URL=http://localhost:4201/remoteEntry.json

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Angular app's built files
COPY --from=build /app/dist/frontend-web-application/browser /usr/share/nginx/html

# Replace placeholder with environment variable
RUN envsubst < /usr/share/nginx/html/federation.manifest.json > /usr/share/nginx/html/federation.manifest.tmp && \
    mv /usr/share/nginx/html/federation.manifest.tmp /usr/share/nginx/html/federation.manifest.json

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]