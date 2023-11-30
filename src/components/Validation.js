const Validation = (formData, confirmPassword) => {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (formData.email === "") {
    errors.email = "Email is required";
  }
  if (!email_pattern.test(formData.email)) {
    errors.email = "Invalid Email";
  }
  if (formData.password === "") {
    errors.password = "Password is required";
  }
  if (!password_pattern.test(formData.password)) {
    errors.password =
      "Must contain at least 1 uppercase letter, 1 lowercase letter and a number";
  }
  if (confirmPassword === "" || confirmPassword != formData.password) {
    errors.confirmPassword = "Password not matched";
  }
  if (errors == {}) return null;
  else return errors;
};

export default Validation;
