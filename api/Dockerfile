FROM node:alpine

WORKDIR /home/node

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3333

CMD yarn start