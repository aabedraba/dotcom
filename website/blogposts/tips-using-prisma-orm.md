---
title: "Tips for using Prisma in your team"
date: "2022-01-11T11:59:19.000Z"
tags: "technology"
---

Prisma is a powerful ORM in the Node.js ecosystem, with its goals to make better database abstractions for developers and to be thoroughly type-safe. But good practices in team development are essential to getting the most out of this powerful tool. Wrongly managed migrations can lead to downtime, out-of-sync schema versions; and dangerous production migrations could lead to deleting your whole database. Here is a list of tips I developed while working (and sometimes failing to work) with Prisma over the last two years.

## Deploying to production

If you try to deploy by adding a column, migrating after deploying can lead to failed requests in the new deployment. And it's the other way around when you try to delete a column: migrating before the new deployment will lead to some requests from the older deployment to fail.

On both occasions you might be running into the error that looks like the following `` The column `db.Tweet.likeCount` does not exist in the current database. ``

It's important to ensure that you are running the migrations as one of the very last steps before the production deployment is done, as close to the start of the service as possible, ideally in your CI/CD pipeline.

If you do not want to run your migrations in CI/CD pipeline, consider following these rules when adding deleting a column so you can avoid downtimes:

- When adding a column, migrate first and then deploy
- When deleting a column, deploy first and then migrate

## Zero downtime migrations

When renaming a field in the same release, you will run into failed database requests while the renaming of the fields is happening.

To avoid the downtime, you will need to roll the new migration progressively by breaking the migration into smaller non-breaking migrations.

For example, if you want to rename column from `text` to `content`, follow these steps in different releases:

1. Create column `content` and mark it as optional and write to it at the same time you're writing to the `text` column
2. Copy the already existing data from `text` to `content`
3. Add the [@ignore](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#ignore) tag to `text` column and make it optional. Mark `content` as non-optional. Remove references to `text` in your code.
4. Delete the `text` column and mark `content` as non-optional

## Custom migrations

Consider you want to add a specific type of index to your column than the one Prisma suggests. Applying the migration directly to the database, will make your `prisma.schema` and `migrations` folder to be out-of-sync from your version control repository. 

To avoid out-of-sync schemas, follow these steps: 

1. Add the index to your column in `prisma.schema`
2. Run `npx prisma migrate dev --create-only` so it just creates the sql file, but not apply it 
3. Change the created sql file to contain the custom index you need and apply the migration with `npx prisma migrate dev`
4. Commit the new change to your version control repository 

