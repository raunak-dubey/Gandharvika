import { z } from "zod";
import {
    USERNAME_REGEX,
    EMAIL_REGEX,
    PASSWORD_REGEX
} from "../../../../../shared/constants/validation";

export const updateUserSchema = z.object({
    username: z.string()
        .regex(USERNAME_REGEX, 'Username must be 3-30 characters and only contain letters, numbers and underscores.'),

    email: z.string().min(3, "Email is required")
        .regex(EMAIL_REGEX, 'Email must be a valid email.'),
});

export const updatePasswordSchema = z.object({
    oldPassword: z.string().min(8, "Invalid Crendentials."),
    newPassword: z.string().regex(PASSWORD_REGEX, "Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character."),
    confirmPassword: z.string().min(8, "Confirm password is required.")
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const avatarSchema = z.object({
    mimetype: z.enum([
        "image/jpeg",
        "image/png",
        "image/webp",
    ]),
    size: z
        .number()
        .max(5 * 1024 * 1024, "Avatar must be less than 5MB"),
});