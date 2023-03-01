import * as yup from "yup";

//

export const getSchema = (array) => {
  let schema = {};
  array.forEach((el) => {
    if (el.importance === "required") {
      if (el.type === "text")
        schema[el.name] = yup.string().required(`required`);
      else if (el.type === "number")
        schema[el.name] = yup
          .number()
          .typeError(`required`)
          .required(`required`);
    } else {
      if (el.type === "text") schema[el.name] = yup.string().nullable();
      else if (el.type === "number")
        schema[el.name] = yup.number().typeError(`Enter a number`).nullable();
    }
  });

  return yup.object().shape(schema);
};
