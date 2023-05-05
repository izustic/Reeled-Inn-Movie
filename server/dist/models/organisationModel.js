"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const userModel_1 = require("./userModel");
class organisationInstance extends sequelize_1.Model {
}
exports.organisationInstance = organisationInstance;
organisationInstance.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    adminID: {
        type: sequelize_1.DataTypes.UUIDV4,
    }
}, {
    sequelize: database_config_1.default,
    tableName: "organisation"
});
organisationInstance.hasMany(userModel_1.userInstance, { foreignKey: "organisationID", as: "user" });
userModel_1.userInstance.belongsTo(organisationInstance, { foreignKey: "organisationID", as: "organisation" });
