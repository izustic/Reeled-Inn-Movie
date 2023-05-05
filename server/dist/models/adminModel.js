"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const organisationModel_1 = require("./organisationModel");
class adminInstance extends sequelize_1.Model {
}
exports.adminInstance = adminInstance;
adminInstance.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    // organisationID: {
    //     type: DataTypes.UUIDV4,
    // }
}, {
    sequelize: database_config_1.default,
    tableName: 'admin'
});
adminInstance.hasMany(organisationModel_1.organisationInstance, { foreignKey: "adminID", as: "organisation" });
organisationModel_1.organisationInstance.belongsTo(adminInstance, { foreignKey: "adminID", as: "admin" });
