import * as yup from "yup";

export const launchDocumentSchema = yup.object().shape({
  documentName: yup.string().required("Enter document name"),
  documentDescription: yup.string().required("Enter document description"),
  docFile: yup.array().min(1, "Upload document file").required("Upload document file"),
});
