import "dotenv/config"; // ✅ add this as the FIRST line
import { faker } from "@faker-js/faker";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const cretorId = "d5408344-5660-4d37-b79e-39690802df00";

const createRandomMovie = () => ({
  title: faker.book.title(),
  overview: faker.commerce.productDescription(),
  genres: [faker.book.genre()],
  releaseYear: faker.date.past({ years: 10 }).getFullYear(),
  runtime: faker.number.int({ min: 60, max: 200 }),
  createdBy: cretorId,
});

const movies = faker.helpers.multiple(createRandomMovie, { count: 10 });

const main = async () => {
  console.log("Seeding movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }
  console.log("Seeding completed!");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
