export const initialState = {
  documentName: "",
  documentDescription: "",
  nameError: "",
  descriptionError: "",
  done: false,
  doneClicked: false,
  updateClicked: false,
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
