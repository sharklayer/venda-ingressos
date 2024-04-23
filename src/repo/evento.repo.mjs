import { PrismaClient } from '@prisma/client'

export async function createEventos(evento) {
    const prisma = new PrismaClient()
    return await prisma.evento.create({ data: evento });
}

export async function getEventos() {
    const prisma = new PrismaClient()
    return await prisma.evento.findMany();
}

export async function getEventoById(id) {
    const prisma = new PrismaClient()
    return await prisma.evento.findUnique({ where: { id } });
}

export async function deleteEvento(id) {
    const prisma = new PrismaClient()
    let countProductos = await prisma.ingresso.count({ where: { evento_id: id } });
    if (countProductos > 0) {
        throw new Error('Evento possui produtos associados');
    }
    return await prisma.evento.delete({ where: { id } });
}

export async function updateEvento(id, evento) {
    const prisma = new PrismaClient()
    return await prisma.evento.update({ where: { id }, data: evento });
}
