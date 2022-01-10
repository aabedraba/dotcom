---
title: "Choosing a database solution and ORM for Node.js"
date: "2022-01-10T08:18:58.000Z"
tags: "technology"
---

In my last project, working in an electric car-sharing startup, we set out to build our infrastructure from ground up. We knew we wanted to do everything in React and Node.js, as having a single programming language for the frontend and backend helps when it comes to hiring, allows developers to tap in with less friction in both stacks, and improves the speed of product development and iterations, which is crucial in a startup.

But with great <del>power</del> speed of development, comes great responsibility. To protect ourselves from runtime errors ("cannot read property of undefined" anyone?), increase robustness and improve the developer experience, we chose TypeScript, a statically typed superset of Javascript. We had a lot of love in our team for TypeScript and once we tried it we couldn't go back to plain ole Javascript!

Another decision we had to make is with regards to the type database we needed. We have all appreciated at some point NoSQL solutions like DynamoDB, or Google's Firebase. But with rapidly increasing data relations and in the spirit of robustness, developer experience and consistency that we found in TypeScript, we ended up choosing SQL for great part of our solutions, which is [unreasonably effective](https://blog.couchbase.com/unreasonable-effectiveness-of-sql/).

Finally with the same spirit (read _[values](https://vimeo.com/230142234)_), we start our journey to find the right ORM in the Node.js ecosystem. There are many options out there, but the most popular ones were [KnexJs](https://knexjs.org/), [TypeORM](https://typeorm.io), [Sequelize](https://sequelize.org/) and the growing [Prisma](https://prisma.io/).

## Typescript support

It wouldn't make sense to use an ORM that does not support types when working with Typescript. So we really are looking for first class support of Typescript. KnexJs and Sequelize both mention that TypeScript really doesn't make much of a difference [1][2]. Also, looking at their respective Github projects, both projects are entirely written in Javascript, with later added types definitions.

In contrast, TypeORM and Prisma are almost fully written in TypeScript and both support TypeScript at their core. Although I found that TypeORM does lack vigorous type support, for example the `ILIKE` operator allows for any type to be passed in, and it doesn't have a nested relation type support.

## Migrations

Support for migrations was essential as we wanted a tool that could help us with:

- versioning our migrations, e.g. using git
- database rollbacks
- the inevitable editing of fields
- zero downtime migration

Really all the ORMs that we are comparing in this article have support for the first three, although it's worth noting that TypeORM did not have official support for seeding data into the database.

The last point though, I could not really find a lot of documentation in Knex, TypeORM and Sequelize with regards to no-downtime migrations. Prisma did have an edge over the others with its documented support for [_Expand and Contract_ pattern](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations#renaming-a-field).

## Testing

All four options have support for testing, although I found that Sequelize did not have trivial mocking of the library, like Knex's `mock-knex` or Prisma's and TypeORM's deep mock solutions.

## Documentation

Last but not least, documentation is a very important decision factor when it comes to choosing a library.

TypeORM and Sequelize both have a very well documented library, full of examples. Knex's documentation I found just very esoteric and with poor presentation. But the surprise came with Prisma's docs which are just delightful!

## Decision!

So, all in all, the comparison looks like this table below.

<table className="table-auto">
<thead>
<tr>

  <th className="mr-3"></th>
  <th className="p-3">Prisma</th>
  <th className="p-3">TypeORM</th>
  <th className="p-3">Knex</th>
  <th className="p-3">Sequelize</th>
</tr>
</thead>
<tbody>
<tr> 
  <td className="font-bold text-right  p-3">TypeScript support</td>
  <td className="bg-green-300 p-3">Very good</td>
  <td className="bg-green-200 p-3">Good</td>
  <td className="bg-red-300 p-3">Very bad</td>
  <td className="bg-red-200 p-3">Bad</td>
</tr>
<tr>
  <td className="font-bold text-right p-3">Migrations</td>
  <td className="bg-green-300 p-3">Very good</td>
  <td className="bg-green-200 p-3">Good</td>
  <td className="bg-green-200 p-3">Good</td>
  <td className="bg-green-200 p-3">Good</td>
</tr>
<tr>
  <td className="font-bold text-right p-3">Testing</td>
  <td className="bg-green-300 p-3">Very good</td>
  <td className="bg-green-200 p-3">Good</td>
  <td className="bg-green-300 p-3">Very good</td>
  <td className="bg-red-300 p-3">Bad</td>
</tr>
<tr>
  <td className="font-bold text-right p-3">Documentation</td>
  <td className="bg-green-300 p-3">Very good</td>
  <td className="bg-green-200 p-3">Good</td>
  <td className="bg-red-300 p-3">Bad</td>
  <td className="bg-green-200 p-3">Good</td>
</tr>
</tbody>
</table>

Needless to say we did end up choosing Prisma as it really have excelled in every category we were looking for.

## Experience and conclusion

I personally really enjoyed working with Prisma, and so have my teammates! Prisma really have bridged the gap to become a fullstack developer, being able to tap in the backend with no fear of facing SQL for the most part.

The main issues we did have was that **the library has been changing rapidly**. And this is really a praise disguised in a complaint. At the time we adopted Prisma it was still in 1.0 and the website did mention that it wasn't ready for production. So when 2.0 came, and subsequently its readiness for production, we did have to do quite the migration. But the docs really helped us with this.

Another issue that we ran into was that the library from one version to the other stopped having support for our unit testing methodology, so at some points instead of dealing with it, we had to halt the upgrade until we found a solution.

Finally we ran into issues related to the serverless environments that we were using, and the prisma team and its very involved community [helped us a lot](https://github.com/prisma/prisma/issues/10353) closing these problems.

After two years of experience and looking forward, Prisma looks like it's stabilizing quite a lot while the production of features keeps a great pace. I definitely will continue using it for new projects!