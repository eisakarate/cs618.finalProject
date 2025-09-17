# get image from "node" version 20
FROM node:20

# set the working directory
WORKDIR /app

# copy the configuration information, into the workign directory
COPY package.json package-lock.json ./

# install requirements
RUN npm install

# copy rest of the application from the local dir to root of app
COPY . .

# set the start the server using npm start
CMD ["npm", "start"]