import { Request, Response } from "express"
import connection from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export default async function login(
    req: Request,
    res: Response
): Promise<void> {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.statusCode = 422
            throw new Error("Preencha os campos 'email' e 'password' ")
        }

        const [user] = await connection("cookenu_users").where({ email })

        const passwordIsCorrect: boolean = user && new HashManager().compareHash(password, user.password)

        if (!user || !passwordIsCorrect) {
            res.statusCode = 401
            res.statusMessage = "Credenciais invalidas"
            throw new Error("Credenciais inválidas")
        }

        const token = new Authenticator().generateToken({ id: user.id })

        res.status(200).send({ token })

    } catch (error) {
        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
}