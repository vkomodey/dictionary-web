FROM node:8.9

ADD ./.profile.d /app/.profile.d

WORKDIR /usr/src/app/

ENV NODE_PORT=3001
ENV NODE_ENV=production

ADD package.json .
ADD yarn.lock .

RUN yarn install --prod --pure-lockfile --non-interactive

ADD src ./src
ADD webpack.config.js .
ADD .babelrc .
ADD index.js .

RUN yarn run build

CMD yarn start
