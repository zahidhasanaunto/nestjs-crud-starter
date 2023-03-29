FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT [ "sh", "./entrypoint.sh" ]