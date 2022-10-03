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
  );
  return await res;
};
