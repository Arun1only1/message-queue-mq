# Use the official Node.js 18 Alpine base image
FROM node:18-alpine

# Install Tini for process management
RUN apk add --update tini


# Create a directory for your Node.js app
RUN mkdir -p /usr/src/app

# Set the working directory to your app directory
WORKDIR /usr/src/app

# Install the latest version of npm globally
RUN npm install -g npm@latest

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .


# Start your Node.js application using Tini
CMD ["tini", "--", "npm","run", "prod"]
