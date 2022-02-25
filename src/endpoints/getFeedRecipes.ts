import { Request, Response } from "express"
import connection from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { Profile, Recipe } from "../types";

export async function getFeedRecipes(req: Request, res: Response): Promise<void | any> {
   try {
console.log("getfeedrecipes")
      const token = req.headers.authorization as string

      const tokenData: any = await new Authenticator().getTokenData(token)
console.log("tokendata",tokenData.id)
      if (!tokenData) {
         res.statusCode = 401
         res.statusMessage = "token invalido ou nao passado no headers"
         throw new Error()
      }

      const usersFolowed = await connection("cookenu_follow").where('follow_id', 'like', `%${tokenData.id}%`)
      const feeds: any[] = []
console.log("usersfolowed",usersFolowed)
     for (let user of usersFolowed) {
      const result: any = await connection("cookenu_recipes").where('user_id', 'like', `%${user.followed_id}%`)
     
      feeds.push(result)
     }
console.log("feeds",feeds)
      if (!feeds || feeds.length === 0) {
         res.status(204)
         res.statusMessage ="Usuarios sem receitas cadastradas"
         throw new Error("Usuários sem receitas cadastradas")
      }

      res.status(200).send(feeds)

   } catch (error) {
      if (error instanceof Error) {
         res.send({ message: error.message })
      } else {
         res.send({ message: "Erro inesperado" })
      }
   }
}