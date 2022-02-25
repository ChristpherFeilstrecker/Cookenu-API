import express from 'express'
import cors from 'cors'
import {AddressInfo} from 'net'

const app = express()

app.use(express.json())
app.use(cors())

const { PORT = 3003 } = process.env

const server = app.listen(PORT , ()=>{
    if(server){
        const address = server.address() as AddressInfo
        console.log(`server is running on port http://localhost:${address.port}`)
    }
    else{
        console.log('failure upon starting server')
    }
})

export default app