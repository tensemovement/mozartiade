import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding admin user...');

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create super admin
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@mozartiade.com' },
    update: {},
    create: {
      email: 'admin@mozartiade.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Admin user created:', {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  console.log('\n=== Login Credentials ===');
  console.log('Email: admin@mozartiade.com');
  console.log('Password: admin123');
  console.log('========================\n');
}

main()
  .catch((e) => {
    console.error('Error seeding admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
