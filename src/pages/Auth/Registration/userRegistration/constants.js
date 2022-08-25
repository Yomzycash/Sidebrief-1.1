import * as yup from "yup";

export const userRegistrationSchema = yup.object().shape({
	Firstname: yup.string().required("First name is a required field"),
	Lastname: yup.string().required("Last name is a required field"),
	Email: yup.string().email("Enter a valid email address").required(),
	PhoneNumber: yup.string().required("Phone number is a required field"),
	Password: yup.string().min(8).max(15).required(),
    Gender: yup.object().shape({
      value: yup.string().required()
    }),
	Date: yup
		.string()
		.matches(
			"^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$", // Date regex
			"Not a valid date" // error message
		)
		.required(),
});

export const genderOptions = [
	{ value: "Male", label: "Male" },
	{ value: "Female", label: "Female" },
	{ value: "Transgender", label: "Transgender" },
	{ value: "Non-binary", label: "Non-binary" },
	{ value: "Other", label: "Other" },
];
