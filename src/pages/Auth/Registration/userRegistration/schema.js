import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const userRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("Enter your first name"),
  last_name: yup.string().required("Enter your last name"),
  email: yup.string().email("Enter a valid email address").required("Enter your email"),
  phone: yup.string().min(10, "Invalid phone number").required("Enter your phone number"),
  // .test('phone-test', 'Invalid phone number', function (value) {
  //   const { country } = this.parent;
  //   const phoneNumber = typeof value === 'string'
  //   ? parsePhoneNumberFromString(value, country)
  //   : null;
  //   if (!phoneNumber) return false;
  //   const validLengths = phoneNumber.getMetadata().possibleLengths;
  //   return validLengths.includes(value.length);10  // })
  // .matches(/^[\d-+\s()]+$/, 'Phone number is invalid'),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Enter a password")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number"),

  referral_code: yup.string().required("Required"),
});
