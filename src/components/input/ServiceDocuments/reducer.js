export const initialState = {
  documentName: "",
  documentDescription: "",
  nameError: "",
  descriptionError: "",
  done: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setDocumentName":
      return {
        ...state,
        documentName: action.payload,
      };
    case "setDocumentDescription":
      return {
        ...state,
        documentDescription: action.payload,
      };
    case "setNameError":
      return {
        ...state,
        nameError: action.payload,
      };
    case "setDescriptionError":
      return {
        ...state,
        descriptionError: action.payload,
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
