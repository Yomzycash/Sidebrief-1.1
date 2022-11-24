// Add a new beneficiary
export const beneficiaryAdd = async (launchCode, formData, addBeneficiary) => {
  const requiredDirectorData = {
    launchCode: launchCode,
    beneficialOwner: {
      beneficialOwnerName: formData.full_name,
      beneficialOwnerEmail: formData.email,
      beneficialOwnerPhone: formData.phone,
      beneficialOwnerOccupation: formData.occupation,
      beneficialOwnershipStake: formData.stake,
    },
  };

  // Send the required payload to the backend
  const addBeneficiaryResponse = await addBeneficiary(requiredDirectorData);
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

// Update a beneficiary information
export const beneficiaryUpdate = async (
  formData,
  launchCode,
  selectedBeneficiary,
  updateBeneficiary
) => {
  const requiredBeneficiaryUpdateData = {
    launchCode: launchCode,
    beneficialOwnerCode: selectedBeneficiary.beneficialOwnerCode,
    beneficialOwner: {
      beneficialOwnerName: formData.full_name,
      beneficialOwnerEmail: formData.email,
      beneficialOwnerPhone: formData.phone,
      beneficialOwnershipStake: formData.stake,
      beneficialOwnerOccupation: formData.occupation,
    },
  };

  // Responses from the backend
  let beneficiaryUpdateResponse = await updateBeneficiary(
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

// Delete a beneficiary information
export const beneficiaryDelete = async (
  launchCode,
  selectedBeneficiary,
  allBeneficiaries,
  deleteBeneficiary
) => {
  const requiredDeleteData = {
    launchCode: launchCode,
    beneficialOwnerCode: selectedBeneficiary.beneficialOwnerCode,
  };

  let deleteResponse = await deleteBeneficiary(requiredDeleteData);
  // console.log(deleteResponse);

  if (deleteResponse.data) {
    // This filters all beneficiaries info
    let filteredBeneficiaries = allBeneficiaries.filter(
      (beneficiary) =>
        beneficiary.beneficialOwnerCode !==
        requiredDeleteData.beneficialOwnerCode
    );
    return { data: filteredBeneficiaries };
  } else {
    return { error: deleteResponse.error };
  }
};
