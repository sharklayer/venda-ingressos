import { createUser, getUserByEmail } from "@/repo/user.repo.mjs";
import {authOptions} from "./auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { createCliente, getClienteByEmail, updateCliente } from "@/repo/cliente.repo.mjs";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return handleGetOrCreateCliente(req, res);
    }
    if (req.method === 'PUT') {
        return handleUpdateCliente(req, res);
    }
    res.status(405).send({});
}

async function handleGetOrCreateCliente(req, res) {

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).send({message: 'Unauthorized'});
    }

    let email = session?.user?.email;

    if (!email) {
        return res.status(400).send({message: 'Email not found'});
    }

    try {
        let cliente = await getClienteByEmail(email);
        if (cliente) {
            return res.status(200).send(cliente);
        }

        let user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        let new_cliente = { user_id: user.id };
        let created = await createCliente(new_cliente);
        return res.status(201).send(created);

    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}

async function handleUpdateCliente(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).send({message: 'Unauthorized'});
    }

    let email = session?.user?.email;

    if (!email) {
        return res.status(400).send({message: 'Email not found'});
    }

    try {
        let cliente = await getClienteByEmail(email);
        if (!cliente) {
            return res.status(404).send({message: 'Customer not found'});
        }
        let { id, ...cliente_data } = req.body;

        if (cliente.id !== id) {
            return res.status(401).send({message: 'Unauthorized'});
        }

        cliente.address1 = cliente_data?.address1;
        cliente.address2 = cliente_data?.address2;
        cliente.city = cliente_data?.city;
        cliente.state = cliente_data?.state;
        cliente.cep = cliente_data?.cep;
        cliente.phone = cliente_data?.phone;

        let updated = await updateCliente(id, cliente);
        return res.status(200).send(updated);

    } catch(err) {
        console.error(err);
        res.status(500).send({message: err.message});
    }
}