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
  { value: "Preference Shares", label: "Preference Shares" },
  { value: "Common Shares", label: "Common Shares" },
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
  share_percentage: yup
    .number()
    .min(0.00001)
    .max(100)
    .required("Share percentage is from 1% to 100%"),
  share_type: yup.string().required("Share type is a required field"),
});

export const sidebarLink = [
  {
    id: 1,
    title: "Home",
    icon: HiHome,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Application",
    icon: HiDocumentText,
    path: "/dashboard",
  },
  {
    id: 3,
    title: "Business",
    icon: HiBriefcase,
    path: "/dashboard",
  },
  {
    id: 4,
    title: "Bank Accounts",
    icon: HiOutlineLibrary,
    path: "/dashboard",
  },
  {
    id: 5,
    title: "Rewards",
    icon: HiOutlineSparkles,
    path: "/rewards/all-rewards",
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
    path: "/dashboard",
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

export const Messages = [
  {
    id: 1,
    message:
      "Your business, Ayomide Construction & Sons has been registered successfully.",
    time: "2hrs ago",
  },

  {
    id: 2,
    message:
      "Your application for  Ayomide Construction & Sons has been approved and is receiving attention.",
    time: "2hrs ago",
  },

  {
    id: 3,
    message:
      "Hi there! You have an incomplete business registration. Continue now.",
    time: "2hrs ago",
  },
];

export const BusinessObjectives = [
  "Crop and animal production, hunting and related service activities",
  "Forestry and logging",
  "Fishing and aquaculture",
  "Mining of coal and lignite",
  "Extraction of crude petroleum and natural gas",
  "Mining of metal ores",
  "Other mining and quarrying",
  "Mining support service activities",
  "Manufacture of food products",
  "Manufacture of beverages",
  "Manufacture of tobacco products",
  "Manufacture of textiles",
  "Manufacture of wearing apparel",
  "Manufacture of leather and related products",
  "Manufacture of wood and of products of wood and cork, except furniture",
  "Manufacture of articles of straw and plaiting materials",
  "Manufacture of paper and paper products",
  "Printing and reproduction of recorded media",
  "Manufacture of coke and refined petroleum products",
  "Manufacture of chemicals and chemical products",
  "Manufacture of pharmaceuticals, medicinal chemical and botanical products",
  "Manufacture of rubber and plastics products",
  "Manufacture of other non-metallic mineral products",
  "Manufacture of basic metals",
  "Manufacture of fabricated metal products, except machinery and equipment",
  "Manufacture of electrical equipment",
  "Manufacture of electrical equipment",
  "Manufacture of machinery and equipment n.e.c.",
  "Manufacture of motor vehicles, trailers and semi-trailers",
  "Manufacture of other transport equipment",
  "Manufacture of furniture",
  "Other manufacturing",
  "Repair and installation of machinery and equipment",
  "Electricity, gas, steam and air conditioning supply",
  "Water collection, treatment and supply",
  "Sewerage",
  "Waste collection, treatment and disposal activities; materials recovery",
  "Remediation activities and other waste management services",
  "Construction of buildings",
  "Civil engineering",
  "Specialized construction activities",
  "Wholesale and retail trade and repair of motor vehicles and motorcycles",
  "Wholesale trade, except of motor vehicles and motorcycles",
  "Retail trade, except of motor vehicles and motorcycles",
  "Land transport and transport via pipelines",
  "Water transport",
  "Air transport",
  "Warehousing and support activities for transportation",
  "Postal and courier activities",
  "Accommodation",
  "Food and beverage service activities",
  "Publishing activities",
  "Motion picture, video and television programme production, sound recording and music publishing activities",
  "Programming and broadcasting activities",
  "Telecommunications",
  "Computer programming, consultancy and related activities",
  "Information service activities",
  "Financial service activities, except insurance and pension funding",
  "Insurance, reinsurance and pension funding, except compulsory social security",
  "Activities auxiliary to financial service and insurance activities",
  "Real estate activities",
  "Legal and accounting activities",
  "Activities of head offices; management consultancy activities",
  "Architectural and engineering activities; technical testing and analysis",
  "Scientific research and development",
  "Advertising and market research",
  "Other professional, scientific and technical activities",
  "Veterinary activities",
  "Rental and leasing activities",
  "Employment activities",
  "Travel agency, tour operator, reservation service and related activities",
  "Security and investigation activities",
  "Services to buildings and landscape activities",
  "Office administrative, office support and other business support activities",
  "Public administration and defence; compulsory social security",
  "Human health activities",
  "Residential care activities",
  "Social work activities without accommodation",
  "Creative, arts and entertainment activities",
  "Libraries, archives, museums and other cultural activities",
  "Gambling and betting activities",
  "Sports activities and amusement and recreation activities",
  "Activities of membership organizations",
  "Repair of computers and personal and household goods",
  "Other personal service activities",
  "Activities of households as employers of domestic personnel",
  "Undifferentiated goods- and services-producing activities of private households for own use",
  "Activities of extraterritorial organizations and bodies",
];
