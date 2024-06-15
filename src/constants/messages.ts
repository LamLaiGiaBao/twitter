export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 100 to 100 characters',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be between 6 and 50 characters',
  PASSWORD_MUST_BE_STRONG: 'Password must be at least 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 numbers, and 1 symbols',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be string',
  CONFIRM_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50 characters',
  CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm password must be strong',
  CONFIRM_PASSWORD_NOT_MATCH: 'Password confirmation does not match password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be in ISO 8601 format',
  REGISTER_SUCCESS: 'Register successfully',
  // Login
  USER_NOT_FOUND: 'User not found',
  LOGIN_SUCCESS: 'Login success',
  LOGIN_FAILED: 'Login failed'
} as const
