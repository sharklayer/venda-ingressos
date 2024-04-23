import { PrismaClient } from '@prisma/client'

export async function createCustomer(customer) {
    const prisma = new PrismaClient()
    return await prisma.customer.create({ data: customer });
}

export async function getCustomers() {
    const prisma = new PrismaClient()
    return await prisma.customer.findMany();
}

export async function getCustomerById(id) {
    const prisma = new PrismaClient()
    return await prisma.customer.findUnique({ where: { id } });
}

export async function getCustomerByEmail(email) {
    const prisma = new PrismaClient()
    let user = await prisma.user.findUnique({ where: { email } });
    return await prisma.customer.findFirst({ where: { user_id: user.id } });
}

export async function updateCustomer(id, customer) {
    const prisma = new PrismaClient()
    return await prisma.customer.update({ where: { id }, data: customer });
}