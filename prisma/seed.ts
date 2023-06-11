import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Check to see if our test user works (upsert vs. create)
  // if the user does exist, then it will do nothing, but if it doesn't ,then create
  // the user.
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password: `$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy`,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
