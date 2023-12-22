# xcelerators-backend

## Tools and resource used

- NodeJS v20.10.0
- ExpressJS
- Prisma ORM
- MySQL
- Google Cloud Run
- Service account key with Cloud Storage access

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

1. Create a new secret for the `DATABASE_URL`
2. Run this command:
```sh
gcloud run deploy SERVICE_NAME \
    --allow-unauthenticated \
    --set-env-vars DATABASE_URL=@DATABASE_URL
```