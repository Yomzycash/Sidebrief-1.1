import * as yup from "yup";

export const cardInfoSchema = yup.object().shape({
	cardNumber: yup.string().max(19).min(16).required(),
	expDate: yup.string().max(5).min(5).required(),
	cvv: yup.string().max(3).min(3).required(),
});
