import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const connection = knex({
    client: 'mysql',
    connection: {
        host: "35.226.146.116",
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        multiStatements: true

    }
})

export default connection