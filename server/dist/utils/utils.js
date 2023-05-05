"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.userLoginVal = exports.userRegisterVal = exports.createOrganisationVal = exports.adminLoginVal = exports.adminRegisterVal = void 0;
const joi_1 = __importDefault(require("joi"));
exports.adminRegisterVal = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("confirm_password")
        .messages({ "any.only": "{{#label}} does not mean" }),
});
exports.adminLoginVal = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.createOrganisationVal = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    website: joi_1.default.string().required(),
});
exports.userRegisterVal = joi_1.default.object().keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    userType: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
});
exports.userLoginVal = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
