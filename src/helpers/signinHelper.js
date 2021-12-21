/* eslint-disable prefer-const */
export default function SignInHelper(values) {
  let errors = {};
  if (!values.email && values.email.length === 0) {
    errors.emailErr = true;
    errors.emailMsg = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.emailErr = true;
    errors.emailMsg = 'Email is invalid';
  }
  return errors;
}
