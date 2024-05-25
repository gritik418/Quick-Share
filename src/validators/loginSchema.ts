import { object, string, InferType } from "yup";

const loginSchema = object({
  email: string().email().required(),
  password: string().required().min(8).max(32),
});

export type LoginDataType = InferType<typeof loginSchema>;

export default loginSchema;
