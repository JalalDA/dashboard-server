import db from "../config/db";
import { DataTypes } from "sequelize";

const AdminModels = db.define('admin', {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    display_name : {
        type : DataTypes.STRING
    },
    number_phone : {
        type : DataTypes.INTEGER,
    },
    adress : {
        type : DataTypes.STRING
    }
})

export default AdminModels