import * as yup from "yup";
import {
  HiHome,
  HiOutlineSparkles,
  HiOutlineLibrary,
  HiDocumentText,
  HiCog,
  HiBriefcase,
} from "react-icons/hi";
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from "asset/images";

import pdf from "../asset/images/pdf.png";
import png from "../asset/images/png.png";
import jpg from "../asset/images/jpg.png";
import doc from "../asset/images/doc.png";
import NigeriaFlag from "../asset/images/NigeriaFlag.png";

import {
  BankAccountIcon,
  BusinessesIcon,
  HomeIcon,
  ResourcesIcon,
  RewardIcon,
  SettingsIcon,
  IntellectualIcon,
  ComplianceIcon,
  TaxesIcon,
  HiringIcon,
  PaymentIcon,
  EntityIcon,
  CountryIcon,
} from "asset/Icons";
import ArrowDownIcon from "../asset/Icons/ArrowDownIcon.svg";
import awaiting from "../asset/staff/Awaiting.svg";
import inProgress from "../asset/staff/InProgress.svg";
import completed from "../asset/staff/Completed.svg";

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

export const directorRoleOptions = [
  { value: "Executive", label: "Executive" },
  { value: "Non executive", label: "Non executive" },
  { value: "Observer", label: "Observer" },
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

export const fileFormSchema = yup.object().shape({
  file1: yup
    .mixed()
    .test("file", "You need to provide a file", (file) => {
      if (file.length > 0) {
        return true;
      }
      return false;
    })
    .test("file", "The file is too large", (file) => {
      return file && file.size > 2000000;
    }),
});

export const checkInfoShareholderSchema = yup.object().shape({
  full_name: yup.string().required("Full name is a required field"),
  phone: yup.string().required("Phone number is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  share_percentage: yup
    .number("Must be a number")
    .min(0.00001)
    .max(100)
    .required("Share percentage is from 1% to 100%"),
  share_type: yup.string().required("Share type is a required field"),
});

export const checkInfoShareDirSchema = yup.object().shape({
  full_name: yup.string().required("Full name is a required field"),
  phone: yup.string().required("Phone number is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  share_percentage: yup
    .number("Must be a number")
    .min(0.00001)
    .max(100)
    .required("Share percentage is from 1% to 100%"),
  share_type: yup.string().required("Share type is a required field"),
  director_role: yup.string().required("Director's role is required"),
});

export const checkInfoDirectorSchema = yup.object().shape({
  full_name: yup.string().required("Full name is a required field"),
  phone: yup.string().required("Phone number is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  director_role: yup.string().required("Director's role is required"),
});

export const checkInfoBeneficiarySchema = yup.object().shape({
  full_name: yup.string().required("Full name is a required field"),
  phone: yup.string().required("Phone number is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  stake: yup
    .number()
    .min(0.00001)
    .max(100)
    .required("Stake percentage is required"),
  occupation: yup.string().required("Occupation is required"),
});

export const StaffCountrySchema = yup.object().shape({
  country_name: yup.string().required("Country name is a required field"),
  country_code: yup.string().required("Country code is a required field"),
  country_iso: yup.string().required("Country ISO is a required field"),
  currency: yup.string().required("Currency is a required field"),
  flag: yup.string().required("Upload a flag image"),
});

export const sidebarLink = [
  {
    id: 1,
    title: "Home",
    icon: HomeIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 2,
    title: "Businesses",
    icon: BusinessesIcon,
    path: "/dashboard/businesses",
  },
  {
    id: 3,
    title: "Bank Accounts",
    icon: BankAccountIcon,
    path: "/dashboard/bank-account",
  },
  {
    id: 4,
    title: "Rewards",
    icon: RewardIcon,
    path: "/dashboard/rewards/all-rewards",
  },
  {
    id: 5,
    title: "Resources",
    icon: ResourcesIcon,
    path: "/dashboard/resources",
  },
  {
    id: 6,
    title: "Settings",
    icon: SettingsIcon,
    path: "/dashboard/settings",
  },
];

export const StaffSidebarLinks = [
  {
    id: 1,
    title: "Home",
    icon: HomeIcon,
    path: "",
  },
  {
    id: 2,
    title: "Businesses",
    icon: BusinessesIcon,
    path: "/dashboard-staff",
    dropDownList: [
      {
        id: 1,
        title: "Registration",
        icon: ResourcesIcon,
        path: "",
      },
      {
        id: 2,
        title: "Entities",
        icon: EntityIcon,
        path: "",
      },
      {
        id: 3,
        title: "Countries",
        icon: CountryIcon,
        path: "",
      },
    ],
  },
  {
    id: 3,
    title: "Taxes",
    icon: TaxesIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 4,
    title: "Hiring & Payroll",
    icon: HiringIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 5,
    title: "Intellectual Assets",
    icon: IntellectualIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 6,
    title: "Rewards",
    icon: RewardIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 7,
    title: "Payments",
    icon: PaymentIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 8,
    title: "Resources",
    icon: ResourcesIcon,
    path: "/dashboard/business-registration",
  },
  {
    id: 9,
    title: "Settings",
    icon: SettingsIcon,
    path: "/dashboard/business-registration",
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
    path: "/dashboard/business-registration",
  },
  {
    id: 2,
    title: "Compliance",
    path: "/dashboard/compliance",
  },
  {
    id: 3,
    title: "Taxes",
    path: "/dashboard/taxes",
  },
  {
    id: 4,
    title: "Hiring & payroll",
    path: "/dashboard/hiring-and-payroll",
  },
  {
    id: 5,
    title: "Intellectual Assets",
    path: "/dashboard/intellectualAssets",
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
  { id: 1, path: "/dashboard/compliance", title: "Compliance" },
  { id: 2, path: "/dashboard/business-registration", title: "Registration" },
  { id: 3, path: "/dashboard/taxes", title: "Taxes" },
  { id: 4, path: "/dashboard/hiring-and-payroll", title: "Hiring" },
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

export const myRewards = [
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
];

export const allRewards = [
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Glade",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: GladeLogo,
  },
  {
    title: "Okra",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: OkraLogo,
  },
  {
    title: "Sterling",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: SterlingLogo,
  },
];
export const ReviewTab = [
  {
    id: 1,
    title: "Business Information",
    path: "/launch/review",
  },
  {
    id: 2,
    title: "Shareholder Information",
    path: "/launch/review-shareholder",
  },
  {
    id: 3,
    title: "Director Information",
    path: "/launch/review-director",
  },
  {
    id: 4,
    title: "Beneficiary Information",
    path: "/launch/review-beneficiary",
  },
];
export const imageTypeImage = [
  {
    id: "1",
    name: "pdf",
    type: "application/pdf",
    image: pdf,
  },
  {
    id: "2",
    name: "doc",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    image: doc,
  },
  {
    id: "3",
    name: "png",
    type: "image/png",
    image: png,
  },
  {
    id: "4",
    name: "jpg",
    type: "image/jpeg",
    image: jpg,
  },
];
export const StaffBusinessNames = [
  {
    id: "1",
    name: "Ayomide Constructions and Husbands",
  },
  {
    id: "2",
    name: "Quick Kitchen",
  },
  {
    id: "3",
    name: "Quick Chef",
  },
  {
    id: "4",
    name: "Quick Kitchen.NG",
  },
];

export const StaffBusinessObjectives = [
  {
    id: "1",
    objective: "Marketing",
  },
  {
    id: "2",
    objective: "Marketing",
  },
  {
    id: "3",
    objective: "Marketing",
  },
  {
    id: "4",
    objective: "Marketing",
  },
];

export const StaffBusinessStatus = [
  {
    id: "1",
    image: awaiting,
    number: "58",
    title: "Businesses",
    status: "Awaiting Approval",
  },
  {
    id: "2",
    image: inProgress,
    number: "58",
    title: "Businesses",
    status: "In Progress",
  },
  {
    id: "3",
    image: completed,
    number: "58",
    title: "Businesses",
    status: "Completed",
  },
];

export const staffSidebarLink = [
  {
    id: 1,
    title: "Home",
    icon: HomeIcon,
    path: "/staff-dashboard ",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 2,
    title: "Businesses",
    icon: BusinessesIcon,
    path: "/staff-dashboard/businesses",
    dropdownIcon: ArrowDownIcon,
    dropdown: [
      {
        id: 1,
        title: "Registrations",
        icon: IntellectualIcon,
        path: "/staff-dashboard/intellectualAssets",
      },
      {
        id: 2,
        title: "Entities",
        icon: IntellectualIcon,
        path: "/staffdashboard/intellectualAssets",
      },
      {
        id: 3,
        title: "Countries",
        icon: IntellectualIcon,
        path: "/staffdashboard/intellectualAssets",
      },
    ],
  },
  {
    id: 3,
    title: "Compliance",
    icon: ComplianceIcon,
    path: "/staffdashboard/Taxes",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 4,
    title: "Taxes",
    icon: TaxesIcon,
    path: "/staffdashboard/Taxes",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 5,
    title: "Hiring & Payroll",
    icon: HiringIcon,
    path: "/staffdashboard/hiring",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 6,
    title: "Intellectual Assets",
    icon: IntellectualIcon,
    path: "/staffdashboard/intellectualAssets",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 7,
    title: "Rewards",
    icon: RewardIcon,
    path: "/staffdashboard/rewards",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 8,
    title: "Payments",
    icon: PaymentIcon,
    path: "/staffdashboard/payments",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 9,
    title: "Resources",
    icon: ResourcesIcon,
    path: "/staffdashboard/resources",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
  {
    id: 10,
    title: "Settings",
    icon: SettingsIcon,
    path: "/staffdashboard/settings",
    dropdownIcon: ArrowDownIcon,
    dropdown: [],
  },
];
export const CountryCardDetails = [
  {
    id: 1,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 2,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 3,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 4,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 5,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },

  {
    id: 7,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 6,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 8,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 9,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 10,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 11,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
  {
    id: 12,
    flag: NigeriaFlag,
    name: "Nigeria",
    countryCode: "NGA",
    numberCode: "+234",
    currency: "Naira",
  },
];

export const EntityCardDetails = [
  {
    id: 1,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 2,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 3,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 4,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 5,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 6,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 7,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 8,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 9,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 10,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 11,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
  {
    id: 12,
    entityName: "Public Limited Company  (P.L.C)",
    shareholderType: "Local and Foreign Shareholders",
    entityTimeline: "30 days",
    entityType: "Public Limited",
    countryCode: "NGA",
    entityPackage: "Standard",
  },
];
