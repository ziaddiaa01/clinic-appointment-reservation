#Build Steps
FROM node:alpine3.10 as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app

RUN npm run build

#Run Steps
FROM nginx:1.19.8-alpine  
COPY --from=build-step /app/build /usr/share/nginx/html
