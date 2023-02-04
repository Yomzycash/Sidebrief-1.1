export const handleShareholderAdd = async () => {
  const requiredData = {
    launchCode: launchCode,
    memberCode: memberInfo.memberCode,
    shareholderOwnershipPercentage: formData.share_percentage,
    shareholderOwnershipType: formData.nin,
  };

  // Send the required payload to the backend
  let response = await addShareHolder(requiredData);

  if (response.data) {
    // Get the information of all added shareholder
    const allShareholders = Object.entries(
      response.data.businessShareholders
    );
    // Get the information of the just added shareholder
    const shareholderInfo = allShareholders[allShareholders.length - 1][1];
    // Merge the member information and the shareholder information of the just added shareholder
    let shareholderAllInfo = { ...memberInfo, ...shareholderInfo };
    return { data: shareholderAllInfo };
  } else {
    return { error: response.error.data.message };
  }
}

export const handleShareholderUpdate = () => {}

export const handleShareholderDelete = () => {}

export const handleShareholdersView = () => {}

export const handleShareholderView = () => {}
