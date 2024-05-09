# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm update

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Build the React app
RUN npm run build

# Set the environment variable for the port number to expose
ENV PORT 3000

# Set environment variable for the network
ENV REACT_APP_NETWORK_NAME=rosiko_network

# Expose the port where your React app will run
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]