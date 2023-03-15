// name uniqueness has to be validated
export const formInfo = [
  {
    question: "When did you register your company",
    type: "number",
    name: "registration",
    required: true,
  },
  {
    question: "Who is your favourite artist",
    type: "text",
    options: ["davido", "wizkid", "burna"],
    name: "artist",
    required: true,
  },
  {
    question: "How many shareholders do you have",
    type: "number",
    name: "shareholders",
    required: true,
  },
  {
    question: "How many directors do you have",
    type: "number",
    name: "directors",
    required: true,
  },
  {
    question: "How many beneficiaries do you have",
    type: "number",
    name: "beneficiaries",
    required: true,
  },
];
