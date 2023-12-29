# Stage 1: Install dependencies
FROM node:12 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Build the application
FROM dependencies AS build
COPY . .
RUN npm run build

# Stage 3: Final image
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
