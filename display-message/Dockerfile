# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the React app for production using Vite
RUN npm run build

# Start a new stage for the production image
FROM nginx:alpine

# Copy the built React app from the previous stage to the nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000 for the web server
EXPOSE 80

# Start the nginx web server when the container runs
CMD ["nginx", "-g", "daemon off;"]
