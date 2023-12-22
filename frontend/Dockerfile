FROM --platform=$BUILDPLATFORM node:lts AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci && mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . /code

ENV CI=true

CMD [ "npm", "start" ]
