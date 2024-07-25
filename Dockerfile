# Use the official Node.js image as a base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000



# Start the app
CMD [ "node", "src/app.js" ]
