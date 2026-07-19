import * as z from "zod";
import bcrypt from 'bcrypt';

import userRepository from "../repositories/userRepository.js";


export const createUserSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(10, { message: "Email must be at least 10 characters long"})
        .trim()
        .refine(async (value) => {
            const result = await userRepository.findByEmail(value);

            return !result;
        }, { error: "Email already exists" }),
    password: z.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]+$/, { message: "Password must contain at least one letter or number" }),

    repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
}).transform(({ repeatPassword, ...data }) => {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    return {
        ...data,
        password: hashedPassword,
    };
});