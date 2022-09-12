import * as yup from "yup";

export const defaultLocation = {
	name: "--",
	isoCode: "--",
};

export const schema = yup.object().shape({
	Email: yup
		.string()
		.email("Enter a valid email address")
		.required("Email is a required field"),
});
