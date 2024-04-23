import { createUser, getUserByEmail } from "@/repo/user.repo.mjs";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { getEventos } from "@/repo/evento.repo.mjs";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetEventos(req, res);
    }
    if (req.method === 'POST') {
        return handleCreateEvento(req, res);
    }
    res.status(405).send({});
}

async function handleGetEventos(req, res) {
    try {
        let deps = await getEventos();
        res.status(200).send(deps);
    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}

async function handleCreateEvento(req, res) {
    let { name } = req.body;
    if (!name) {
        res.status(400).send({message: 'Campos obrigatorios nao foram preenchidos'});
        return;
    }

    try {
        let new_dep = { name };
        let created = await createUser(new_dep);
        res.status(201).send(created);
    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}
