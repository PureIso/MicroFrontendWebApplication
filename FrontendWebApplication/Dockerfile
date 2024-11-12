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
COPY --from=build /app/dist/frontend-web-application/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80