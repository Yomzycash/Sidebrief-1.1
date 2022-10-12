// Add a member
export const memberAdd = async (launchCode, formData, addMember) => {
  const requiredMemberData = {
    launchCode: launchCode,
    businessMember: {
      memberName: formData.full_name,
      memberEmail: formData.email,
      memberPhone: formData.phone,
    },
  };

  let addMemberResponse = await addMember(requiredMemberData);

  if (addMemberResponse.data) {
    // Get the information of all added members
    const allMembers = Object.entries(addMemberResponse.data.businessMembers);
    // Get the information of the just added member
    const memberInfo = allMembers[allMembers.length - 1][1];
    return { data: memberInfo };
  } else if (addMemberResponse.error) {
    return { error: addMemberResponse.error };
  }
};

// Update a member
export const memberUpdate = async (formData, selected, updateMember) => {
  const requiredMemberUpdateData = {
    launchCode: selected.launchCode,
    memberCode: selected.memberCode,
    businessMember: {
      memberName: formData.full_name,
      memberEmail: formData.email,
      memberPhone: formData.phone,
    },
  };

  let membersUpdateResponse = await updateMember(requiredMemberUpdateData);

  // let membersUpdatedData = membersUpdateResponse?.data?.businessMembers;

  if (membersUpdateResponse.data) {
    // Get the information of all added members
    const allMembers = Object.entries(
      membersUpdateResponse.data.businessMembers
    );
    // Get the information of the just added member
    const memberInfo = allMembers[allMembers.length - 1][1];
    return { data: memberInfo };
  } else if (membersUpdateResponse.error) {
    return { error: membersUpdateResponse.error };
  }

  // if (membersUpdatedData) {
  //   return { data: membersUpdatedData };
  // }
};

// Delete a member
export const memberDelete = async (selected, deleteMember) => {
  let requiredMemberDeleteData = {
    launchCode: selected.launchCode,
    memberCode: selected.memberCode,
  };
  let memberDeleteResponse = await deleteMember(requiredMemberDeleteData);

  return memberDeleteResponse;
};
