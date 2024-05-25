import { object, string, InferType, ref } from "yup";

const signupSchema = object({
  first_name: string().min(3).required(),
  last_name: string(),
  email: string().email().required(),
  password: string().required().min(8).max(32),
  password_confirmation: string().oneOf(
    [ref("password")],
    "Password and Confirm Password must be same."
  ),
});

export type SignupDataType = InferType<typeof signupSchema>;

export default signupSchema;
