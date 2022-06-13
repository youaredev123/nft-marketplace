import { trimEnd } from "lodash";

export default function (email, confirmEmail, password, confirmPassword) {
  var error = {};
  let hasEmptyField = false;
  if (!email) {
    error['email'] = 'Email is required';
    hasEmptyField = true;
  }

  if (!password) {
    error['password'] = 'Passowrd is required';
    hasEmptyField = true;
  }

  if (!confirmEmail) {
    error['confirmEmail'] = 'Confirm email is required';
    hasEmptyField = true;
  }

  if (!confirmPassword) {
    error['confirmPassword'] = 'Confirm password is required';
    hasEmptyField = true;
  }

  if (hasEmptyField) {
    return error;
  }

  if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
    error['email'] = 'Invalid email address';
    return error;
  }

  if (password.length < 8) {
    error['password'] = 'Must be at least 8 characters';
    return error;
  }

  if (email !== confirmEmail) {
    error['confirmEmail'] = 'Does not match the email';
  }

  if (password !== confirmPassword) {
    error['confirmPassword'] = 'Does not match the password';
  }

  return error;
}
