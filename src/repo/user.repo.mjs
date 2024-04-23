import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

//função para criar um novo usuário no banco de dados, se algum campo obrigatório estiver faltando dará erro
export async function createUser(user) {
    let {email, nome, sobrenome, senha, admin} = user;
    if (!email || !nome || !sobrenome || !senha) {
        throw new Error('Os campos obrigatórios devem ser preenchidos!')
    }

    senha = await bcrypt.hash(senha, 10);
    const prisma = new PrismaClient()
    return await prisma.usuario.create({ data: { email, nome, sobrenome, senha, admin }});
}

//função para buscar um usuario no pelo email no banco de dados
export async function getUserByEmail(email) {
    const prisma = new PrismaClient()
    let u = await prisma.usuario.findUnique({ where: { email }});
    return u;
}

//função para buscar um usuário pelo ID no banco de dados
export async function getUserById(id) {
    const prisma = new PrismaClient()
    return prisma.usuario.findUnique({ where: { id }});
}

export async function deleteUser(id) {
    const prisma = new PrismaClient()
    return prisma.usuario.delete({ where: { id }});
}

export async function updateUser(id, user) {
    const prisma = new PrismaClient()
    let {email, nome, sobrenome, senha, admin} = user;
    if (!email || !nome || !sobrenome || !senha) {
        throw new Error('Os campos obrigatórios devem ser preenchidos!')
    }
    senha = await bcrypt.hash(senha, 10);
    return prisma.usuario.update({ where: { id }, data: user});
}

export async function checkUserPassword(email, senha) {
    const prisma = new PrismaClient()
    let user = await prisma.usuario.findUnique({ where: { email }});
    if (!user) {
        return false;
    }
    return await bcrypt.compare(senha, user.senha);
}