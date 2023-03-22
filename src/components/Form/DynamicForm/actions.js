import * as yup from "yup";

//

export const getSchema = (array) => {
  let schema = {};
  array?.forEach((el) => {
    if (el?.fieldRequired === true) {
      if (el?.fieldType === "input")
        schema[el?.fieldName] = yup.string().required(`Please answer the question`);
      else if (el?.fieldType === "textarea")
        schema[el?.fieldName] = yup.string().required(`Please answer the question`);
      else if (el?.fieldType === "number")
        schema[el?.fieldName] = yup
          .number()
          .typeError(`Must be a number`)
          .required(`Please answer the question`);
      else if (el?.fieldType === "checkbox")
        schema[el?.fieldName] = yup
          .array()
          .of(yup.string())
          .min(1, "Select at least one option")
          .required("Select at least one option");
      else if (el?.fieldType === "radio")
        schema[el?.fieldName] = yup.string().required(`Select an option`);
    } else {
      if (el?.fieldType === "text") schema[el?.fieldName] = yup.string().nullable();
      else if (el?.fieldType === "textarea") schema[el?.fieldName] = yup.string().nullable();
      else if (el?.fieldType === "number")
        schema[el?.fieldName] = yup.number().typeError(`Must be a number`).nullable();
      else if (el?.fieldType === "checkbox")
        schema[el?.fieldName] = yup.array().of(yup.string()).nullable();
      else if (el?.fieldType === "radio") schema[el?.fieldName] = yup.string().nullable();
    }
  });

  return yup.object().shape(schema);
};

//

export const getType = (type) => {
  if (type === "checkbox" || type === "radio" || type === "input" || type === "textarea")
    return "text";
  else return type;
};
