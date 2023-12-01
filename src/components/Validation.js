export const signUpValidation = (e, newErrors, password, confirmPassword) => {
  if (!e.target.value && e.target.name == "username") {
    newErrors = {
      ...newErrors,
      username: {
        message: "Username is required",
        field: "username",
      },
    };
  }

  if (!e.target.value && e.target.name == "email") {
    newErrors = {
      ...newErrors,
      email: {
        message: "Email is required",
        field: "email",
      },
    };
  }

  if (!e.target.value && e.target.name == "password") {
    newErrors = {
      ...newErrors,
      password: {
        message: "Password is required",
        field: "password",
      },
    };
  }

  if (!e.target.value && e.target.name == "confirm_password") {
    newErrors = {
      ...newErrors,
      confirm_password: {
        message: "Confirm password is required",
        field: "confirm_password",
      },
    };
  }

  if (password && confirmPassword && password !== confirmPassword) {
    newErrors = {
      ...newErrors,
      confirm_password: {
        message: "Passwords does not match",
        field: "confirm_password",
      },
    };
  }

  return newErrors;
};
