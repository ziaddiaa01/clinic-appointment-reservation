# Use a specific version of Node.js as the base image
FROM node:14.15.4-alpine
# Create the app directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the application code and build the production version
COPY . /app/
RUN npm run build

# Use nginx as the web server for serving the React application
FROM nginx:alpine

# Copy the built React application to the nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
