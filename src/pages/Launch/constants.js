import * as yup from "yup";

export const defaultLocation = {
  name: "--",
  isoCode: "--",
};

export const addressSchema = yup.object().shape({
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  number: yup.number("Please enter a valid number").required(""),
  zipcode: yup.string(),
  email: yup.string().email().required(),
});
