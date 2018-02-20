FROM node:8.9

RUN apt-get update && apt-get install openssh-server openssh-client -y
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ADD ./.profile.d /app/.profile.d

WORKDIR /usr/src/app/

ENV NODE_ENV=production

ADD package.json .
ADD yarn.lock .

RUN yarn install --prod --pure-lockfile --non-interactive

ADD src ./src
CMD yarn start
