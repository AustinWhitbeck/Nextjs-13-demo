Gotchas!

1. Prisma Client stores type definitions in the node_modules folder
   can either host install them or part of the rebuild process generate them.
   To fix this, inside your package.json, set your "build" to be

   "build": "prisma generate && next build"

   This makes sure to rebuild the type definitions on build.

Overall Notes

1. To avoid

2. to regenerate the prisma schema, for example, to add 'unique' to the identifier on a model, run
   npx prisma generate

3. need to have these compiler options as they are not default in Next.JS

"prisma": {
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},

then, to run this and make sure the user is in the db, run

npx prisma db seed

4. You do not want to keep making connections to the Prisma client created every time you make an update, has built in pooling
   Want to use a "singleton" method. One single object that manages the connection to your database.

5. Set arbitrary keys onto the JWT. This is in the `callbacks` key in the auth route /app/api/auth/[...nextauth]/route.ts
   a. session key - handles creation and management of JWT
   b. jwt - handles session object, used whenever you fetch the session.

6. Ways to do protected routes
   client side, server side, or middleware

   (middleware recommended)
