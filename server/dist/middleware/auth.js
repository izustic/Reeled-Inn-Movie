"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = require("../models/adminModel");
const jwtsecret = process.env.JWT_SECRET;
const auth = async function (req, res, next) {
    try {
        const authorisation = req.headers.authorization;
        if (!authorisation) {
            return res.status(401).json({ Error: "Hey there!, you need to log in" });
        }
        const token = authorisation.slice(7, authorisation.length);
        const verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!verified) {
            return res.status(401).json({ Error: "Hey there!, why are you trying to be a criminal" });
        }
        const { id } = verified;
        const Admin = await adminModel_1.adminInstance.findOne({
            where: { id }
        });
        if (!Admin) {
            return res.status(401).json({ Error: "Hey there!, you need to be an Admin" });
        }
        req.Admin = verified;
        next();
    }
    catch (error) {
        return res.status(401).json({ Error: "Hey there!,kindly sign up" });
    }
};
exports.auth = auth;
