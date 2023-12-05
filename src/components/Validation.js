export const signUpValidation = (
  e,
  field,
  newErrors,
  password,
  confirmPassword,
) => {
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]?)[a-zA-Z0-9\W_]{8,}$/;

  if (!e.target.value && e.target.name === field) {
    newErrors = {
      ...newErrors,
      [e.target.name]: {
        message: `${field.replaceAll('_', ' ')} is required`,
        field: field,
      },
    };
  }

  if (password && confirmPassword && password !== confirmPassword) {
    newErrors = {
      ...newErrors,
      confirm_password: {
        message: 'Passwords does not match',
        field: 'confirm_password',
      },
    };
  }

  if (password && !password_pattern.test(password)) {
    newErrors = {
      ...newErrors,
      password: {
        message:
          'Password must contain at least 1 uppercase letter, 1 lowercase letter and a number',
        field: 'password',
      },
    };
  }
  return newErrors;
};
