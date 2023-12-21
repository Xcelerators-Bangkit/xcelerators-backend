FROM alpine:latest
WORKDIR /home/app

RUN apk add nodejs npm

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "start" ]