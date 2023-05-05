import Joi from "joi";

export const adminRegisterVal = Joi.object().keys({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
	confirm_password: Joi.any()
		.equal(Joi.ref("password"))
		.required()
		.label("confirm_password")
		.messages({ "any.only": "{{#label}} does not mean" }),
});

export const adminLoginVal = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
});

export const createOrganisationVal = Joi.object().keys({
	name: Joi.string().required(),
	address: Joi.string().required(),
	description: Joi.string().required(),
	website: Joi.string().required(),
});

export const userRegisterVal = Joi.object().keys({
	fullName: Joi.string().required(),
	email: Joi.string().required(),
	userType: Joi.string().required(),
	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required()
});

export const userLoginVal = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
});

export const options = {
	abortEarly: false,
	errors: {
		wrap: {
			label: "",
		},
	},
};
