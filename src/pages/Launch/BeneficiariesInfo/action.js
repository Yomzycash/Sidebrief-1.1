// Add a new beneficiary
// info needs to entail: launchCode, formData, addBeneficiary
export const handleBeneficiaryAdd = async (info) => {
  const requiredDirectorData = {
    launchCode: info.launchCode,
    beneficialOwner: {
      beneficialOwnerName: info.formData.fullName,
      beneficialOwnerEmail: info.formData.email,
      beneficialOwnerPhone: info.formData.phone,
      beneficialOwnerOccupation: info.formData.occupation,
      beneficialOwnershipStake: info.formData.stake,
    },
  };

  // Send the required payload to the backend
  const addBeneficiaryResponse = await info.addBeneficiary(
    requiredDirectorData
  );
  if (addBeneficiaryResponse.data) {
    // Get the information of all added beneficiaries
    const allBeneficiaries = Object.entries(
      addBeneficiaryResponse.data.businessBeneficialOwners
    );
    // Get the information of the just added beneficiary
    const beneficiaryInfo = allBeneficiaries[allBeneficiaries.length - 1][1];
    return { data: beneficiaryInfo };
  } else {
    return { error: addBeneficiaryResponse.error };
  }
};

//

// Update a beneficiary information
// info needs to entail: launchCode, formData, selectedBeneficiary, updateBeneficiary
export const handleBeneficiaryUpdate = async (info) => {
  const requiredBeneficiaryUpdateData = {
    launchCode: info.launchCode,
    beneficialOwnerCode: info?.selectedBeneficiary?.beneficialOwnerCode,
    beneficialOwner: {
      beneficialOwnerName: info.formData.fullName,
      beneficialOwnerEmail: info.formData.email,
      beneficialOwnerPhone: info.formData.phone,
      beneficialOwnershipStake: info.formData.stake,
      beneficialOwnerOccupation: info.formData.occupation,
    },
  };
  // Responses from the backend
  let beneficiaryUpdateResponse = await info.updateBeneficiary(
    requiredBeneficiaryUpdateData
  );
  // Get the information of all added beneficiaries
  let beneficiariesUpdatedData =
    beneficiaryUpdateResponse?.data?.businessBeneficialOwners;

  if (beneficiariesUpdatedData) {
    return { data: beneficiariesUpdatedData };
  } else {
    return { error: beneficiaryUpdateResponse.error };
  }
};

//

// Delete a beneficiary information
// info needs to entail: launchCode, selectedBeneficiary, deleteBeneficiary
export const handleBeneficiaryDelete = async (info) => {
  const requiredDeleteData = {
    launchCode: info.launchCode,
    beneficialOwnerCode: info.selectedBeneficiary.beneficialOwnerCode,
  };

  let deleteResponse = await info.deleteBeneficiary(requiredDeleteData);

  if (deleteResponse.data) {
    return { data: deleteResponse.data };
  } else {
    return { error: deleteResponse.error };
  }
};

//

// View all beneficiaries
// info needs to entail: ...launchResponse, and viewBeneficiaries
export const handleBeneficiariesView = async (info) => {
  let requiredData = {
    launchCode: info.launchCode,
    registrationCountry: info.registrationCountry,
    registrationType: info.registrationType,
  };

  // Get data from view endpoints
  let beneficiaries = await info.viewBeneficiaries(requiredData);

  if (beneficiaries.data) {
    let beneficiariesData = [...beneficiaries.data.businessBeneficialOwners];
    return { data: beneficiariesData };
  } else {
    return { error: beneficiaries?.error };
  }
};

//

//

//

//

//

// export const beneficiaryAdd = async (launchCode, formData, addBeneficiary) => {
//   const requiredDirectorData = {
//     launchCode: launchCode,
//     beneficialOwner: {
//       beneficialOwnerName: formData.fullName,
//       beneficialOwnerEmail: formData.email,
//       beneficialOwnerPhone: formData.phone,
//       beneficialOwnerOccupation: formData.occupation,
//       beneficialOwnershipStake: formData.stake,
//     },
//   };

//   // Send the required payload to the backend
//   const addBeneficiaryResponse = await addBeneficiary(requiredDirectorData);
//   if (addBeneficiaryResponse.data) {
//     // Get the information of all added beneficiaries
//     const allBeneficiaries = Object.entries(
//       addBeneficiaryResponse.data.businessBeneficialOwners
//     );
//     // Get the information of the just added beneficiary
//     const beneficiaryInfo = allBeneficiaries[allBeneficiaries.length - 1][1];
//     return { data: beneficiaryInfo };
//   } else {
//     return { error: addBeneficiaryResponse.error };
//   }
// };

// // Update a beneficiary information
// export const beneficiaryUpdate = async (
//   formData,
//   launchCode,
//   selectedBeneficiary,
//   updateBeneficiary
// ) => {
//   const requiredBeneficiaryUpdateData = {
//     launchCode: launchCode,
//     beneficialOwnerCode: selectedBeneficiary.beneficialOwnerCode,
//     beneficialOwner: {
//       beneficialOwnerName: formData.fullName,
//       beneficialOwnerEmail: formData.email,
//       beneficialOwnerPhone: formData.phone,
//       beneficialOwnershipStake: formData.stake,
//       beneficialOwnerOccupation: formData.occupation,
//     },
//   };

//   // Responses from the backend
//   let beneficiaryUpdateResponse = await updateBeneficiary(
//     requiredBeneficiaryUpdateData
//   );
//   // Get the information of all added beneficiaries
//   let beneficiariesUpdatedData =
//     beneficiaryUpdateResponse?.data?.businessBeneficialOwners;

//   if (beneficiariesUpdatedData) {
//     return { data: beneficiariesUpdatedData };
//   } else {
//     return { error: beneficiaryUpdateResponse.error };
//   }
// };

// // Delete a beneficiary information
// export const beneficiaryDelete = async (
//   launchCode,
//   selectedBeneficiary,
//   allBeneficiaries,
//   deleteBeneficiary
// ) => {
//   const requiredDeleteData = {
//     launchCode: launchCode,
//     beneficialOwnerCode: selectedBeneficiary.beneficialOwnerCode,
//   };

//   let deleteResponse = await deleteBeneficiary(requiredDeleteData);

//   if (deleteResponse.data) {
//     // This filters all beneficiaries info
//     let filteredBeneficiaries = allBeneficiaries.filter(
//       (beneficiary) =>
//         beneficiary.beneficialOwnerCode !==
//         requiredDeleteData.beneficialOwnerCode
//     );
//     return { data: filteredBeneficiaries };
//   } else {
//     return { error: deleteResponse.error };
//   }
// };
