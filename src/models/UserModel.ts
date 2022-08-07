import { DataTypes} from "sequelize";
import db from "../config/db";

const Users = db.define('users', {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    display_name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    phone : {
        type : DataTypes.INTEGER
    },
    photo : {
        type : DataTypes.STRING
    },
    birthday : {
        type : DataTypes.DATEONLY
    },
    delivery_address : {
        type : DataTypes.STRING
    },
    status : {
        type : DataTypes.STRING
    }
})

export default Users