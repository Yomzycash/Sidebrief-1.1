import React, { useEffect, useRef, useState } from "react";
import {
	Wrapper,
	Top,
	Label,
	ErrMsg,
	Iconwrapper,
	InputWrapper,
	CalendarWrapper,
	Input,
	TransparentBackdrop,
} from "./styled";
import { ReactComponent as CalendarIcon } from "asset/auth/Calendar.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import format from "date-fns/format";

export const DateInput = ({
	containerStyle,
	label,
	labelStyle,
	errorMessage,
	leftIcon,
	name,
	register,
	selectDate,
	...rest
}) => {
	const [date, setDate] = useState("");
	const [dateIsTouched, setDateIsTouched] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const [active, setActive] = useState(false);
	const inputRef = useRef(null);

	const hideCalendar = () => {
		setShowCalendar(false);
	};

	const pickDay = (day) => {
		setDateIsTouched(true);
		const selectedDate = format(day, "dd/MM/yyyy");
		setDate(selectedDate);
		selectDate(selectedDate);
		hideCalendar();
	};

	useEffect(() => {
		if (active) {
			inputRef.current.focus();
		}
	}, [active]);
	const handleBorder = () => {
		setActive(!active);
	};

	return (
		<Wrapper
			className={containerStyle}
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 10, opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Top>
				<Label className={labelStyle}>{label ? label : "Date"}</Label>

				{errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
			</Top>
			<InputWrapper
				border={
					errorMessage
						? "1px solid red"
						: active
						? "1px solid #00A2D4"
						: "1px solid #ececec"
				}
				ref={inputRef}
				onFocus={handleBorder}
				onClick={() => setShowCalendar((prev) => !prev)}
			>
				<Iconwrapper>
					<label htmlFor="date">
						<CalendarIcon />
					</label>
				</Iconwrapper>

				<Input
					type="text"
					placeholder="DD/MM/YY"
					uppercase
					readOnly
					value={date}
					{...register(name)}
					{...rest}
				/>
			</InputWrapper>
			{showCalendar ? (
				<>
					<CalendarWrapper>
						<Calendar onClickDay={pickDay} />
					</CalendarWrapper>
					<TransparentBackdrop onClick={hideCalendar} />
				</>
			) : null}
		</Wrapper>
	);
};
