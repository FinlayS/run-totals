import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required("Please enter an email address"),
  password: Yup.string()
    .required('Please enter a valid password')
    .min(8, 'Must be at least 8 characters'),
})
