FROM node:18

EXPOSE 3001

WORKDIR /app

COPY package.json ./

RUN yarn install  && yarn upgrade

COPY . .

CMD ["yarn", "run", "dev"]

