import React, { useState } from "react";
import {
	Wrapper,
	Top,
	Label,
	ErrMsg,
	Input,
	Iconwrapper,
	InputWrapper,
	CalendarWrapper,
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
	...rest
}) => {
	const [showCalendar, setShowCalendar] = useState(false);
	const [date, setDate] = useState("DD/MM/YY");

	const hideCalendar = () => {
		setShowCalendar(false);
	};

	const pickDay = (day) => {
		setDate(format(day, "dd/MM/yyyy"));
		hideCalendar();
	};

	return (
		<Wrapper className={containerStyle}>
			<Top>
				<Label className={labelStyle}>{label ? label : "Date"}</Label>

				{errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
			</Top>

			<InputWrapper onClick={() => setShowCalendar((prev) => !prev)}>
				<Iconwrapper>
					<CalendarIcon />
				</Iconwrapper>

				<Input
					type="text"
					placeholder="DD/MM/YY"
					uppercase
					readonly
					value={date}
					{...register(name)}
					{...rest}
				/>
			</InputWrapper>
			{showCalendar ? (
				<>
					<CalendarWrapper>
						{/* TODO: hide when out of focus */}
						<Calendar onClickDay={pickDay} />
					</CalendarWrapper>
					<TransparentBackdrop onClick={hideCalendar} />
				</>
			) : null}
		</Wrapper>
	);
};
