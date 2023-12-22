# Builder image
FROM node:17-alpine as builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Final image for running the application
FROM nginx:alpine

# Create and set the working directory
WORKDIR /usr/share/nginx/html

# Copy the built artifacts from the builder image
COPY --from=builder /app/build .

# ARG for API_URL
ARG API_URL
RUN sed -i "s|\$API_URL|${API_URL}|g" /usr/share/nginx/html/main.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
