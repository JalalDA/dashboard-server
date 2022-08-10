import db from "../config/db";
import { DataTypes } from "sequelize";

const SalesTransactions = db.define('sales_transaction', {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false,
    },
    user_id : {
        type : DataTypes.STRING,
    },
    item : {
        type : DataTypes.JSON,
    },
    total_payment : {
        type : DataTypes.INTEGER
    }
})

export default SalesTransactions