// username: 3–30 chars, letters numbers underscore
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;

// common email pattern
export const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// password rule from backend
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;