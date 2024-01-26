import joi from "joi";
import { CreateUser } from "../controllers/authController.js";

const signUpSchema = joi.object<CreateUser>({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}/
    )
    .required(),
});

export default signUpSchema;
