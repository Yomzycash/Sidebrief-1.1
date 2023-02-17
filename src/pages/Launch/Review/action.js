export const handleCheckDocument = (requiredDocuments, uploadDocuments) => {
  requiredDocuments?.forEach((document) => {
    uploadDocuments?.forEach((data) => {
      if (data.documentType === document) {
        return data;
      }
    });
  });
  return;
};

export const handleMemberCodeMerge = (
  shareholdersUpdatedData,
  membersUpdatedData,
  uploadDocuments
) => {
  let shareholdersMembersMerged = [];
  shareholdersUpdatedData.forEach((shareholder) => {
    membersUpdatedData.forEach((member) => {
      uploadDocuments.forEach((document) => {
        if (
          member.memberCode === shareholder.memberCode &&
          shareholder.memberCode === document.memberCode
        ) {
          let merged = { ...shareholder, ...member, ...document };
          shareholdersMembersMerged.push(merged);
        }
      });
    });
  });
  return shareholdersMembersMerged;
};

export const handleMembersCodeMerge = (
  shareholdersUpdatedData,
  membersUpdatedData
) => {
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
