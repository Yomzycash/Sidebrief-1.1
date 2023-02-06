import {
  handleMemberAdd,
  handleMembersView,
  handleMemberUpdate,
} from "../actions";

// This adds the person as a member and a shareholder
// info needs to entail: launchCode, addMemberData, formData, addShareholder and addMember
export const handleShareholderAdd = async (info) => {
  const requiredShareholderData = {
    launchCode: info.launchCode,
    // TODO
    memberCode: info.addMemberData.memberCode,
    shareholderOwnershipPercentage: info.formData.sharePercentage,
    shareholderOwnershipType: "null",
    shareholderIdentificationNumber: info.formData.nin,
    shareholderRegistrationNumber: info.formData.regNo || null,
  };

  // Send the required payload to the backend
  let response = await info.addShareHolder(requiredShareholderData);

  if (response.data) {
    // Get the information of all added shareholder
    const allShareholders = Object.entries(response.data.businessShareholders);
    // Get the information of the just added shareholder
    const shareholderInfo = allShareholders[allShareholders.length - 1][1];
    // Merge the member information and the shareholder information of the just added shareholder
    let shareholderAllInfo = {
      ...info.addMemberData,
      ...shareholderInfo,
    };
    return { data: shareholderAllInfo };
  } else {
    return { error: response?.error };
  }
};

//

//

// This updates the person's shareholder info and member info
// info needs to entail: launchCode, formData, shareholdingCode, memberCode, updateShareholder and updateMember
export const handleShareholderUpdate = async (info) => {
  const requiredShareholderUpdateData = {
    launchCode: info.launchCode,
    memberCode: info.addMemberData.memberCode,
    shareholderOwnershipPercentage: info.formData.sharePercentage,
    shareholderOwnershipType: "null",
    shareholderIdentificationNumber: info.formData.nin,
    shareholderRegistrationNumber: info.formData.regNo || null,
    shareholdingCode: info.shareholdingCode,
  };

  // TODO

  // Responses from the backend
  let shareholdersUpdateResponse = await info.updateShareholder(
    requiredShareholderUpdateData
  );
  // The data from the response got from the backend
  let shareholdersUpdatedData =
    shareholdersUpdateResponse?.data?.businessShareholders;
  let error = shareholdersUpdateResponse?.error;

  if (shareholdersUpdatedData) {
    return { data: shareholdersUpdatedData };
  } else if (error) {
    return { error: error };
  }
};

//

//

// This deletes only the shareholder's info
// info needs to entail: launchCode, shareholdingCode, memberCode, shareholderOwnershipPercentage,shareholderOwnershipType, and deleteShareholder
export const handleShareholderDelete = async (info) => {
  const requiredDeleteData = {
    launchCode: info.launchCode,
    shareholdingCode: info.shareholdingCode,
    memberCode: info.memberCode,
    shareholderOwnershipPercentage: info.shareholderOwnershipPercentage,
    shareholderOwnershipType: "null",
  };
  // The delete response gotten from the backend
  let deleteResponse = await info.deleteShareholder(requiredDeleteData);

  // This fires off, if delete response is success
  if (deleteResponse.data) {
    return { data: "Deleted" };
  } else {
    if (deleteResponse.error) {
      return { error: deleteResponse.error };
    }
  }
};

//

//

// This returns all shareholders info
// info needs to entail: ...launchResponse, viewShareholders and viewMembers
export const handleShareholdersView = async (info) => {
  let requiredData = {
    launchCode: info.launchCode,
    registrationCountry: info.registrationCountry,
    registrationType: info.registrationType,
  };

  // Get data from view endpoints
  let shareholders = await info.viewShareholders(requiredData);

  if (shareholders.data) {
    let shareholdersData = [...shareholders.data.businessShareholders];
    let membersData = await handleMembersView(info);
    // Merge shareholders shareholder's data and member data
    let mergedInfo = mergeInfo(shareholdersData, membersData.data);
    return { data: mergedInfo };
  } else if (shareholders.error) {
    return { error: shareholders.error };
  }
};

//

//

// This returns a single shareholder's info
export const handleSingleShareholderView = async (memberCode) => {
  let shareholders = await handleShareholdersView();

  if (shareholders.data) {
    let shareholder = shareholders?.data?.filter(
      (el) => el.memberCode === memberCode
    );
    if (shareholder.length > 0) {
      // TODO
      return { data: shareholder[0] };
    } else {
      return { error: "Shareholder does not exist" };
    }
  } else if (shareholders.error) {
    return { error: shareholders.error };
  }
};

//

//

// Merge a shareholder's member information to his shareholder information
const mergeInfo = (shareholdersUpdatedData, membersUpdatedData) => {
  let shareholdersMembersMerged = [];
  shareholdersUpdatedData.forEach((shareholder) => {
    membersUpdatedData.forEach((member) => {
      if (member.memberCode === shareholder.memberCode) {
        let merged = { ...shareholder, ...member };
        shareholdersMembersMerged.push(merged);
      }
    });
  });

  return shareholdersMembersMerged;
};
