# Use Node 16 alpine as parent image
FROM node:14-alpine

# Change the working directory on the Docker image to /app
WORKDIR /src/app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of project files into this image
COPY . .

# Start the application
# ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm","start"]
