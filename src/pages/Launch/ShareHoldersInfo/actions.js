import { memberDelete } from "containers/Checkout/InfoSection/actions";

//
// Add a new shareholder
export const shareHolderAdd = async (
  launchCode,
  formData,
  memberInfo,
  addShareHolder
) => {
  const requiredShareholderData = {
    launchCode: launchCode,
    memberCode: memberInfo.memberCode,
    shareholderOwnershipPercentage: formData.share_percentage,
    shareholderOwnershipType: formData.share_type,
  };

  // Send the required payload to the backend
  let addShareHolderResponse = await addShareHolder(requiredShareholderData);

  if (addShareHolderResponse.data) {
    // Get the information of all added shareholder
    const allShareholders = Object.entries(
      addShareHolderResponse.data.businessShareholders
    );
    // Get the information of the just added shareholder
    const shareholderInfo = allShareholders[allShareholders.length - 1][1];
    // Merge the member information and the shareholder information of the just added shareholder
    let shareholderAllInfo = { ...memberInfo, ...shareholderInfo };
    console.log(shareholderAllInfo);
    return { data: shareholderAllInfo };
  } else {
    return { error: addShareHolderResponse.error.data.message };
  }
};

//
// Update a shareholder
export const shareholderUpdate = async (
  formData,
  selectedShareholder,
  updateShareholder
) => {
  const requiredShareholderUpdateData = {
    launchCode: selectedShareholder.launchCode,
    memberCode: selectedShareholder.memberCode,
    shareholderOwnershipPercentage: formData.share_percentage,
    shareholderOwnershipType: formData.share_type,
    shareholdingCode: selectedShareholder.shareholdingCode,
  };
  // Responses from the backend
  let shareholdersUpdateResponse = await updateShareholder(
    requiredShareholderUpdateData
  );
  // The data from the response got from the backend
  let shareholdersUpdatedData =
    shareholdersUpdateResponse?.data?.businessShareholders;
  let error = shareholdersUpdateResponse.error;

  if (shareholdersUpdatedData) {
    return { data: shareholdersUpdatedData };
  } else if (error) {
    return { error: error };
  }
};

//
// Delete a shareholder
export const shareholderDelete = async (
  isDirector,
  shareholder,
  deleteShareholder,
  deleteMember
) => {
  const requiredDeleteData = {
    launchCode: shareholder.launchCode,
    shareholdingCode: shareholder.shareholdingCode,
    memberCode: shareholder.memberCode,
    shareholderOwnershipPercentage: shareholder.shareholderOwnershipPercentage,
    shareholderOwnershipType: shareholder.shareholderOwnershipType,
  };
  // The delete response gotten from the backend
  let deleteResponse = await deleteShareholder(requiredDeleteData);
  // This fires off, if delete response is success
  if (deleteResponse.data) {
    // if the shareholder is not a director, membership is deleted.
    if (!isDirector) {
      let memberDeleteResponse = await memberDelete(shareholder, deleteMember);
      console.log(memberDeleteResponse);
    }

    return { data: "Deleted" };
  } else {
    if (deleteResponse.error) {
      return { error: deleteResponse.error };
    }
  }
};

//
// Merge a shareholder's member information to his shareholder information
export const mergeInfo = (shareholdersUpdatedData, membersUpdatedData) => {
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

//
// Merge a shareholder's director role, if he is a director
export const mergeDirectorRole = (shareholdersData, directorsData) => {
  shareholdersData.forEach((shareholder) => {
    directorsData.forEach((director) => {
      if (director.memberCode === shareholder.memberCode) {
        let shareholderIndex = shareholdersData.indexOf(shareholder);
        let shareholderCopy = { ...shareholder };
        shareholderCopy.directorRole = director.directorRole;
        shareholderCopy.directorCode = director.directorCode;
        shareholdersData.splice(shareholderIndex, 1, shareholderCopy);
      }
    });
  });

  return shareholdersData;
};

// //
// //
// export const mergeDirectorRole = (shareholdersData, directorsData
// ) => {
//   // Find the index of the selected shareholder, and splice in director's role

//   directorsData.forEach((director) => {
//     let shareholderIndex = shareholdersData.findIndex(
//       (sh) => sh.memberCode === director.memberCode
//     );
//     let shareholderData = shareholdersData[shareholderIndex];
//     let shareholderDataCopy = { ...shareholderData };
//     shareholderDataCopy.directorRole = formData.director_role;
//     shareholdersData.splice(shareholderIndex, 1, shareholderDataCopy);
//     console.log(shareholdersData);

//   })
// };

// //
// //
// export const updateDirectorRole = (
//   formData,
//   shareholdersMembersMerged,
//   selectedShareholder
// ) => {
//   // Find the index of the selected shareholder, and splice in director's role
//   let shareholderIndex = shareholdersMembersMerged.findIndex(
//     (e) => e.memberCode === selectedShareholder.memberCode
//   );
//   let shareholderData = shareholdersMembersMerged[shareholderIndex];
//   let shareholderDataCopy = { ...shareholderData };
//   shareholderDataCopy.directorRole = formData.director_role;
//   shareholdersMembersMerged.splice(shareholderIndex, 1, shareholderDataCopy);
//   console.log(shareholdersMembersMerged);
// };
