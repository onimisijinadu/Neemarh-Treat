export const ValidateFormInputs = (email, password) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$#!%&])[a-zA-Z0-9@$#!%&]{6,}$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Please Enter a valid email address",
    };
  }
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must be 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&).",
    };
  }

  return {
    isValid: true,
    message: "Successful.",
  };
};
