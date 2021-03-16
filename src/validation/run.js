import * as Yup from "yup";

export const runValidation = Yup.object().shape({
  description: Yup.string()
    .required("Please enter a description"),
  date: Yup.string().matches(/^(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{2}$/,
    "Please enter a valid date")
})
