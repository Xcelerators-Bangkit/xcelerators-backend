FROM node:lts
WORKDIR /home/app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

ENV DATABASE_URL="mysql://root:capstone123@34.128.88.89:3306/capstone"
EXPOSE 8080
CMD [ "npm", "run", "start" ]