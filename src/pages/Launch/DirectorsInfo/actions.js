//

import { memberDelete } from "containers/Checkout/InfoSection/actions";
import {
  useViewDirectorsMutation,
  useViewShareholdersMutation,
} from "services/launchService";

// Add a new director
export const directorAdd = async (
  launchCode,
  formData,
  memberInfo,
  addDirector
) => {
  const requiredDirectorData = {
    launchCode: launchCode,
    memberCode: memberInfo.memberCode,
    directorRole: formData.reg_number,
  };

  // Send the required payload to the backend
  let addDirectorResponse = await addDirector(requiredDirectorData);

  if (addDirectorResponse.data) {
    // Get the information of all added directors
    const allDirectors = Object.entries(
      addDirectorResponse.data.businessDirectors
    );
    // Get the information of the just added director
    const directorInfo = allDirectors[allDirectors.length - 1][1];
    // Merge the member information and the director information of the just added director
    let directorAllInfo = { ...memberInfo, ...directorInfo };
    return { data: directorAllInfo };
  } else {
    return { error: addDirectorResponse.error };
  }
};

//
// Update a Director
export const directorUpdate = async (
  formData,
  selectedDirector,
  updateDirector
) => {
  const requiredDirectorUpdateData = {
    launchCode: selectedDirector.launchCode,
    memberCode: selectedDirector.memberCode,
    directorRole: formData.reg_number,
    directorCode: selectedDirector.directorCode,
  };
  // Responses from the backend
  let directorsUpdateResponse = await updateDirector(
    requiredDirectorUpdateData
  );
  // The data from the response got from the backend
  let directorsUpdatedData = directorsUpdateResponse?.data?.businessDirectors;
  let error = directorsUpdateResponse.error;

  if (directorsUpdatedData) {
    return { data: directorsUpdatedData };
  } else if (error) {
    return { error: error };
  }
};

//
// Delete a director

//
// Delete a shareholder
export const directorDelete = async (
  // LaunchInfo,
  director,
  // viewShareholders,
  deleteDirector
  // deleteMember
) => {
  // const { shareHoldersLaunchInfo, directorsLaunchInfo } = LaunchInfo;

  const requiredData = {
    launchCode: director.launchCode,
    directorCode: director.directorCode,
    memberCode: director.memberCode,
    directorRole: director.directorRole,
  };

  // The delete response gotten from the backend
  let deleteResponse = await deleteDirector(requiredData);

  // This fires off, if delete response is success
  if (deleteResponse.data) {
    // Get data from view endpoints
    // let shareholders = await viewShareholders(requiredData);
    // let shareholdersData = [...shareholders.data.businessShareholders];
    // let directors = await viewDirectors(requiredData);
    // let directorsData = [...directors.data.businessDirectors];
    // This filters and set the filtered shareholders info to the store
    // let filteredDirectors = directorsData.filter(
    //   (director) => director.directorCode !== requiredData.directorCode
    // );
    // This checks if the deleted shareholder is a director
    // let memberCheck = shareholdersData.filter(
    //   (shareholder) => shareholder?.memberCode === requiredData?.memberCode
    // );
    // // if memberCheck length is 0 (i.e the director is not a shareholder), membership is deleted.
    // if (memberCheck.length === 0) {
    //   let memberDeleteResponse = await memberDelete(director, deleteMember);
    //   console.log(memberDeleteResponse);
    // }
    // return { data: filteredDirectors };
  } else {
    if (deleteResponse.error) {
      return { error: deleteResponse.error };
    }
  }
};

//
// Merge a shareholder's member information to his shareholder information
export const mergeInfo = (directorsUpdatedData, membersUpdatedData) => {
  let directorsMembersMerged = [];
  directorsUpdatedData.forEach((shareholder) => {
    membersUpdatedData.forEach((member) => {
      if (member.memberCode === shareholder.memberCode) {
        let merged = { ...shareholder, ...member };
        directorsMembersMerged.push(merged);
      }
    });
  });

  return directorsMembersMerged;
};
