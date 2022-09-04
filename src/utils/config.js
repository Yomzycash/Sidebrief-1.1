import * as yup from "yup";
import {
  HiHome,
  HiOutlineSparkles,
  HiOutlineLibrary,
  HiDocumentText,
  HiCog,
  HiBriefcase,
} from "react-icons/hi";

export const userRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  phone: yup.string().required("Phone number is a required field"),
  password: yup.string().min(8).max(15).required(),
  gender: yup.string().required(),
  date: yup
    .string()
    .matches(
      "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$", // Date regex
      "Not a valid date" // error message
    )
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Transgender", label: "Transgender" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Other", label: "Other" },
];

export const partnerRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  phone: yup.string().required("Phone number is a required field"),
  password: yup.string().min(8).max(15).required(),
  operational_country: yup.string().required(),
  corporate_name: yup.string().required("Corporate name is a required field"),
});

export const resellerRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  phone: yup.string().required("Phone number is a required field"),
  password: yup.string().min(8).max(15).required(),
  operational_country: yup.string().required(),
  corporate_name: yup.string().required("Corporate name is a required field"),
});

export const sidebarLink = [
  {
    id: 1,
    title: "Home",
    icon: HiHome,
    path: "",
  },
  {
    id: 2,
    title: "Application",
    icon: HiDocumentText,
    path: "",
  },
  {
    id: 3,
    title: "Business",
    icon: HiBriefcase,
    path: "",
  },
  {
    id: 4,
    title: "Bank Accounts",
    icon: HiOutlineLibrary,
    path: "",
  },
  {
    id: 5,
    title: "Rewards",
    icon: HiOutlineSparkles,
    path: "",
  },
  {
    id: 6,
    title: "Resources",
    icon: HiDocumentText,
    path: "",
  },
  {
    id: 7,
    title: "Settings",
    icon: HiCog,
    path: "",
  },
];

export const analyticsData = [
  {
    name: "Tues.",
    uv: 2,
    pv: 2400,
    amt: 1,
  },
  {
    name: "Wed.",
    uv: 3,
    pv: 1398,
    amt: 2,
  },
  {
    name: "Thur.",
    uv: 2,
    pv: 9800,
    amt: 3,
  },
  {
    name: "Fri.",
    uv: 4,
    pv: 3908,
    amt: 5,
  },
  {
    name: "Sat.",
    uv: 3,
    pv: 4800,
    amt: 4,
  },
  {
    name: "Sun.",
    uv: 4,
    pv: 3800,
    amt: 5,
  },
  {
    name: "Mon.",
    uv: 5,
    pv: 4300,
    amt: 7,
  },
];

export const NavbarLink = [
  {
    id: 1,
    title: "Business Registration",
    path: "",
  },
  {
    id: 2,
    title: "Business Compliance",
    path: "",
  },
  {
    id: 3,
    title: "Automate Taxes",
    path: "",
  },
  {
    id: 4,
    title: "Hiring and payroll",
    path: "",
  },
  {
    id: 5,
    title: "Intellectual Assets",
    path: "",
  },
];
