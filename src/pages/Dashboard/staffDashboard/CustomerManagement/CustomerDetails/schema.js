import * as yup from "yup";

export const customerEmailSchema = yup.object().shape({
  emails: yup
    .array()
    .min(1, "Select or enter recipient email")
    .required("Recipient email is required"),
  title: yup.string().required("Email subject is required"),
  body: yup.string().required("Message field is required"),
  introText: yup.string().required("Introduction text field is required"),
  footer: yup.string().required("Email signature is required"),
});

export const OTPSchema = yup.object().shape({
  otp: yup.number().typeError("Enter OTP").required("Enter OTP"),
});
