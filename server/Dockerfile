FROM node:10.11.0-alpine

WORKDIR /usr/src/app/

ENV NODE_ENV=production

ADD package.json .
ADD yarn.lock .

RUN yarn install --prod --pure-lockfile --non-interactive

ADD src ./src
CMD yarn start
