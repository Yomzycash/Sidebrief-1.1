import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { handleError, handleResponse } from "utils/globalFunctions";
import voucher_gen from "voucher-code-generator";

export const useActions = (
  data,
  dataArr,
  setDataArr,
  promoCode,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
  refetch,
  reset,
  selectedPromo,
  setDeleteConfirm
) => {
  const navigate = useNavigate();

  const handleCellClick = (info, row, col) => {
    console.log(info, row, col);
    // navigate(`/staff-dashboard/promo-codes/${info?.promoCode}`);
  };

  const handlePromoCreate = () => {
    navigate("/staff-dashboard/promo-codes/create");
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    filterWhenSearched(value);
  };

  //Filters data by search value
  const filterWhenSearched = (searchValue) => {
    if (searchValue) {
      const filteredDataArr = dataArr?.filter((el) => {
        const {
          promoCode,
          promoDescription,
          promoCurrency,
          promoDiscount,
          promoExpiry,
          promoMaxAmount,
        } = el;
        return (
          includesSearched(promoCode, searchValue) ||
          includesSearched(promoDescription, searchValue) ||
          includesSearched(promoCurrency, searchValue) ||
          includesSearched(promoDiscount, searchValue) ||
          includesSearched(format(new Date(promoExpiry), "dd-MMM-yyyy"), searchValue) ||
          includesSearched(promoMaxAmount, searchValue)
        );
      });
      setDataArr(filteredDataArr);
    } else if (searchValue === "") setDataArr(data);
  };

  //
  const includesSearched = (text, searchValue) => {
    return text?.toString()?.toLowerCase()?.includes(searchValue?.toLowerCase());
  };

  const generatePromo = () => {
    return voucher_gen.generate({
      length: 8,
      count: 1,
      prefix: "promo-",
      postfix: `-${new Date().getFullYear()}`,
      pattern: "####-####",
    });
  };

  //

  const submitForm = async (formInfo) => {
    const response = promoCode
      ? await handleUpdatePromo(formInfo)
      : await handleCreatePromo(formInfo);
    console.log(response);
  };

  const handleCreatePromo = async (formInfo) => {
    const payload = getPayload(formInfo);
    const response = await createPromoCode(payload);
    const data = response?.data;
    const error = response?.error;
    if (data) {
      handleResponse(response, "Promo code created successfully", refetch());
      reset();
    } else handleError(error);
  };

  const handleUpdatePromo = async (formInfo) => {
    const payload = getPayload(formInfo);
    const response = await updatePromoCode(payload);
    const data = response?.data;
    const error = response?.error;
    if (data) handleResponse(response, "Promo code updated successfully", refetch());
    else handleError(error);
  };

  const handleDeletePromo = async () => {
    const response = await deletePromoCode(selectedPromo);
    const data = response?.data;
    const error = response?.error;
    if (data) {
      handleResponse(response, "Promo code deleted successfully", refetch());
      navigate("/staff-dashboard/promo-codes/create");
      setDeleteConfirm(false);
    } else handleError(error);
  };

  const getPayload = (formInfo) => ({
    ...formInfo,
    promoStatus: formInfo?.promoStatus?.toLowerCase() === "active" ? true : false,
  });

  const handleActiveToggle = async (e, promoInfo) => {
    const response = await updatePromoCode({ ...promoInfo, promoStatus: !promoInfo?.promoStatus });
    console.log(response);
    const data = response?.data;
    const error = response?.error;
    const message = `Promo code ${promoInfo?.promoStatus ? "Disabled" : "Enabled"} successfully`;
    if (data) handleResponse(response, message, refetch());
    else handleError(error);
  };

  const handlePromoEdit = (e, promoInfo) => {
    navigate(`/staff-dashboard/promo-codes/${promoInfo?.promoCode}`);
  };

  return {
    handleCellClick,
    handleSearch,
    filterWhenSearched,
    generatePromo,
    handlePromoCreate,
    submitForm,
    handleDeletePromo,
    handleActiveToggle,
    handlePromoEdit,
  };
};
