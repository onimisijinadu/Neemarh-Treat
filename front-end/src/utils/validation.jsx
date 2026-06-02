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

export const PasswordValidation = (
  confirmPassword,
  newPassword,
  currentPassword,
  currentDatabasePassword,
) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%&#+&-])[a-zA-Z\d@$%&#+&-]{6,}$/;

  if (!passwordRegex.test(newPassword)) {
    return {
      isvalid: false,
      errorMessage:
        "New Password must be 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
    };
  }

  if (!passwordRegex.test(confirmPassword)) {
    return {
      isvalid: false,
      errorMessage:
        "Confirm Password must be 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
    };
  }

  const hasPassword = currentDatabasePassword.trim() !== "" ? true : false;

  if (hasPassword) {
    if (
      currentPassword !== currentDatabasePassword &&
      currentDatabasePassword !== ""
    ) {
      return {
        isvalid: false,
        errorMessage: "Please Enter your correct current password.",
      };
    }
  }

  if (newPassword !== confirmPassword) {
    return {
      isvalid: false,
      errorMessage: "Passwords do not match.",
    };
  }

  return { isvalid: true, errorMessage: "successful" };
};

// Remove any useAuth imports here
// export const PasswordValidation = (formData, currentDatabasePassword) => {
//   const errorMessage = {};

//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%&#+&-])[a-zA-Z\d@$%&#+&-]{6,}$/;

//   if ("newPassword" in formData) {
//     const newPassword = formData.newPassword;

//     if (!passwordRegex.test(newPassword)) {
//       errorMessage.newPassword =
//         "New Password must be 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
//     }
//   }

//   if ("confirmPassword" in formData) {
//     const confirmPassword = formData.confirmPassword;

//     if (!passwordRegex.test(confirmPassword)) {
//       errorMessage.confirmPassword =
//         "Confirm Password must be 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
//     }
//   }

//   if ("currentPassword" in formData) {
//     const currentPassword = formData.currentPassword;

//     // Use the password we passed in as an argument instead of calling a hook
//     if (currentPassword !== currentDatabasePassword && currentDatabasePassword !== "") {
//       errorMessage.currentPassword = "Please Enter your correct current password.";
//     }
//   }

//   if ("newPassword" in formData && "confirmPassword" in formData) {
//     const newPassword = formData.newPassword;
//     const confirmPassword = formData.confirmPassword;
//     if (newPassword !== confirmPassword) {
//       errorMessage.matchPassword = "Passwords do not match.";
//     }
//   }

//   return errorMessage; // 👈 CRITICAL FIX: You must return the object!
// };
