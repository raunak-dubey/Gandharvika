import { body } from 'express-validator';

export const registerUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscore"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),

  body("avatar")
    .optional()
    .isURL()
    .withMessage("Avatar must be a valid URL"),
];

export const loginUserValidator = [
  body("identifier")
    .notEmpty()
    .withMessage("Username or Email is required")
    .custom((value) => {
      const isEmail = validator.isEmail(value);
      const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);

      if (!isEmail && !isUsername) {
        throw new Error("Identifier must be a valid email or username");
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
];