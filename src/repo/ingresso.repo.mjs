import { PrismaClient } from '@prisma/client'

export async function createIngresso(product) {
    const prisma = new PrismaClient()
    return await prisma.ingresso.create({ data: product });
}

export async function getIngressos() {
    const prisma = new PrismaClient();
    return await prisma.ingresso.findMany();
}

export async function getIngressoById(id) {
    const prisma = new PrismaClient()
    return await prisma.ingresso.findUnique({ where: { id } });
}

export async function deleteIngresso(id) {
    const prisma = new PrismaClient()
    return await prisma.ingresso.delete({ where: { id } });
}
