import { PrismaClient } from '@prisma/client';
import {
  generateRandomEmail,
  generateRandomName,
  generateRandomPhoneNumber,
} from '../../helpers/functions';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const positionsData = [
  { name: 'Security' },
  { name: 'Designer' },
  { name: 'Content manager' },
  { name: 'Lawyer' },
];

const usersData = Array.from({ length: 45 }).map(() => {
  const name = generateRandomName();
  const email = generateRandomEmail(name);
  const phone = generateRandomPhoneNumber('+380');
  return {
    name,
    email,
    phone,
    photo:
      'https://test-blog-files-2.s3.us-east-2.amazonaws.com/ucrKOxqobgpYIIpj3ZlC51F-t.jpeg',
  };
});

const tokensData = Array.from({ length: 45 }).map(() => {
  return {
    value: jwt.sign(
      {
        userId: 228,
      },
      'GHVgsdfgsdfg',
      { expiresIn: '40m' },
    ),
  };
});

async function prismaSeed() {
  for (const position of positionsData) {
    const candidate = await prisma.position.findUnique({
      where: { name: position.name },
    });

    if (!candidate) {
      const newPosition = await prisma.position.create({
        data: position,
      });

      await prisma.user.updateMany({
        data: {
          position_id: newPosition.id,
        },
        where: { position_name: newPosition.name },
      });
    }
  }

  const positions = await prisma.position.findMany();

  for (const userData of usersData) {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const randomPosition = positions[randomIndex];
    await prisma.user.create({
      data: {
        ...userData,
        position_name: randomPosition.name,
        position_id: randomPosition.id,
      },
    });
  }

  for (const tokenData of tokensData) {
    await prisma.token.create({
      data: {
        ...tokenData,
      },
    });
  }

  console.log('Seed completed');
}

prismaSeed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
