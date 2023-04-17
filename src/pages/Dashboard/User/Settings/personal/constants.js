import * as yup from "yup";

const userInfo = localStorage.getItem("userInfo");
const userEmail = localStorage.getItem("userEmail");
let parsedUser = JSON.parse(userInfo);
let firstName = parsedUser?.first_name;
let lastName = parsedUser?.last_name;

export const data = [
  {
    name: "first_name",
    label: "First Name",
    value: firstName,
  },
  {
    name: "last_name",
    label: "Last Name",
    value: lastName,
  },
  {
    name: "email_address",
    label: "Email Address",
    value: userEmail,
  },
  {
    name: "phone",
    label: "Phone Number",
    value: "+234123456789",
  },
];

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const updateDataSchema = yup.object().shape({
  profile_image: yup
    .mixed()
    // .test(
    // 	"fileSize",
    // 	"File is too large",
    // 	(value) => value.size <= FILE_SIZE
    // )
    .test("fileType", "file format not supported", (value) => {
      return SUPPORTED_FORMATS.includes(value[0]?.type) || value.length === 0;
    })
    .notRequired(),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
});
