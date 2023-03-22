export const initialState = {
  templateName: "",
  templateLink: "",
  nameError: "",
  linkError: "",
  done: false,
  doneClicked: false,
  updateClicked: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setTemplateName":
      return {
        ...state,
        templateName: action.payload,
      };
    case "setTemplateLink":
      return {
        ...state,
        templateLink: action.payload,
      };
    case "setNameError":
      return {
        ...state,
        nameError: action.payload,
      };
    case "setLinkError":
      return {
        ...state,
        linkError: action.payload,
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
