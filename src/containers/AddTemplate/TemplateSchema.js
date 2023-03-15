import * as yup from "yup";

export const TemplateSchema = yup.object().shape({
	
    title: yup.string().required("Enter your template title"),
    url: yup.string().required("Enter your template url"),
});
