FROM node:alpine

RUN mkdir /home/next

WORKDIR /home/next

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD yarn build && yarn start