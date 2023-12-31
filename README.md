# xcelerators-backend

## Tools and resource used

- NodeJS v20.10.0
- ExpressJS
- Prisma ORM
- MySQL
- Google Cloud Run
- Service account key with Cloud Storage access
- gcloud CLI

## Local development setup

1. Git clone this repo
2. Set up your service account.
```sh
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"
```
3. Run your MySQL database on local
4. Run `npm install` on your terminal
5. Make .env file, declare your `DATABASE_URL`:

> Refer [Prisma Docs](https://www.prisma.io/docs/orm/reference/connection-urls#mysql) for `DATABASE_URL` format.

```sh
DATABASE_URL="mysql://<user>:<password>@127.0.0.1:3306/capstone"
```
Instead .env file, you also can declare it via your shell session.

6. Run `npx prisma generate` to generate Prisma model.
7. Run `npm run dev`

## Deployment

1. Of course git clone this repo
2. Create a new secret for the `DATABASE_URL` at Google Cloud Console
3. Run this command:
```sh
gcloud run deploy \
    --allow-unauthenticated \
    --set-env-vars DATABASE_URL=@DATABASE_URL
```