export const signUpValidation = (
  newErrors,
  password,
  confirmPassword,
) => {
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]?)[a-zA-Z0-9\W_]{8,}$/;

  if (password && confirmPassword && password !== confirmPassword) {
    newErrors = {
      ...newErrors,
      confirm_password: {
        message: 'Passwords does not match',
        field: 'confirm_password',
      },
    };
  }

  if (password && password.length < 8) {
    newErrors = {
      ...newErrors,
      password: {
        message:
          'This password is too short. It must contain at least 8 characters.',
        field: 'password',
      },
    };
    return newErrors
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
