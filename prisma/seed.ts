import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // TODO: look into hashing more, understand salt and rounds.
  const password = await hash("test", 12);

  // Check to see if our test user works (upsert vs. create)
  // if the user does exist, then it will do nothing, but if it doesn't ,then create
  // the user.
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password: password,
      seePricing: true,
      awardQuotes: false,
    },
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
