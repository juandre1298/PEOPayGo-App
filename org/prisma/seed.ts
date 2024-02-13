import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    id: 5,
    email: 'juandre1298@gmail.com',
    first_name: 'juan',
    last_name: 'salas',
    password: '123456',
    type: 'admin',
  },
  {
    id: 2,
    email: 'testemail2@fakeemail.com',
    first_name: 'user 2',
    last_name: 'account',
    password: '123456',
    type: 'admin',
  },
  {
    id: 3,
    email: 'testemail3@fakeemail.com',
    first_name: 'user 3',
    last_name: 'account',
    password: '123456',
    type: 'customer',
  },
  {
    id: 4,
    email: 'testemail4@fakeemail.com',
    first_name: 'user 4',
    last_name: 'account',
    password: '123456',
    type: 'customer',
  },
];

async function main() {
  for (let user of users) {
    await prisma.user.create({ data: user });
  }
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
