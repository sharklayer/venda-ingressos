import { createUser, getUserByEmail } from "@/repo/user.repo.mjs";

export default async function handler(req, res) {
    console.log("api/auth/signup");
    if (req.method === 'POST') {
        let { email, senha, nome, sobrenome} =req.body;
        if (!email ||  !senha || !nome || !sobrenome) {
            res.status(400).send({message: 'Os campos obrigatórios não foram preenchidos!'});
            return;
        }

        let exists = await getUserByEmail(email);
        if (exists) {
            res.status(400).send({message: 'Usuário já existe!'});
            return;
        }

        let novo_usuario = { email, senha, nome, sobrenome, admin: false};

        try {
            let created = await createUser(novo_usuario);
            let {senha, ...usuario} = created;
            res.status(201).send(usuario);
        } catch(erro) {
            console.error(erro);
            res.status(500).send({message: erro.message});
            return;
        }
    } else {
        res.status(405).send({message: 'Método não permitido'});
    }
}