FROM quay.io/openshift/origin-nodejs:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
