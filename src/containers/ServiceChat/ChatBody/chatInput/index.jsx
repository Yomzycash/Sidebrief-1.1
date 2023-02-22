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
import { useLocation } from "react-router-dom";
import { useAddNotificationMutation } from "services/chatService";
import { convertToLink } from "utils/LaunchHelper";

export const ChatInput = ({ message }) => {
	const [addNotification] = useAddNotificationMutation();
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState([]);

	const [clearSlate, setClearSlate] = useState(false);
	const folder = useMemo(() => new DataTransfer(), []);

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
	let notificationId = params.get("notificationId");
	const username = JSON.parse(localStorage.getItem("userInfo"));

	const handleGetRequiredChat = (formData, files) => {
		return {
			serviceId: serviceId,
			senderId: username?.username,
			messageSubject: formData.subject,
			messageBody: formData.message,
			messageIsRead: false,
			messageFiles: files,
		};
	};

	const sendMessage = async (formData) => {
		// clear data
		folder.items.clear();
		setFiles([]);
		setClearSlate(true);
		reset();

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

		addNotification(handleGetRequiredChat(formData, docArray));
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

	// useEffect(() => {
	// 	if (notificationId)
	// 		setValue("subject", `Re: ${message.messageSubject}`);
	// 	else setValue("subject", "");
	// }, [message?.messageSubject]);

	return (
		<TextInputForm onSubmit={handleSubmit(sendMessage)}>
			<SubjectInput
				placeholder="Subject"
				{...register("subject")}
				disabled={message?.messageSubject}
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
									<Close onClick={() => removeFile(index)}>
										X
									</Close>
								</FileBeforeUpload>
							);
						})}
					</Files>
				</Wrapper>
				<CommonButton type={"submit"} text={"Send"} RightIcon={Send} />
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
