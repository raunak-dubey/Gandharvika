import { body } from 'express-validator';
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX
} from '../../../../shared/constants/validation';
import { BadRequestError } from '../../utils/ApiError';

export const registerUserValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .matches(USERNAME_REGEX)
    .withMessage("Username must be 3-30 characters and only contain letters, numbers and underscores."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches(EMAIL_REGEX)
    .withMessage("Email must be a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(PASSWORD_REGEX)
    .withMessage(
      "Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character."
    ),

  body("avatar")
    .optional()
    .isURL()
    .withMessage("Avatar must be a valid URL"),
];

export const loginUserValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Username or Email is required")
    .custom((value) => {
      const isEmail = EMAIL_REGEX.test(value);
      const isUsername = USERNAME_REGEX.test(value);

      if (!isEmail && !isUsername) {
        throw new BadRequestError("Identifier must be a valid email or username");
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(PASSWORD_REGEX)
    .withMessage(
      "Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character."
    ),
];