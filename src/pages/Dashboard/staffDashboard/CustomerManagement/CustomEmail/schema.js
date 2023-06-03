import * as yup from "yup";

export const customerEmailSchema = yup.object().shape({
    emails:  yup.string().required("Recipient email is required"),
	title: yup.string().required("Email subject is required"),
	body: yup.string().required("Message field is required"),
	introText: yup.string().required("Introduction text field is required"),
});