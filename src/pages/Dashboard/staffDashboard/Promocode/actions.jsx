import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleResponse } from "utils/globalFunctions";
import voucher_gen from "voucher-code-generator";
import { Action, Status } from "./styled";
import * as yup from "yup";

export const useActions = ({
  data,
  dataArr,
  setDataArr,
  promoCode,
  clickedPromo,
  setClickedPromo,
  updateState,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
  setValue,
  refetch,
  reset,
  selectedPromo,
  setDeleteConfirm,
  allPromoCodes,
}) => {
  const navigate = useNavigate();

  // Returns the table header and body
  const getTable = () => {
    // Tabele header
    const header = ["Promo Code", "Discount", "Expiry Date", "Status", "Actions"];

    // Table body
    const body = dataArr?.map((el, i) => [
      el?.promoCode,
      el?.promoDiscount + "%",
      format(new Date(el?.promoExpiry), "dd-MMM-yyyy"),
      el?.promoStatus ? <Status active>Active</Status> : <Status>Inactive</Status>,
      <Action $active={el?.promoStatus}>
        <div value="disable">
          {el?.promoStatus ? `Disabl${getSuffix(i)}` : `Enabl${getSuffix(i)}`}
        </div>
      </Action>,
    ]);

    return { header, body };
  };

  // Controls the text depending on the loading state.
  const getSuffix = (index) => {
    if (clickedPromo?.row - 1 === index && updateState.isLoading) return "ing...";
    else return "e";
  };

  //
  const handleTableRowClick = (info, row, col) => {
    if (col !== 5) navigate(`/staff-dashboard/promo-codes/${info?.promoCode}`);
    else if (col === 5) handleActiveToggle(undefined, info);
    setClickedPromo({ ...info, row, col });
  };

  //
  const handlePromoCreate = () => {
    navigate("/staff-dashboard/promo-codes/create");
  };

  //
  const handleSearch = (e) => {
    let value = e.target.value;
    filterWhenSearched(value);
  };

  //
  const handleFilterChange = (e) => {
    const option = e.target.value.toLowerCase();
    if (option === "active") setDataArr(data?.filter((el) => el?.promoStatus === true));
    else if (option === "inactive") setDataArr(data?.filter((el) => el?.promoStatus === false));
    else setDataArr(data);
  };

  // Filters data by search value
  const filterWhenSearched = (searchValue) => {
    if (searchValue) {
      const filteredDataArr = data?.filter((el) => {
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

  //

  // Conditionally updates or creates a promo code, depending on the promo code coming from the params
  const submitForm = async (formInfo) => {
    const response = promoCode
      ? await handleUpdatePromo(formInfo)
      : await handleCreatePromo(formInfo);
    console.log(response);
  };

  // Generates a unique promo code
  const generatePromo = () => {
    const promo = voucher_gen.generate({
      length: 8,
      count: 1,
      prefix: "promo-",
      postfix: `-${new Date().getFullYear()}`,
      pattern: "####-####",
    });
    setValue("promoCode", promo[0]);
  };

  //
  const copyPromoCode = () => {
    const promoCode = document.getElementById("promo-code").value;
    navigator.clipboard.writeText(promoCode);
    toast.success("Promo copied successfully");
  };

  // Creates a promo code
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

  // Updates a promo code
  const handleUpdatePromo = async (formInfo) => {
    const payload = getPayload(formInfo);
    const response = await updatePromoCode(payload);
    const data = response?.data;
    const error = response?.error;
    if (data) handleResponse(response, "Promo code updated successfully", refetch());
    else handleError(error);
  };

  //  Deletes a promo code
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

  //
  const getPayload = (formInfo) => ({
    ...formInfo,
    promoStatus: formInfo?.promoStatus?.toLowerCase() === "active" ? true : false,
  });

  // Conditionally enables or disables a promo code
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
    getTable,
    handleTableRowClick,
    handleSearch,
    handleFilterChange,
    filterWhenSearched,
    generatePromo,
    copyPromoCode,
    handlePromoCreate,
    submitForm,
    handleDeletePromo,
    handleActiveToggle,
    handlePromoEdit,
  };
};

//
//
export const usePromoCodeSchema = ({ data }) => {
  const { promoCode } = useParams();

  const checkPromoExistence = () => {
    const currentPromoCode = document.getElementById("promo-code")?.value;
    const matchedPromo = data?.filter((el) => el.promoCode === currentPromoCode)[0];
    if (!matchedPromo || (matchedPromo && promoCode)) return true;
    else return false;
  };

  const getPromoSchema = () => {
    const promoSchema = yup.object().shape({
      promoCode: yup
        .string()
        .test("promoCode", "Promo code already exists", checkPromoExistence)
        .required("Enter promo code"),
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
    return promoSchema;
  };

  return { getPromoSchema };
};
