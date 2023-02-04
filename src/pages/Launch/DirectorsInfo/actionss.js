import { handleMembersView } from "../actions";

// This adds the person as a member and a director
// info needs to entail: launchCode, formData, memberInfo, addDirector and addMember
export const handleDirectorAdd = async (info) => {
  const requiredDirectorData = {
    launchCode: info.launchCode,
    memberCode: info.memberInfo.memberCode,
    directorRole: info.formData.dirRole,
    directorIdentificationNumber: info.formData.nin,
    directorRegistrationNumber: info.formData.regNo,
  };
  // Send the required payload to the backend
  let addDirectorResponse = await info.addDirector(requiredDirectorData);

  if (addDirectorResponse.data) {
    // Get the information of all added directors
    const allDirectors = Object.entries(
      addDirectorResponse.data.businessDirectors
    );
    // Get the information of the just added director
    const directorInfo = allDirectors[allDirectors.length - 1][1];
    // Merge the member information and the director information of the just added director
    let directorAllInfo = { ...info.memberInfo, ...directorInfo };
    return { data: directorAllInfo };
  } else {
    return { error: addDirectorResponse.error };
  }
};

//

//

// This updates the person's director info and member info
// info needs to entail: launchCode, formData, directorCode, memberCode, and, updateDirector
export const handleDirectorUpdate = async (info) => {
  const requiredDirectorUpdateData = {
    launchCode: info.launchCode,
    memberCode: info.memberCode,
    directorRole: info.formData.dirRole,
    directorCode: info.directorCode,
    directorIdentificationNumber: info.formData.nin,
    directorRegistrationNumber: info.formData.regNo,
  };

  // TODO
  // let updateMemberResponse = await handleMemberUpdate();

  // Responses from the backend
  let directorsUpdateResponse = await info.updateDirector(
    requiredDirectorUpdateData
  );
  // The data from the response got from the backend
  let directorsUpdatedData = directorsUpdateResponse?.data?.businessDirectors;
  let error = directorsUpdateResponse?.error;

  if (directorsUpdatedData) {
    return { data: directorsUpdatedData };
  } else if (error) {
    return { error: error };
  }
};

//

//

// This deletes only the director's info
// info needs to entail: launchCode, directorCode, memberCode, directorRole, and deleteDirector
export const handleDirectorDelete = async (info) => {
  const requiredData = {
    launchCode: info.launchCode,
    directorCode: info.directorCode,
    memberCode: info.memberCode,
    directorRole: info.directorRole,
  };

  // The delete response gotten from the backend
  let deleteResponse = await info.deleteDirector(requiredData);

  // This fires off, if delete response is success
  if (deleteResponse.data) {
    return { data: deleteResponse.data };
  } else {
    if (deleteResponse.error) {
      return { error: deleteResponse.error };
    }
  }
};

//

//

// This returns all directors info
// info needs to entail: ...launchResponse, viewDirectors and viewMembers
export const handleDirectorsView = async (info) => {
  let requiredData = {
    launchCode: info.launchCode,
    registrationCountry: info.registrationCountry,
    registrationType: info.registrationType,
  };

  let directors = await info.viewDirectors(requiredData);

  if (directors.data) {
    let directorsData = [...directors.data.businessDirectors];
    let membersData = await handleMembersView(info);
    let mergedInfo = mergeInfo(directorsData, membersData);
    return { data: mergedInfo };
  } else if (directors.error) {
    return { error: directors.error };
  }
};

//

//

// This returns a single director's info
export const handleDirectorView = async (directorCode) => {
  let directors = await handleDirectorsView();

  if (directors.data) {
    let director = directors?.data?.filter(
      (el) => el.directorCode === directorCode
    );
    if (director) {
      // TODO
      return { data: director };
    } else {
      return { error: director };
    }
  } else if (directors.error) {
    return { error: directors.error };
  }
};

//

//

// Merge a director's member information to his director information
const mergeInfo = (directorsUpdatedData, membersUpdatedData) => {
  let directorsMembersMerged = [];
  directorsUpdatedData.forEach((director) => {
    membersUpdatedData.forEach((member) => {
      if (member.memberCode === director.memberCode) {
        let merged = { ...director, ...member };
        directorsMembersMerged.push(merged);
      }
    });
  });

  return directorsMembersMerged;
};
