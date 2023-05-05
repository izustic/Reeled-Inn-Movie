import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { userInstance } from "./userModel";

export interface organisationAttributes {
    id: string,
    name: string,
    address: string,
    description: string,
    website: string,
    adminID: string
}

export class organisationInstance extends Model<organisationAttributes> { }

organisationInstance.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adminID: {
        type: DataTypes.UUIDV4,
    }
}, {
    sequelize: db,
    tableName: "organisation"
})

organisationInstance.hasMany(userInstance, {foreignKey:"organisationID", as: "user"})
userInstance.belongsTo(organisationInstance, {foreignKey:"organisationID", as: "organisation"})