import { Sequelize } from "sequelize";

const db = new Sequelize(
    `${process.env.DB_NAME}`,
    process.env.DB_US!,
    process.env.DB_PASS,
    {
        host : process.env.DB_HOST,
        dialect : 'postgres'
    }
)

export default db