FROM node:8.9

WORKDIR /usr/src/app/

ENV NODE_ENV=production

ADD package.json .
ADD yarn.lock .

RUN yarn install --prod --pure-lockfile --non-interactive

ADD src ./src

CMD yarn start
