import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    const adminPass = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@piscinao.com' },
        update: {},
        create: {
            email: 'admin@piscinao.com',
            name: 'Admin',
            passwordHash: adminPass,
            role: 'ADMIN'
        }
    });

    const clientPass = await bcrypt.hash('client123', 10);
    const client1 = await prisma.user.upsert({
        where: { email: 'joao@example.com' },
        update: {},
        create: { email: 'joao@example.com', name: 'João Silva', phone: '5518999999999', passwordHash: clientPass }
    });
    const client2 = await prisma.user.upsert({
        where: { email: 'maria@example.com' },
        update: {},
        create: { email: 'maria@example.com', name: 'Maria Souza', phone: '5518888888888', passwordHash: clientPass }
    });

    const catQuimicos = await prisma.category.create({ data: { name: 'Químicos' } });
    const catEquipamentos = await prisma.category.create({ data: { name: 'Equipamentos' } });
    
    const prod1 = await prisma.product.create({
        data: { name: 'Cloro 10kg', categoryId: catQuimicos.id, price: 150.0 }
    });
    const prod2 = await prisma.product.create({
        data: { name: 'Filtro Piscina', categoryId: catEquipamentos.id, price: 500.0 }
    });

    await prisma.couponsConfig.create({
        data: { name: 'Config Padrão', amountPerCoupon: 100.0, isActive: true }
    });

    const trail = await prisma.trailConfig.create({
        data: { name: 'Trilha Ouro', totalSteps: 10, couponsPerStep: 5, isActive: true }
    });

    for(let i=1; i<=10; i++) {
        await prisma.trailStep.create({
            data: { trailId: trail.id, stepNumber: i, name: `Passo ${i}`, iconType: 'STAR' }
        });
    }

    await prisma.appSetting.create({
        data: { key: 'WHATSAPP_NUMBER', value: '5518991024742' }
    });

    console.log('Seed completed');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
