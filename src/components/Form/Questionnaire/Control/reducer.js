export const initialState = {
  question: "",
  required: true,
  selectedType: "input",
  optionsArray: [""],
  optionsError: "",
  radioError: "",
  done: false,
  doneClicked: false,
  updateClicked: false,
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
    case "setDoneClicked":
      return {
        ...state,
        doneClicked: action.payload,
      };
    case "setUpdateClicked":
      return {
        ...state,
        updateClicked: action.payload,
      };
    default:
      throw new Error("Action does not exist");
  }
};
