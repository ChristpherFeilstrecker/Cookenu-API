import { Request, Response } from "express"
import connection from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { Profile } from "../types";



export async function getMyProfile(req: Request, res: Response): Promise<void|any> {
   try {

      const token = req.headers.authorization as string

      const tokenData = await new Authenticator().getTokenData(token)

      if (!tokenData) {
         res.statusCode = 401
         res.statusMessage = "token invalido ou nao passado no headers"
         throw new Error()
      }
      
      const result = await connection("cookenu_users").where('id', 'like', `%${tokenData.id}%`)

      if (!result.length) {
         res.status(204)
         throw new Error("Usuário não cadastrado ou inexistente")
      }
      const profile: Profile = {
         id:result[0].id,
         name:result[0].name,
         email:result[0].email
     }

      res.status(200).send(profile)

   } catch (error) {
      if (error instanceof Error) {
         res.send({ message: error.message })
      } else {
         res.send({ message: "Erro inesperado" })
      }
   }
}