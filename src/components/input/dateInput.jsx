import React, { useState } from "react";
import {
	Wrapper,
	Top,
	Label,
	ErrMsg,
	Iconwrapper,
	InputWrapper,
	DateWrapper,
} from "./styled";
import { ReactComponent as CalendarIcon } from "asset/auth/Calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
	...rest // rest can REST, I guess
}) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [dateIsTouched, setDateIsTouched] = useState(false);

	const pickDay = (day) => {
		setSelectedDate(day);
		setDateIsTouched(true);
		const selectedDate = format(day, "dd/MM/yyyy");
		selectDate(selectedDate);
	};

	return (
		<Wrapper className={containerStyle}>
			<Top>
				<Label className={labelStyle}>{label ? label : "Date"}</Label>

				{errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
			</Top>
			<InputWrapper>
				<Iconwrapper>
					<CalendarIcon />
				</Iconwrapper>

				<DateWrapper>
					<DatePicker
						selected={dateIsTouched ? selectedDate : ""}
						onChange={pickDay}
						placeholderText={"DD/MM/YY"}
						dateFormat={"dd/MM/yyyy"}
						closeOnScroll={true}
						className="date"
					/>
				</DateWrapper>
			</InputWrapper>
		</Wrapper>
	);
};
