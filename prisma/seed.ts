import {
    PrismaClient,
    type User,
    type TaxProfile,
    type Invoice,
} from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    const users: User[] = [];
    for (let i = 1; i <= 5; i++) {
        const email = `user${i}-${Date.now()}@example.com`;
        const user = await prisma.user.create({
            data: {
                email: email,
                password: `password${i}`,
                firstName: `First${i}`,
                lastName: `Last${i}`,
            },
        });
        users.push(user);
    }

    const taxProfiles: TaxProfile[] = [];
    for (const user of users) {
        for (let j = 1; j <= 2; j++) {
            const profile = await prisma.taxProfile.create({
                data: {
                    name: `${user.firstName} ${user.lastName} SRL ${j}`,
                    taxId: `IT${Math.floor(10000000000 + Math.random() * 90000000000)}`,
                    address: `Via Roma ${j}`,
                    city: 'Roma',
                    postalCode: '00100',
                    user: { connect: { id: user.id } },
                },
            });
            taxProfiles.push(profile);
        }
    }

    const invoices: Invoice[] = [];
    for (const profile of taxProfiles) {
        for (let k = 1; k <= 3; k++) {
            const subtotal = Math.floor(100 + Math.random() * 900);
            const taxAmount = +(subtotal * 0.22).toFixed(2);
            const total = +(subtotal + taxAmount).toFixed(2);

            const invoice = await prisma.invoice.create({
                data: {
                    number: `INV-${profile.id.slice(0, 4)}-${k}`,
                    status: 'DRAFT',
                    issueDate: new Date(),
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    subtotal,
                    taxAmount,
                    total,
                    description: `Invoice ${k} for ${profile.name}`,
                    taxProfile: { connect: { id: profile.id } },
                },
            });
            invoices.push(invoice);
        }
    }

    for (const invoice of invoices) {
        for (let l = 1; l <= 3; l++) {
            const quantity = Math.floor(1 + Math.random() * 10);
            const unitPrice = Math.floor(10 + Math.random() * 90);
            const lineTotal = +(quantity * unitPrice).toFixed(2);

            await prisma.invoiceItem.create({
                data: {
                    description: `Item ${l} for invoice ${invoice.number}`,
                    quantity,
                    unitPrice,
                    lineTotal,
                    invoice: { connect: { id: invoice.id } },
                },
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
