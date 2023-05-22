import * as yup from "yup";

export const promoSchema = yup.object().shape({
  promoCode: yup.string().required("Enter promo code"),
  promoDescription: yup.string().required("Enter promo code description"),
  promoDiscount: yup.string().required("Enter promo code discount"),
  promoCurrency: yup
    .string()
    .typeError("Select promo code currency")
    .required("Select promo code currency"),
  promoMaxAmount: yup
    .number()
    .typeError("Enter promo code max amount")
    .required("Enter promo code max amount"),
  promoExpiry: yup.string().required("Select promo code expiry date"),
  promoStatus: yup
    .string()
    .typeError("Select promo code status")
    .required("Select promo code status"),
});
