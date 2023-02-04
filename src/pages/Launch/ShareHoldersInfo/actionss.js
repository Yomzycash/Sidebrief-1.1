import {
  handleMemberAdd,
  handleMembersView,
  handleMemberUpdate,
} from "../actions";

// This adds the person as a member and a shareholder
// info needs to entail: launchCode, formData, addShareholder and addMember
export const handleShareholderAdd = async (info) => {
  // TODO
  let addMemberResponse = await handleMemberAdd({ info: info });

  if (addMemberResponse.data) {
    const requiredShareholderData = {
      launchCode: info.launchCode,
      // TODO
      memberCode: addMemberResponse.data.memberCode,
      shareholderOwnershipPercentage: info.formData.sharePercentage,
      shareholderOwnershipType: info.formData.type,
      shareholderIdentificationNumber: info.formData.nin,
      shareholderRegistrationNumber: info.formData.regNo || null,
    };

    // Send the required payload to the backend
    let response = await info.addShareHolder(requiredShareholderData);

    if (response.data) {
      // Get the information of all added shareholder
      const allShareholders = Object.entries(
        response.data.businessShareholders
      );
      // Get the information of the just added shareholder
      const shareholderInfo = allShareholders[allShareholders.length - 1][1];
      // Merge the member information and the shareholder information of the just added shareholder
      let shareholderAllInfo = {
        ...addMemberResponse.data,
        ...shareholderInfo,
      };
      return { data: shareholderAllInfo };
    } else {
      return { error: response?.error.data.message };
    }
  } else {
    return { error: addMemberResponse.error };
  }
};

//

//

// This updates the person's shareholder info and member info
// info needs to entail: launchCode, formData, shareholdingCode, memberCode, updateShareholder and updateMember
export const handleShareholderUpdate = async (info) => {
  let updateMemberResponse = await handleMemberUpdate({ info: info });

  if (updateMemberResponse.data) {
    const requiredShareholderUpdateData = {
      launchCode: info.launchCode,
      memberCode: updateMemberResponse.data.memberCode,
      shareholderOwnershipPercentage: info.formData.sharePercentage,
      shareholderOwnershipType: info.formData.type,
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
  } else {
    return { error: updateMemberResponse.error };
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
    shareholderOwnershipType: info.shareholderOwnershipType,
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
    let mergedInfo = mergeInfo(shareholdersData, membersData);
    return { data: mergedInfo };
  } else if (shareholders.error) {
    return { error: shareholders.error };
  }
};

//

//

// This returns a single shareholder's info
export const handleShareholderView = async (shareholdingCode) => {
  let shareholders = await handleShareholdersView();

  if (shareholders.data) {
    let shareholder = shareholders?.data?.filter(
      (el) => el.shareholdingCode === shareholdingCode
    );
    if (shareholder) {
      // TODO
      return { data: shareholder };
    } else {
      return { error: shareholder };
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
