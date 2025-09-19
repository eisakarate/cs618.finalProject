# base image from Node
FROM node:20 AS build

#set the backend url to the backend container
ARG VITE_BACKEND_URL=https://zany-space-eureka-67rqv5jgj67hr4jw-3001.app.github.dev/api/v1

WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
# copy all the files
COPY . .

# build
RUN npm run build

# add another base(web server)
FROM nginx AS final 

WORKDIR /usr/share/nginx/html

# copy the distribution content to nginx
COPY --from=build /build/dist .