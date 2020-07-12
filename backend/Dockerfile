FROM node:14-alpine3.12

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD sh -c "sleep 10 && yarn migrate && yarn start"