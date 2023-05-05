import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { organisationInstance } from "./organisationModel";

export interface adminAttributes {
    id: string,
    name: string,
    email: string,
    password: string,
    // organisationID: string
}

export class adminInstance extends Model<adminAttributes>{ }

adminInstance.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // organisationID: {
    //     type: DataTypes.UUIDV4,
    // }
}, {
    sequelize: db,
    tableName: 'admin'
})

adminInstance.hasMany(organisationInstance, {foreignKey:"adminID", as: "organisation"})
organisationInstance.belongsTo(adminInstance, {foreignKey:"adminID", as: "admin"})