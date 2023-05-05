import { Sequelize } from "sequelize";

const db = new Sequelize('app', '', '', {
    storage: './database.sqlite3',
    dialect: 'sqlite',
    logging: false
})

export default db