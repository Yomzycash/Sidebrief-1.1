import {
  SubjectInput,
  TextBody,
  TextInputForm,
  Wrapper,
  FileBeforeUpload,
  Close,
  Files,
} from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageSchema } from "../constants";
import { SlateEditor } from "components/input";
import { useState, useMemo, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAddNotificationMutation } from "services/chatService";
import { convertToLink } from "utils/LaunchHelper";
import { getSubject } from "./actions";
import { handleResponse } from "pages/Launch/actions";
import { checkStaffEmail, handleError } from "utils/globalFunctions";
import { useSelector } from "react-redux";
import { setRefreshNotifications } from "redux/Slices";
import { store } from "redux/Store";

export const ChatInput = ({ message, threadsRefetch }) => {
  const [addNotification, addState] = useAddNotificationMutation();
  const [files, setFiles] = useState([]);
  const [urlParams, setUrlParams] = useSearchParams();

  const [clearSlate, setClearSlate] = useState(false);
  const folder = useMemo(() => new DataTransfer(), []);

  const { refreshNotifications } = useSelector(
    (store) => store.UserDataReducer
  );

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let serviceId = params.get("serviceId");
  let subject = params.get("subject");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleGetRequiredChat = (formData, files) => {
    let userEmail = localStorage.getItem("userEmail");
    let staffEmail = checkStaffEmail(userEmail);

    return {
      serviceId: serviceId,
      senderId: staffEmail ? "Sidebrief" : userInfo?.username,
      messageSubject: getSubject(formData.subject),
      messageBody: formData.message,
      messageIsRead: false,
      messageFiles: files,
    };
  };

  const sendMessage = async (formData) => {
    const docArray = await Promise.all(
      files.map(async (el) => {
        const toLink = await convertToLink(el);
        return {
          fileUrl: toLink.url,
          fileName: toLink.original_filename,
          fileType: toLink.format,
        };
      })
    );

    let response = await addNotification(
      handleGetRequiredChat(formData, docArray)
    );

    if (response?.data)
      handleResponse(response, "Message sent", () => handleSuccess(formData));
    else handleError(response?.error);
    // clear data

    threadsRefetch();
    store.dispatch(setRefreshNotifications(!refreshNotifications));
  };

  const handleSuccess = (formData) => {
    if (!subject)
      setUrlParams({ serviceId: serviceId, subject: formData?.subject });
    setClearSlate(true);
    reset();
    setFiles([]);
    folder.items.clear();

    setValue("subject", `Re: ${getSubject(formData.subject)}`);
  };

  const fileCollector = (files) => {
    Array.from(files).forEach((file) => {
      folder.items.add(file);
    });
    setFiles(Array.from(folder.files));
    setValue("files", folder.files);
  };

  const removeFile = (index) => {
    folder.items.remove(index);
    setFiles(Array.from(folder.files));
    setValue("files", folder.files);
  };

  useEffect(() => {
    if (subject) setValue("subject", `Re: ${subject}`);
    else setValue("subject", "");
  }, [subject]);

  return (
    <TextInputForm onSubmit={handleSubmit(sendMessage)}>
      <SubjectInput
        placeholder="Subject"
        {...register("subject")}
        disabled={subject}
      />
      <TextBody>
        <Wrapper>
          <SlateEditor
            placeholder="Send a message..."
            setValue={setValue}
            clearSlate={clearSlate}
            unclear={() => setClearSlate(false)}
          />
          <Files>
            {files.map((file, index) => {
              return (
                <FileBeforeUpload key={index}>
                  {file.name}
                  <Close onClick={() => removeFile(index)}>X</Close>
                </FileBeforeUpload>
              );
            })}
          </Files>
        </Wrapper>
        <CommonButton
          type={"submit"}
          text={"Send"}
          RightIcon={Send}
          loading={addState.isLoading}
        />
      </TextBody>
      <input
        id="files"
        name="files"
        type="file"
        style={{ display: "none" }}
        multiple
        onChange={(event) => fileCollector(event.target.files)}
      />
    </TextInputForm>
  );
};
