import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
console.log('Seed script started...1'); 


const prisma = new PrismaClient();


async function main() {
  console.log('Seed execution started');
  
  try {
    const password = '19910508';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password created');

    const result = await prisma.user.upsert({
      where: { email: 'me@caizheng.tech' },
      update: {},
      create: {
        email: 'me@caizheng.tech',
        name: '管理员',
        password: hashedPassword,
        isAdmin: true,
      },
    });
    console.log('Upsert result:', result);
  } catch (error) {
    console.error('Seed error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('Prisma connection closed');
  }
}

main()
  .then(() => console.log('Seed completed successfully'))
  .catch(e => console.error('Fatal seed error:', e));
export default main;