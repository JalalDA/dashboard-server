import db from "../config/db";
import { DataTypes } from "sequelize";

const ShoppingTransactions = db.define('shopping_transaction', {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false,
    },
    supplier_id : {
        type : DataTypes.STRING,
    },
    item : {
        type : DataTypes.JSON,
    },
    total_payment : {
        type : DataTypes.INTEGER
    }

})

export default ShoppingTransactions