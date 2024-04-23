import { createUser, getUserByEmail } from "@/repo/user.repo.mjs";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { getEventos } from "@/repo/evento.repo.mjs";
import { getIngressos } from "@/repo/ingresso.repo.mjs";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        console.log("session.user", session.user);
    }
    if (req.method === 'GET') {
        return handleGetIngressos(req, res);
    }
    res.status(405).send({});
}

async function handleGetIngressos(req, res) {
    try {
        let prods = await getIngressos();
        res.status(200).send(prods);
    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}
