
// Add a member
export const handleMemberAdd = async () => {
    const requiredData = {
        launchCode: launchCode,
        businessMember: {
          memberName: formData.full_name,
          memberEmail: formData.email,
          memberPhone: formData.phone,
        },
      };

      let response = await addMember(requiredData);

      if (response.data) {
        // Get the information of all added members
        const allMembers = Object.entries(response.data.businessMembers);
        // Get the information of the just added member
        const memberInfo = allMembers[allMembers.length - 1][1];
        return { data: memberInfo };
      } else if (response.error) {
        return { error: response.error };
      }

}

// Update a member
export const handleMemberUpdate = async () => {
    const requiredData = {
        launchCode: selected.launchCode,
        memberCode: selected.memberCode,
        businessMember: {
          memberName: formData.full_name,
          memberEmail: formData.email,
          memberPhone: formData.phone,
        },
      };
    
      let response = await updateMember(requiredData);
    
      if (response.data) {
        // Get the information of all added members
        const allMembers = Object.entries(
          response.data.businessMembers
        );
        // Get the information of the just added member
        const memberInfo = allMembers[allMembers.length - 1][1];
        return { data: memberInfo };
      } else if (response.error) {
        return { error: response.error };
      }
}

// Delete a member
export const handleMemberDelete = async () => {
    let requiredData = {
        launchCode: selected.launchCode,
        memberCode: selected.memberCode,
      };
      let response = await deleteMember(requiredData);
    
      return response;
}

// View all members
export const handleMembersView = async () => {
    let response = await viewMember(launchResponse);

    if(response.data) {
        let membersInfo = [...response.data.businessMembers];
        return membersInfo;
    } else if(response.error) {
        return {error: response.error}
    }
} 

// View a single member
export const handleMemberView = async () => {
    let members = await handleMemberView()
}