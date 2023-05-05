"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignUp = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const jwtsecret = process.env.JWT_SECRET;
const userSignUp = async function (req, res, next) {
    try {
        const idGenerator = (0, uuid_1.v4)();
        const { fullName, email, userType, password, confirm_password } = req.body;
        const validationResult = utils_1.userRegisterVal.validate(req.body, utils_1.options);
        if (validationResult.error) {
            res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const passwordhash = await bcryptjs_1.default.hash(password, 8);
        const user = await userModel_1.userInstance.findOne({
            where: { email: email }
        });
        if (!user) {
            const newUser = await userModel_1.userInstance.create({
                id: idGenerator,
                ...req.body,
                password: passwordhash
            });
            const User = await userModel_1.userInstance.findOne({
                where: { email: email }
            });
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            res.status(200).json({
                msg: "New user created",
                newUser,
                token
            });
        }
        else {
            res.status(301).json({ msg: "User already exist, please login" });
        }
    }
    catch (error) {
        res.status(400).json({ Error: "cant create admin" });
    }
};
exports.userSignUp = userSignUp;
const userLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        //validate user input
        const validationResult = utils_1.userLoginVal.validate(req.body, utils_1.options);
        if (validationResult.error) {
            res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        //generate token for login 
        const User = await userModel_1.userInstance.findOne({
            where: { email: email }
        });
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: '2d' });
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (validUser) {
            res.status(201).json({
                msg: "Login successful",
                token,
                User
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
exports.userLogin = userLogin;
