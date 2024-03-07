import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function prismaDrop() {
  await prisma.user.deleteMany();
  await prisma.token.deleteMany();
  await prisma.position.deleteMany();

  console.log('Drop completed');
}

prismaDrop()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
