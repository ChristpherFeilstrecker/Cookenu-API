import { Request, Response } from "express";
import connection from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerated } from "../services/IdGenerated";
import { Follow, user } from "../types";

export default async function followUser(
   req: Request,
   res: Response
): Promise<void | any> {
   try {

      const { userToFollowId } = req.body
      const token = req.headers.authorization as string

      const tokenData = await new Authenticator().getTokenData(token)

      if (!tokenData) {
         res.statusCode = 401
         res.statusMessage = "token invalido ou nao passado no headers"
         throw new Error()
      }

      if (!userToFollowId) {
         res.statusCode = 422
         throw new Error("Preencha o campo 'userToFollowId' ")
      }
      const verifyExistUserToFollow = await connection("cookenu_users").where('id', 'like', `%${userToFollowId}%`)

      if (verifyExistUserToFollow.length === 0) {
        res.statusCode = 404
        throw new Error("Usuário e ser seguido não encontrado")
     }
     const follow_id:string = tokenData.id
     const verifyFolowersUser = await connection("cookenu_follow").where('followed_id', 'like', `%${userToFollowId}%`).where('follow_id', 'like', `%${follow_id}%`)
console.log("verify",verifyFolowersUser)
     if (verifyFolowersUser.length >= 1) {
        res.statusCode = 401
        throw new Error("Você ja segue este usuário")
     }
      
      if (userToFollowId === follow_id) {
        res.statusCode = 401
        throw new Error("Você não pode seguir a si mesmo' ")
     }

      const id: string = new IdGenerated().generatedId()
      const newFollow:Follow = { 
          id,
          follow_id,
          followed_id:userToFollowId
       
      }

      await connection('cookenu_follow')
         .insert(newFollow)

      res.status(201).send({ message: "Followed successfully" })

   } catch (error) {
 
      if (error instanceof Error) {
         res.send({ message: error.message })
     } else {
         res.send({ message: "Erro inesperado" })
     }
      
   }
}