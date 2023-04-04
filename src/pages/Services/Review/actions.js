import { handleError } from "utils/globalFunctions";

export const useActions = ({ serviceId, complyInfo, updateComply }) => {
  const handleStatusUpdate = async () => {
    let payload = {
      serviceId: serviceId,
      complyCode: complyInfo?.complyCode,
      status: "submitted",
      paid: complyInfo?.paid,
    };

    let response = await updateComply(payload);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      return { data: data };
    } else {
      handleError(error);
    }
  };

  return { handleStatusUpdate };
};
