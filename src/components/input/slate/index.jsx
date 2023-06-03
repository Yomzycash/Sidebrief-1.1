import { Container, SlateTop, ToolbarRight, Top, ErrMsg, Label } from "./style";
import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
	Editor,
	Transforms,
	createEditor,
	Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import * as Md from "react-icons/md";
import { Button, Icon, Toolbar, ControlButton } from "./components";
import { useActions } from "./actions";
import { useEffect } from "react";

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	// "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];

export const SlateEditor = ({
	placeholder,
	setValue,
	clearSlate = false,
	unclear,
	// label,
	// labelStyle,
	// register,
	// name,
	// errorMessage,
	// disable
}) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	const { showToolbar, toggleShowToolbar } = useActions({});

	const Clear = useCallback(() => {
		Transforms.delete(editor, {
			at: {
				anchor: Editor.start(editor, []),
				focus: Editor.end(editor, []),
			},
		});
		Editor.normalize(editor);
	}, [editor]);

	useEffect(() => {
		if (clearSlate) {
			Clear();
			unclear();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clearSlate, Clear]);

	return (
		<Container>
			{/* <Top>
				{label && <Label className={labelStyle}>{label}</Label>}

				{errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
			</Top> */}
			<Slate
				editor={editor}
				value={initialValue}
				onChange={(value) => {
					const isAstChange = editor.operations.some(
						(op) => "set_selection" !== op.type
					);
					if (isAstChange) {
						const content = JSON.stringify(value);
						setValue("message", content);
					}
				}}
			>
				<SlateTop>
					{showToolbar && (
						<Toolbar>
							<MarkButton format="bold" Svg={Md.MdFormatBold} />
							<MarkButton
								format="italic"
								Svg={Md.MdFormatItalic}
							/>
							<MarkButton
								format="underline"
								Svg={Md.MdFormatUnderlined}
							/>
							{/* <MarkButton format="code" Svg="MdOutlineCode" /> */}
							<BlockButton
								format="heading-one"
								Svg={Md.MdLooksOne}
							/>
							<BlockButton
								format="heading-two"
								Svg={Md.MdLooksTwo}
							/>
							<BlockButton
								format="block-quote"
								Svg={Md.MdFormatQuote}
							/>
							<BlockButton
								format="numbered-list"
								Svg={Md.MdFormatListNumbered}
							/>
							<BlockButton
								format="bulleted-list"
								Svg={Md.MdFormatListBulleted}
							/>
							{/* <BlockButton format="left" Svg="format_align_left" />
					<BlockButton format="center" Svg="format_align_center" />
					<BlockButton format="right" Svg="format_align_right" />
					<BlockButton format="justify" Svg="format_align_justify" /> */}
						</Toolbar>
					)}
					<ToolbarRight>
						<ControlButton
							Icon={Md.MdOutlineTextFormat}
							action={toggleShowToolbar}
						/>
						<ControlButton
							label
							hfor={"files"}
							Icon={Md.MdAttachFile}
						/>
					</ToolbarRight>
				</SlateTop>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder={placeholder}
					spellCheck
					autoFocus
					onKeyDown={(event) => {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
					}}
					className="editor"
				/>
			</Slate>
		</Container>
	);
};

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(
		editor,
		format,
		TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
	);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties;
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? "paragraph" : isList ? "list-item" : format,
		};
	}
	Transforms.setNodes(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isBlockActive = (editor, format, blockType = "type") => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				n[blockType] === format,
		})
	);

	return !!match;
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
	const style = { textAlign: element.align };
	switch (element.type) {
		case "block-quote":
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case "bulleted-list":
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case "heading-one":
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case "heading-two":
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case "list-item":
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case "numbered-list":
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, Svg }) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(
				editor,
				format,
				TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
			)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			<Icon>
				<Svg />
			</Icon>
		</Button>
	);
};

const MarkButton = ({ format, Svg }) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			<Icon>
				<Svg />
			</Icon>
		</Button>
	);
};
