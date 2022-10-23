export const convertToLink = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "cloudinary");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgqbdxvnr/image/upload",
    {
      method: "post",
      body: data,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return await res;
};

export const isValidFileUploaded = (file) => {
  const validExtensions = ["jpeg", "jpg", "pdf"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};

export const mergeInfo = (titlesUpdatedData, membersUpdatedData) => {
  let titlesMembersMerged = [];
  titlesUpdatedData.forEach((title) => {
    membersUpdatedData.forEach((member) => {
      if (member.memberCode === title.memberCode) {
        let merged = { ...title, ...member };
        titlesMembersMerged.push(merged);
      }
    });
  });

  return titlesMembersMerged;
};
