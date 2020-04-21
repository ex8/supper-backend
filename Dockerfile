# docker_image:version
FROM node:12

# app directory within docker container
WORKDIR /usr/src/app

# pull package.json and package-lock.jason and put into working directory
COPY package*.json ./

# install dependencies - commented out is for production
RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Compile app
RUN npm run build

# Expose port
EXPOSE 5000

# Run app
CMD ["npm", "run", "start"]