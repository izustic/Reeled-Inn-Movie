"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.adminSignUp = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const adminModel_1 = require("../models/adminModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const adminSignUp = async function (req, res, next) {
    try {
        const idGenerator = (0, uuid_1.v4)();
        const { name, email, password, confirm_password } = req.body;
        // validate admin input
        const validationResult = utils_1.adminRegisterVal.validate(req.body, utils_1.options);
        if (validationResult.error) {
            res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        //Generate salt(means to has password)
        const passwordhash = await bcryptjs_1.default.hash(password, 8);
        //check if the admin is existing 
        const admin = await adminModel_1.adminInstance.findOne({
            where: { email: email }
        });
        if (!admin) {
            const newAdmin = await adminModel_1.adminInstance.create({
                id: idGenerator,
                name,
                email,
                password: passwordhash
            });
            //after creating new admin attach to it a token
            const Admin = await adminModel_1.adminInstance.findOne({
                where: { email: email }
            });
            const { id } = Admin;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            res.status(201).json({
                msg: 'new admin created successfully',
                newAdmin,
                token
            });
        }
        else {
            res.status(301).send('existing admin, please login');
        }
    }
    catch (error) {
        res.status(400).json({ Error: "cant create admin" });
    }
};
exports.adminSignUp = adminSignUp;
const adminLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        //validate admin input
        const validationResult = utils_1.adminLoginVal.validate(req.body, utils_1.options);
        if (validationResult.error) {
            res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        //generate token for login 
        const admin = await adminModel_1.adminInstance.findOne({
            where: { email: email }
        });
        const { id } = admin;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: '2d' });
        const validAdmin = await bcryptjs_1.default.compare(password, admin.password);
        if (validAdmin) {
            res.status(201).json({
                msg: "Login successful",
                token,
                admin
            });
        }
        else {
            res.status(400).json({ Error: "invalid email/password" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Internal error' });
    }
};
exports.adminLogin = adminLogin;
