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

export const userRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  phone: yup.string().required("Phone number is a required field"),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Password is a required field")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")

    .matches(/^(?=.*[0-9])/, "  Must Contain One Number")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  // password: yup.
  // 	string()
  // 	.required("Password is a required field")
  // 	.matches(
  // 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,17})/,
  // 	"Must contain alphanumeric symbols"
  // ),
  // password: yup.string().min(7).max(10).required("Password is a required field"),

  // gender: yup.string().required(),
  // date: yup
  //   .string()
  //   .matches(
  //     "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$", // Date regex
  //     "Not a valid date" // error message
  //   )
  //   .required(),
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
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Password is a required field")
    .matches(/^(?=.*[A-Z])/, "Must contain an uppercase character")
    .matches(/^(?=.*[a-z])/, " Must contain a lowercase character")

    .matches(/^(?=.*[0-9])/, "  Must contain a number")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "  Must contain a special case character"),
  operational_country: yup.string().required(),
  corporate_name: yup.string().required("Corporate name is a required field"),
});

export const resellerRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  phone: yup.string().required("Phone number is a required field"),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Password is a required field")
    .matches(/^(?=.*[A-Z])/, " Must contain an uppercase character")
    .matches(/^(?=.*[a-z])/, " Must contain a lowercase character")

    .matches(/^(?=.*[0-9])/, "  Must contain a number")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "  Must contain a special case character"),
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
  // share_type: yup.string().required("Share type is a required field"),
  nin: yup
    .number()
    .test(
      "len",
      "NIN must be exactly 10 numbers",
      (val) => val.toString().length === 10
    )
    .required("NIN is a required field"),
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
  // share_type: yup.string().required("Share type is a required field"),
  reg_number: yup.number().required("Registration number is required"),
  // director_role: yup.string().required("Director's role is required"),

  nin: yup
    .number()
    .test(
      "len",
      "NIN must be exactly 10 numbers",
      (val) => val.toString().length === 10
    )
    .required("NIN is a required field"),
});

export const checkInfoDirectorSchema = yup.object().shape({
  full_name: yup.string().required("Full name is a required field"),
  phone: yup.string().required("Phone number is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  reg_number: yup.number().required("Registration number is required"),
  // director_role: yup.string().required("Director's role is required"),
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
  flag: yup.string().required("Country flag is a requlired field "),
});

export const StaffEntitySchema = yup.object().shape({
  entity_name: yup.string().required("Entity name is a required field"),
  description: yup.string().required("Entity description is a required field"),
  short_name: yup.string().required("Entity short name is a required field"),
  type: yup.string().required("Entity type is a required field"),
  code: yup.string().required("Entity code is a required field"),
  requirements: yup.string().required("Entity requirement is a required field"),
  country: yup.string().required("Entity country is a required field"),
  currency: yup.string().required("Entity currency is a required field"),
  fee: yup.string().required("Entity fee is a required field"),
  timeline: yup.string().required("Entity timeline is a required field"),
  shares: yup
    .number("Value must be a number")
    .required("Entity shares is a required field"),
});

export const StaffRewardSchema = yup.object().shape({
  reward_name: yup.string().required("Reward name is a required field"),
  partner: yup.string().required("Partner name is a required field"),
  description: yup.string().required("Description is a required field"),
  category: yup.string().required("Category is a required field"),
  code: yup.string().required("Code is a required field"),
  link: yup.string().required("Enter link to reward"),
  image: yup.string().required("Enter link to reward image"),
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
    path: "/staff-dashboard/home",
  },
  {
    id: 2,
    title: "Businesses",
    icon: BusinessesIcon,
    path: "/staff-dashboard/businesses",
    dropDownList: [
      {
        id: 1,
        title: "Registrations",
        icon: ResourcesIcon,
        path: "/staff-dashboard/businesses/registration",
      },
      {
        id: 2,
        title: "Entities",
        icon: EntityIcon,
        path: "/staff-dashboard/businesses/entities",
      },
      {
        id: 3,
        title: "Countries",
        icon: CountryIcon,
        path: "/staff-dashboard/businesses/countries",
      },
    ],
  },
  {
    id: 3,
    title: "Taxes",
    icon: TaxesIcon,
    path: "/staff-dashboard/taxes",
  },
  {
    id: 4,
    title: "Hiring & Payroll",
    icon: HiringIcon,
    path: "/staff-dashboard/hiring-and-payroll",
  },
  {
    id: 5,
    title: "Intellectual Assets",
    icon: IntellectualIcon,
    path: "/staff-dashboard/assets",
  },
  {
    id: 6,
    title: "Rewards",
    icon: RewardIcon,
    path: "/staff-dashboard/all-rewards",
  },
  {
    id: 7,
    title: "Payments",
    icon: PaymentIcon,
    path: "/staff-dashboard/payments",
  },
  {
    id: 8,
    title: "Resources",
    icon: ResourcesIcon,
    path: "/staff-dashboard/resources",
  },
  {
    id: 9,
    title: "Settings",
    icon: SettingsIcon,
    path: "/staff-dashboard/settings/general",
  },
];

export const analyticsData = [
  {
    name: "Tues.",
    uv: 2,
  },
  {
    name: "Wed.",
    uv: 3,
  },
  {
    name: "Thur.",
    uv: 2,
  },
  {
    name: "Fri.",
    uv: 4,
  },
  {
    name: "Sat.",
    uv: 3,
  },
  {
    name: "Sun.",
    uv: 4,
  },
  {
    name: "Mon.",
    uv: 5,
  },
];

export const staffAnalyticsData = [
  {
    name: "Tues.",
    views: 2,
    clicks: 2.4,
    claims: 6,
  },
  {
    name: "Wed.",
    views: 3,
    clicks: 1,
    claims: 5,
  },
  {
    name: "Thur.",
    views: 2,
    clicks: 6.7,
    claims: 3,
  },
  {
    name: "Fri.",
    views: 7,
    clicks: 3,
    claims: 5.5,
  },
  {
    name: "Sat.",
    views: 3,
    clicks: 4,
    claims: 4,
  },
  {
    name: "Sun.",
    views: 1.5,
    clicks: 3.8,
    claims: 6,
  },
  {
    name: "Mon.",
    views: 5,
    clicks: 4,
    claims: 3,
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

export const StaffStatusCardInfo = [
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

export const resources = [
  {
    id: 1,
    country: "Nigeria",
    resource: "Change of Directors (removal and/or addition) - Nigeria",
  },
  {
    id: 2,
    country: "Nigeria",
    resource: "Change of Shareholders (removal and/or addition) - Nigeria",
  },
  {
    id: 3,
    country: "South Africa",
    resource: "Change of Directors (removal and/or addition) - South Africa",
  },
  {
    id: 4,
    country: "Nigeria",
    resource: "Change of Registered Address",
  },
  {
    id: 5,
    country: "Nigeria",
    resource: "Increase of Share Capital",
  },
  {
    id: 6,
    country: "Nigeria",
    resource: "Reduction of Sahre Capital",
  },

  {
    id: 7,
    country: "Nigeria",
    resource: "Change of Registered Address",
  },
  {
    id: 8,
    country: "Nigeria",
    resource: "Change of Details of Directors and Shareholders",
  },
  {
    id: 9,
    country: "Nigeria",
    resource: "Change of Persons with Significant Control",
  },
  {
    id: 10,
    country: "Nigeria",
    resource: "Alteration of MEMART",
  },
  {
    id: 11,
    country: "Nigeria",
    resource: "Change of Company Secretary",
  },
  {
    id: 12,
    country: "Nigeria",
    resource: "Obtaining Letter of Good Standing",
  },
  {
    id: 13,
    country: "Delaware",
    resource: "Obtaining Letter of Good Standing",
  },
  {
    id: 14,
    country: "Nigeria",
    resource: "Conversion of Business Name to Limited Liability Company",
  },
  {
    id: 15,
    country: "Kenya",
    resource: "Change of Business Name",
  },
  {
    id: 16,
    country: "Delaware",
    resource: "Change of Business Name",
  },
  {
    id: 17,
    country: "Nigeria",
    resource: "Change of Business Name",
  },
  {
    id: 18,
    country: "South Africa",
    resource: "Change of Business Name",
  },
  {
    id: 19,
    country: "Nigeria",
    resource: "Obtain CTC of Company Documents",
  },
  {
    id: 20,
    country: "Kenya",
    resource: "Obtain CTC of Company Documents",
  },
  {
    id: 21,
    country: "South Africa",
    resource: "Obtain CTC of Company Documents",
  },
  {
    id: 22,
    country: "Nigeria",
    resource: "Members Voluntary Winding up",
  },
  {
    id: 23,
    country: "Nigeria",
    resource: "Change of details of Persons with Significant Control",
  },
  {
    id: 24,
    country: "Nigeria",
    resource: "Company Search (Due Diligence)",
  },
  {
    id: 25,
    country: "Nigeria",
    resource: "Change of Business Objectives",
  },

  {
    id: 26,
    country: "Delaware",
    resource: "Obtain CTC of Corporate documents",
  },
  {
    id: 27,
    country: "Delaware",
    resource: "Change of Company Name",
  },
  {
    id: 28,
    country: "Delaware",
    resource: "Stock Amendment (Reduction)",
  },
  {
    id: 29,
    country: "Delaware",
    resource: "Stock Amendment (Increase)",
  },

  {
    id: 30,
    country: "Delaware",
    resource: "Convert LLC to Corporation",
  },
  {
    id: 31,
    country: "Delaware",
    resource: "Change of Registered Agent",
  },
  {
    id: 32,
    country: "Delaware",
    resource: "Convert Delaware LLC to C-Corp",
  },
  {
    id: 33,
    country: "South Africa",
    resource: "Change of Company Name - South Africa",
  },
  {
    id: 34,
    country: "South Africa",
    resource: "Obtain Share Certificate - South Africa",
  },
  {
    id: 35,
    country: "South Africa",
    resource: "Change of registered address - South Africa",
  },
  {
    id: 36,
    country: "South Africa",
    resource: "Increase/Authorised shares - South Africa",
  },
  {
    id: 37,
    country: "South Africa",
    resource: "Change of year end - South Africa",
  },
  {
    id: 38,
    country: "South Africa",
    resource: "Change of Auditors - South Africa",
  },
  {
    id: 39,
    country: "South Africa",
    resource: "Deregistration of Company - South Africa",
  },
  {
    id: 40,
    country: "South Africa",
    resource: "B-BBEE Certificate - South Africa",
  },
  {
    id: 41,
    country: "South Africa",
    resource: "B-BBEE Sworn Affidavit - South Africa",
  },
  {
    id: 42,
    country: "Kenya",
    resource: "Striking off proceedings - Kenya",
  },
];

export const BusinessObjectives = [
  "Accommodation, hotels and hospitality",
 "Accounting and tax advisory services",
  "Advertising and market research",
  "Agriculture Activities",
 "Architectural and engineering activities",
  "Artiste management and record label servicesBoutique and sale of clothes",
  "Bakery and other pastry activities",
  "Barbing and hair dressing saloon",
  "Bed and Beddings and other household items",
  "Body cream and other cosmetology activities",
  "Building construction and masonry",
 "Domestic personnel agencies",
 "Climate and climate action activities",
  "Climate technology activities",
  "Civil engineering and other related engineering activities",
  "Chemical and Chemical and chemical products",
  "Consultancy, advisory and management services",
  "Creative art and entertainment activities",
  "Crop and and animal production, hunting and related services activities",
  "Education, teaching and other personal learning activities",
  "Electricity, gas, steam and air conditioning supply",
  "Event planner and related services activities",
  "Fashion designing and garment making",
  "Financial technology services and products",
  "Fitness, gym and other related activities",
  "Furniture and fittings making",
  "Fishing, aquaculture and other marine activities",
  "Food and catering services",
  "Forestry and logging activities",
  "Hair, wigs and related product activities",
 "Hotels and Hospitality services",
  "Human health activities",
  "Human resource, personnel management and employment activities",
  "Information Communication Technology",
  "Interior decoration and related activities",
  "Land transportation, taxi services and other commercial transport activities",
 "Legal and advisory services",
 "Libraries, archives, museums and other cultural activities",
  "Luxury goods and upscale items",
  "Makeup, cosmetics, spa and other beauty products",
  "Manufacturing of products",
  "Manufacture of food products",
  "Manufacture of wood and of products of wood and cork, except furniture",
  "Manufacture of basic metals",
  "Manufacture of chemicals and chemical products",
 "Manufacture of furniture",
  "Manufacture of fabric and textiles",
  "Manufacture of machinery and equipment",
  "Manufacture of rubber and plastics products",
  "Manufacture of tobacco products",
  "Manufacture of pharmaceuticals, medicinal chemical and botanical products Manufacture of building materials",
  "Marketing",
  "Motion picture, video and television program production, sound recording and music production services",
  "Office administration, office support and business support services",
  "Other manufacturing",
  "POS Service",
  "Courier, logistics and Postal activities",
  "Printing and reproduction of recorded media",
  "Publishing activities including books",
  "Real estate, rental and leasing activities",
 "Real estate technology activities",
  "Repair of electronic gadgets, computer and other household goods",
  "Software Development, computer programming, consulting and related activities",
  "Technology Services",
  "Tailoring materials and sale of fabrics",
  "Stylist, fashion and others",
  "Ushering agency and event support staff",
  "Waste management and recycling activities",
  "Other services"
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

// Entity type options
export const entityTypes = [
  { value: "Private", label: "Private" },
  { value: "Public", label: "Public" },
];

// Entity requirement options
export const entityRequirements = [
  { value: "Standard", label: "Standard" },
  { value: "Non-Standard", label: "Non-Standard" },
];
