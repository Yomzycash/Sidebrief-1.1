import { isAfter } from "date-fns";
import { useUpdateUserMutation } from "services/staffService";

export const getPromoPrice = (item) => {
  let promoInfo = JSON.parse(localStorage.getItem("promoInfo"));

  let originalPrice = item?.servicePrice;
  let promoPrice;
  let currencyMatch =
    promoInfo?.promoCurrency?.toLowerCase() === item?.serviceCurrency?.toLowerCase();

  if (promoInfo && currencyMatch) {
    let discountPrice = originalPrice * (promoInfo.promoDiscount / 100);
    discountPrice =
      discountPrice >= promoInfo.promoMaxAmount ? promoInfo.promoMaxAmount : discountPrice;
    promoPrice = originalPrice - discountPrice;
  }

  return promoPrice ? promoPrice.toLocaleString("en-US") : 0;
};

export const getPromoWarn = (item) => {
  if (!item?.serviceId) return;

  let promoInfo = JSON.parse(localStorage.getItem("promoInfo"));

  if (!promoInfo) return false;

  let message;
  const expired = isAfter(new Date(), new Date(promoInfo?.promoExpiry));
  if (expired) message = "This promo code has expired";
  if (!promoInfo?.promoStatus) message = "This promo code has been disabled";
  if (item?.serviceCurrency !== promoInfo?.promoCurrency)
    message = `Promo code currency is ${promoInfo?.promoCurrency} (can't use)`;

  return message;
};

export const useServiceActions = () => {
  const [updateUser, updateState] = useUpdateUserMutation();

  const handleUserUpdate = async (payload, email) => {
    const response = await updateUser({ payload, email });
    const data = response?.data;
    const error = response?.error;

    console.log(response);
    if (data) console.log("Successfully updated user");
    else if (error) console.log("Error updating user", error);

    return { data, error };
  };

  return { handleUserUpdate };
};
