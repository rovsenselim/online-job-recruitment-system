import Joi from "joi";

const LoginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email boş ola bilməz",
        "string.email": "Düzgün email yazın"
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Şifrə boş ola bilməz",
        "string.min": "Şifrə ən az 6 simvol olmalıdır"
    })
});

export default LoginValidationSchema;
