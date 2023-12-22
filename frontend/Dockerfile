FROM node:17-alpine

WORKDIR /app

COPY package.json .

# Update npm to the latest version
RUN npm install -g npm@latest

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
