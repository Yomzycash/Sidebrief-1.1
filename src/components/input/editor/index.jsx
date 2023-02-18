import { useState } from "react";
import { Container } from "./style";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const content = {
	entityMap: {},
	blocks: [
		{
			key: "637gr",
			text: "Initialized from content state.",
			type: "unstyled",
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
			data: {},
		},
	],
};

export const Editor = () => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const handleChange = (rawDraftContentState) => {
		console.log(rawDraftContentState);
		console.log(convertToRaw(rawDraftContentState.getCurrentContent()));
		console.log(
			convertFromRaw(
				convertToRaw(rawDraftContentState.getCurrentContent())
			)
		);
	};

	const onChange = (editorState) => {
		setEditorState(editorState);
		handleChange(editorState);
	};

	return (
		<Container>
			<DraftEditor
				editorState={editorState}
				onEditorStateChange={onChange}
			/>
			<textarea
				style={{ width: "100%" }}
				disabled
				value={JSON.stringify(editorState.getCurrentContent(), null, 4)}
			/>
		</Container>
	);
};
