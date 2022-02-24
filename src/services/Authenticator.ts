import { JwtPayload, sign, verify } from "jsonwebtoken"
import { authenticationData } from "../types";
import dotenv from 'dotenv'

dotenv.config()

export class Authenticator {

    generateToken = (
        payload: authenticationData
    ) => {
        const token = sign(
            payload,
            "asdjkl", // JW_SECRET
            { expiresIn: process.env.EXPIRES_IN}
        )

        return token;
    }


    getTokenData = (token: string) => {
        try {
            const tokenData = verify(
                token,
                "asdjkl" // JW_SECRET
            ) as JwtPayload

            return {
                id:tokenData.id
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

}

