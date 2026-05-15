export const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
export const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value);
export const passwordStrength = (value) => {
  if (value.length  `$${value.toFixed(2)}`;
export const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month, day, year);
