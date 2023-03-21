import { handleError } from "utils/globalFunctions";

export const useActions = ({
  state,
  info,
  dispatch,
  setDisabled,
  handleTemplateSubmit,
  handleUpdateTemplate,
  review,
}) => {
  const { templateName, templateLink, done, doneClicked, updateClicked } = state;

  // Runs on template name change
  const handleTemplateName = (e) => {
    let value = e.target.value;
    dispatch({ type: "setTemplateName", payload: value });
    validateName(value);
  };

  //

  // Runs on template link change
  const handleTemplateLink = (e) => {
    let value = e.target.value;
    dispatch({ type: "setTemplateLink", payload: value });
    validateLink(value);
  };

  //

  // Validates template name input
  const validateName = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setNameError", payload: "Enter template name" });
      return false;
    } else {
      dispatch({ type: "setNameError", payload: "" });
      return true;
    }
  };

  //

  // Validates template link input
  const validateLink = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setLinkError", payload: "Enter template link" });
      return false;
    } else {
      dispatch({ type: "setLinkError", payload: "" });
      return true;
    }
  };

  //

  // Submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (done) {
      dispatch({ type: "setDone", payload: false });
      dispatch({ type: "setDoneClicked", payload: false });
      resetFields();
      return;
    }
    if (doneClicked && !templateName && !templateLink) {
      dispatch({ type: "setDone", payload: true });
      return;
    }

    let nameValid = validateName(templateName);
    let linkValid = validateLink(templateLink);
    if (!nameValid || !linkValid) return;

    let response = review
      ? await handleUpdateTemplate({ ...state, templateCode: info?.templateCode })
      : await handleTemplateSubmit(state);
    if (response?.data) {
      if (doneClicked) dispatch({ type: "setDone", payload: true });
      else if (updateClicked) {
        setDisabled(true);
      }
      resetFields();
    } else {
      handleError(response?.error);
    }
  };

  //

  const resetFields = () => {
    dispatch({ type: "setTemplateName", payload: "" });
    dispatch({ type: "setTemplateLink", payload: "" });
    dispatch({ type: "setNameError", payload: "" });
    dispatch({ type: "setLinkError", payload: "" });
  };

  //

  return {
    handleTemplateName,
    handleTemplateLink,
    handleSubmit,
    resetFields,
  };
};
