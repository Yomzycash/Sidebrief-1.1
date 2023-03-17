import * as yup from "yup";

export const DocSchema = yup.object().shape({
	
    title: yup.string().required("Enter your document title"),
});
