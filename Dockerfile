
FROM node:19

WORKDIR /app

COPY . .

COPY package.json yarn.lock ./

RUN yarn

RUN yarn tsc

ENV PORT=3000

CMD ["yarn", "start"]

EXPOSE $PORT


