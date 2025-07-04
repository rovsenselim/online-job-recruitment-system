import Joi from "joi";

const RegisterValidationSchema = Joi.object({
    fullname: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[a-zA-ZƏəÖöÜüĞğÇçŞşİı\s]+$/)
        .when("role", {
            is: "employee",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),

    companyName: Joi.string()
        .trim()
        .min(2)
        .max(70)
        .regex(/^[a-zA-Z0-9ƏəÖöÜüĞğÇçŞşİı\s]+$/)
        .when("role", {
            is: "employer",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),

    username: Joi.string()
        .trim()
        .alphanum()
        .min(4)
        .max(20)
        .required(),

    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .required(),

    password: Joi.string()
        .min(8)
        .max(64)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$"))
        .required()
        .messages({
            "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Confirm password must match password" }),

    role: Joi.string()
        .valid("employee", "employer")
        .required(),

    terms: Joi.boolean().valid(true).required().messages({
        "any.only": "You must agree to the terms and conditions",
    }),
});

export default RegisterValidationSchema;
