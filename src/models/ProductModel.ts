import { DataTypes} from "sequelize";
import db from "../config/db";

const Products = db.define('products', {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    product_name : {
        type : DataTypes.STRING
    },
    selling_price : {
        type : DataTypes.INTEGER
    },
    description : {
        type : DataTypes.STRING
    },
    stock : {
        type : DataTypes.INTEGER
    },
    supplier : {
        type : DataTypes.STRING
    },
    images : {
        type : DataTypes.STRING
    },
    delivery_info : {
        type : DataTypes.STRING
    },
    status : {
        type : DataTypes.STRING
    },
    deleted_at : {
        type : DataTypes.DATE
    },
    capital_price : {
        type : DataTypes.INTEGER
    }
})

export default Products