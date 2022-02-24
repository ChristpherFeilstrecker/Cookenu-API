import { Request, Response } from "express"
import connection from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { GetRecipe, Recipe } from "../types";


export async function getRecipe(req: Request, res: Response): Promise<void> {
   try {
      const token = req.headers.authorization as string
      const recipe_id = req.params.id
        
      const tokenData = await new Authenticator().getTokenData(token)

      if (!tokenData) {
         res.statusCode = 401
         res.statusMessage = "token invalido ou nao passado no headers"
         throw new Error("token invalido ou nao passado no headers")
      }


      const result = await connection("cookenu_recipes").where( 'id', 'like', `%${recipe_id}%`)

      if (!result.length) {
         res.status(204)
         throw new Error("Não existe esta receita cadastrada ou ID incorreto")
      }
      const recipe:GetRecipe = {
         id:result[0].id,
         title:result[0].title,
         description:result[0].description,
         created_date:result[0].created_date
     }

      res.status(200).send(recipe)

   } catch (error) {
      if (error instanceof Error) {
         res.send({ message: error.message })
     } else {
         res.send({ message: "Erro inesperado" })
     }
   }
}