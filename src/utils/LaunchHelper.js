// import FileSaver from "file-saver";
import axios from "axios";
import fileDownload from "js-file-download";

export const convertToLink = async (image) => {
	const data = new FormData();
	data.append("file", image);
	data.append(
		"upload_preset",
		`${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
	);

	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
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

export const handleDownloadFile = (cloudinaryLink, fileName) => {
	const result = axios
		.get(cloudinaryLink, {
			responseType: "blob",
		})
		.then((res) => {
			fileDownload(res.data, fileName);
		});

	return result;
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

export const mergeThreeInfo = (
	titlesUpdatedData,
	membersUpdatedData,
	storeDocument
) => {
	let titlesMembersMerged = [];
	titlesUpdatedData.forEach((title) => {
		membersUpdatedData.forEach((member) => {
			storeDocument.forEach((store) => {
				if ((member.memberCode === title.memberCode) === store.code) {
					let merged = { ...title, ...member, ...store };
					titlesMembersMerged.push(merged);
				}
			});
		});
	});

	return titlesMembersMerged;
};
