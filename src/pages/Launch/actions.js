// Add a member
// info needs to entail: launchCode, formData,r and addMember
export const handleMemberAdd = async ({ info }) => {
  const requiredData = {
    launchCode: info.launchCode,
    businessMember: {
      memberName: info.formData.full_name,
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
      memberName: info.formData.full_name,
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
    return membersInfo;
  } else if (response.error) {
    return { error: response.error };
  }
};

// View a single member
export const handleMemberView = async () => {
  let members = await handleMembersView();
};
