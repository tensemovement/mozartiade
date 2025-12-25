import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding admin user...');

// Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create super admin
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@mozartia.de' },
    update: {},
    create: {
      email: 'admin@mozartia.de',
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
  console.log('Email: admin@mozartia.de');
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
