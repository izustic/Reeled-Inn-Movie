import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

export interface userAttributes {
	id: string;
	fullName: string;
	email: string;
	userType: string;
	password: string;
	// organisationID: string
}

export class userInstance extends Model<userAttributes> {}

userInstance.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		// organisationID: {
		//     type: DataTypes.UUIDV4
		// }
	},
	{
		sequelize: db,
		tableName: "user",
	}
);
