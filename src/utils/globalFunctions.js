import toast from "react-hot-toast";

// handle error encountered in endpoints call
export const handleError = (error) => {
  console.log(error);
  if (error?.status === "FETCH_ERROR") {
    toast.error("Please check your internet connection");
  } else if (error?.originalStatus === "404") {
    toast.error("Please check credentiaal");
  } else if (error?.data?.message) {
    toast.error(error?.data.message);
  } else if (typeof error === "string") {
    toast.error(error);
  }
};

// Check if an email is a staff email
export const checkStaffEmail = (email) => {
  let emailArr = email?.split("");
  let index = emailArr?.indexOf("@");
  let check = email?.slice(index + 1, index + 10)?.toLowerCase();
  let staff = check === "sidebrief" ? true : false;
  return staff;
};
