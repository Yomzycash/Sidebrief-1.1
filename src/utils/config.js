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

export const shareTypeOptions = [
  { value: "Preference Shares" , label: "Preference Shares" },
  { value: "Common Shares", label: "Common Shares" }
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
export const checkInfoSchema = yup.object().shape({
  full_name: yup.string().required("Full name is a required field"),
  phone: yup.string().required("Phone number is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  share_percentage: yup.string().required("Share percentage is from 1% to 100%"),
  share_type: yup.string().required("Share type is a required field")

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
    title: "Registration",
    path: "",
  },
  {
    id: 2,
    title: "Compliance",
    path: "",
  },
  {
    id: 3,
    title: "Taxes",
    path: "",
  },
  {
    id: 4,
    title: "Hiring & payroll",
    path: "",
  },
  {
    id: 5,
    title: "Intellectual Assets",
    path: "",
  },
];

export const CardContainer = [
  {
    id: 1,
    title: " Total Applications",
    number: "12",
    description: "20% this month",
  },

  {
    id: 2,
    title: " Completed",
    number: "12",
    description: "20% this month",
  },

  {
    id: 3,
    title: " In Progress",
    number: "12",
    description: "20% this month",
  },

  {
    id: 4,
    title: " Awaiting Approval",
    number: "12",
    description: "20% this month",
  },

  {
    id: 5,
    title: " Declined",
    number: "12",
    description: "20% this month",
  },
];

export const NavMore = [
  { id: 1, path: "", title: "Compliance" },
  { id: 2, path: "", title: "Registration" },
  { id: 3, path: "", title: "Taxes" },
  { id: 4, path: "", title: "Hiring" },
  { id: 5, path: "", title: "Payroll" },
];

export const Entities = [
  {
    name: "Limited Liability Company",
    shortname: "L.L.C",
    price: "15,000",
    company: "Private Company",
    timeline: { from: 20, to: 30 },
    shareholder: "Local Shareholders Only",
    shares: 10000,
    type: "Standard",
  },
  {
    name: "Public Liability Company",
    price: "22,000",
    company: "Private Company",
    timeline: { from: 20, to: 30 },
    shareholder: "Local Shareholders Only",
    shares: 10000,
    type: "Standard",
  },
  {
    name: "C-Corporation",
    price: "35,000",
    company: "Private Company",
    timeline: { from: 20, to: 30 },
    shareholder: "Local Shareholders Only",
    shares: 10000,
    type: "Standard",
  },
  {
    name: "Business Name",
    price: "15,000",
    company: "International Company",
    timeline: { from: 20, to: 30 },
    shareholder: "Federal Shareholders Only",
    shares: 10000,
    type: "Standard",
  },
  {
    name: "Non Governmental Organisation",
    price: "25,000",
    company: "Public Company",
    timeline: { from: 20, to: 30 },
    shareholder: "Local Shareholders Only",
    shares: 10000,
    type: "Standard",
  },
  {
    name: "Non Governmental Organisation",
    price: "40,000",
    company: "Private Company",
    timeline: { from: 20, to: 30 },
    shareholder: "Private Shareholders Only",
    shares: 10000,
    type: "Standard",
  },
];
