"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationCreate = void 0;
const utils_1 = require("../utils/utils");
const organisationModel_1 = require("../models/organisationModel");
const uuid_1 = require("uuid");
const organisationCreate = async function (req, res, next) {
    try {
        const idGenerator = (0, uuid_1.v4)();
        const verified = req.Admin;
        const { name, address, description, website } = req.body;
        // valiate user input 
        const validationResult = utils_1.createOrganisationVal.validate(req.body, utils_1.options);
        if (validationResult.error) {
            res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const newOrganisation = await organisationModel_1.organisationInstance.create({
            id: idGenerator,
            name,
            address,
            description,
            website,
            adminID: verified.id
        });
        return res.status(201).json({
            msg: "New Organisation created",
            newOrganisation
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.organisationCreate = organisationCreate;
