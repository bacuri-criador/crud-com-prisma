import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const author = await prisma.author.create({
    data: {
      name: "George Orwell",
      books: {
        create: [
          {
            title: "1984",
          },
          {
            title: "A Revolução dos Bichos",
          },
        ],
      },
    },
    include: {
      books: true,
    },
  });

  console.log(JSON.stringify(author, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });