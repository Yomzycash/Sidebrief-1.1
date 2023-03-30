export const initialState = {
  question: "",
  required: false,
  selectedType: "input",
  optionsArray: [""],
  optionsError: "",
  radioError: "",
  done: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setQuestion":
      return {
        ...state,
        question: action.payload,
      };
    case "setRequired":
      return {
        ...state,
        required: action.payload,
      };
    case "setSelectedType":
      return {
        ...state,
        selectedType: action.payload,
      };
    case "setOptionsArray":
      return {
        ...state,
        optionsArray: action.payload,
      };
    case "setQuestionError":
      return {
        ...state,
        questionError: action.payload,
      };
    case "setOptionsError":
      return {
        ...state,
        optionsError: action.payload,
      };
    case "setDone":
      return {
        ...state,
        done: action.payload,
      };

    default:
      throw new Error("Action does not exist");
  }
};
