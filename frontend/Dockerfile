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

# Copy the built artifacts from the builder image
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
