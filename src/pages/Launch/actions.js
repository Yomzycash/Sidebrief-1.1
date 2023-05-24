import { toast } from "react-hot-toast";
import { setCurrentPage } from "redux/Slices";
import { store } from "redux/Store";
import { handleError } from "utils/globalFunctions";

//
export const getPromoPrice = (item) => {
  let promoInfo = JSON.parse(localStorage.getItem("promoInfo"));

  let originalPrice = item?.entityFee;
  let promoPrice;
  let currencyMatch =
    promoInfo?.promoCurrency?.toLowerCase() === item?.entityCurrency?.toLowerCase();

  if (promoInfo && currencyMatch) {
    let discountPrice = originalPrice * (promoInfo.promoDiscount / 100);
    discountPrice =
      discountPrice >= promoInfo.promoMaxAmount ? promoInfo.promoMaxAmount : discountPrice;
    promoPrice = originalPrice - discountPrice;
  }

  return promoPrice ? promoPrice.toLocaleString("en-US") : 0;
};

// Add a member
// info needs to entail: launchCode, formData, and addMember
export const handleMemberAdd = async (info) => {
  const requiredData = {
    launchCode: info.launchCode,
    businessMember: {
      memberName: info.formData.fullName,
      memberEmail: info.formData.email,
      memberPhone: info.formData.phone,
    },
  };
  let response = await info.addMember(requiredData);

  if (response.data) {
    // Get the information of all added members
    const allMembers = Object.entries(response.data.businessMembers);
    // Get the information of the just added member
    const memberInfo = allMembers[allMembers.length - 1][1];
    return { data: memberInfo };
  } else if (response.error) {
    return { error: response.error };
  }
};

// Update a member
// info needs to entail: launchCode, formData,  memberCode, and updateMember
export const handleMemberUpdate = async (info) => {
  const requiredData = {
    launchCode: info.launchCode,
    memberCode: info.memberCode,
    businessMember: {
      memberName: info.formData.fullName,
      memberEmail: info.formData.email,
      memberPhone: info.formData.phone,
    },
  };

  let response = await info.updateMember(requiredData);

  if (response.data) {
    // Get the information of all added members
    const allMembers = Object.entries(response.data.businessMembers);
    // Get the information of the just added member
    const memberInfo = allMembers[allMembers.length - 1][1];
    return { data: memberInfo };
  } else if (response.error) {
    return { error: response.error };
  }
};

// Delete a member
// info needs to entail: launchCode, memberCode, and deleteMember
export const handleMemberDelete = async (info) => {
  let requiredData = {
    launchCode: info.launchCode,
    memberCode: info.memberCode,
  };
  let response = await info.deleteMember(requiredData);
  // TODO: Check what response returns
  return response;
};

// View all members
// info needs to entail: ...launchResponse and viewMembers
export const handleMembersView = async (info) => {
  let requiredData = {
    launchCode: info.launchCode,
    registrationCountry: info.registrationCountry,
    registrationType: info.registrationType,
  };

  let response = await info.viewMembers(requiredData);

  if (response.data) {
    let membersInfo = [...response.data.businessMembers];
    return { data: membersInfo };
  } else if (response.error) {
    return { error: response.error };
  }
};

// View a single member
export const handleSingleMemberView = async (memberCode) => {
  let members = await handleMembersView();

  if (members.data) {
    let shareholder = members?.data?.filter((el) => el.memberCode === memberCode);
    if (shareholder) {
      // TODO
      return { data: shareholder };
    } else {
      return { error: shareholder };
    }
  } else if (members.error) {
    return { error: members.error };
  }
};

//

//

// Check the existence of a member
// info needs to entail: ...launchResponse, formData and viewMembers
export const checkMemberExistence = async (info) => {
  let members = await handleMembersView(info);

  if (members.data) {
    let member = members.data.filter(
      (member) =>
        member.memberName.toLowerCase() === info.formData.fullName.toLowerCase() &&
        member.memberEmail.toLowerCase() === info.formData.email.toLowerCase() &&
        member.memberPhone === info.formData.phone
    );
    if (member.length > 0) return { data: { status: true, data: member[0] } };
    else return { data: false };
  } else {
    return { error: members.error };
  }
};

//

//

export const handleResponse = (response, successMessage, successAction, errorAction) => {
  if (response.data) {
    toast.success(successMessage);
    if (successAction) successAction();
  } else {
    if (errorAction) errorAction();
    handleError(response?.error);
  }
};

//

//

// info needs to entail: ...launchResponse and viewPayLaunch
export const checkPaymentStatus = async (info) => {
  let requiredData = {
    launchCode: info.launchCode,
    registrationCountry: info.registrationCountry,
    registrationType: info.registrationType,
  };
  if (info.launchCode) {
    let viewResponse = await info.viewPayLaunch(requiredData);
    let paymentInfo = viewResponse?.data?.businessPayment;
    let data = paymentInfo[paymentInfo?.length - 1];
    let error = viewResponse?.error;
    if (data) {
      if (data?.paymentStatus === "successful") {
        return { status: true, data: data };
      } else {
        return { status: false };
      }
    } else {
      return { status: false };
    }
  } else return { status: false };
};
