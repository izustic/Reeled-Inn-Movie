FROM node:19-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx tsc

RUN apk add --no-cache mongodb-tools

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV MONGODB_URI=mongodb+srv://Tozee:QfZtjQFZh03jNyH1@cluster0.fzado2a.mongodb.net/zeeflix
ENV JWT_SECRET=zeeFlixapp

USER appuser

CMD ["node", "bin/www"]

EXPOSE 3000

# FROM node:19

# WORKDIR /app

# COPY . .

# COPY package.json yarn.lock ./

# RUN yarn

# RUN yarn tsc

# ENV PORT=3000

# CMD ["yarn", "start"]

# EXPOSE $PORT


