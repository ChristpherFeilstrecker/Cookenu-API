import { Request, Response } from "express";
import connection from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerated } from "../services/IdGenerated";
import { Follow, user } from "../types";

export default async function unfollowUser(
   req: Request,
   res: Response
): Promise<void | any> {
   try {

      const { userToUnfollowId } = req.body
      const token = req.headers.authorization as string

      const tokenData = await new Authenticator().getTokenData(token)

      if (!tokenData) {
         res.statusCode = 401
         res.statusMessage = "token invalido ou nao passado no headers"
         throw new Error()
      }

      if (!userToUnfollowId) {
         res.statusCode = 422
         throw new Error("Preencha o campo 'userToFollowId' ")
      }

      const follow_id:string = tokenData.id

      const verifyFolowersUser:any = await connection("cookenu_follow").where('followed_id', 'like', `%${userToUnfollowId}%`).where('follow_id', 'like', `%${follow_id}%`)

      if (verifyFolowersUser.length === 0) {
        res.statusCode = 404
        throw new Error("Você não segue este usuário ou usuário inexistente")
     }
     const userToUnfollow:string = verifyFolowersUser[0].id

     console.log(verifyFolowersUser[0].id)

     await connection('cookenu_follow')
     .delete('id').where('id', 'like', `%${userToUnfollow}%`)

      res.status(201).send({ message: "Unfollowed successfully" })

   } catch (error) {
 
      if (error instanceof Error) {
         res.send({ message: error.message })
     } else {
         res.send({ message: "Erro inesperado" })
     }
      
   }
}