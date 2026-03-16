import { z } from "zod";
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX
} from "../../../../../shared/constants/validation";

export const registerSchema = z.object({
  username: z.string()
    .regex(USERNAME_REGEX, 'Username must be 3-30 characters and only contain letters, numbers and underscores.'),

  email: z.string().min(3, "Email is required")
    .regex(EMAIL_REGEX, 'Email must be a valid email.'),

  password: z.string().regex(PASSWORD_REGEX, 'Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character.')
});

export const loginSchema = z.object({
  identifier: z.string().min(3, "Email or Username is required")
    .refine((value) => {
      const isEmail = EMAIL_REGEX.test(value);
      const isUsername = USERNAME_REGEX.test(value);

      return isEmail || isUsername;
    }, 'Identifier must be a valid email or username'),

  password: z.string().regex(PASSWORD_REGEX, 'Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character.')
});