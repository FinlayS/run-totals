import * as Yup from "yup";

export const runValidation = Yup.object().shape({
  runDescription: Yup.string()
    .required("Please enter a description"),
  // runDate: Yup.string().matches(/^([0-2][0-9]|(3)[0-1])(((0)[0-9])|((1)[0-2]))\d{4}$/, 'Invalid date (ddmmyyyy)')
  runDate: Yup.date().required()
    // .isDate('Please enter a valid date'),
})
