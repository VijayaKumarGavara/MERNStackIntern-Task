export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!formData.lastName || formData.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!validateMobile(formData.mobile)) {
    errors.mobile = "Mobile must be 10 digits";
  }

  if (!formData.gender) {
    errors.gender = "Gender is required";
  }

  if (!formData.status) {
    errors.status = "Status is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
