import React, { useState } from "react";
import {
  Wrapper,
  Top,
  Label,
  ErrMsg,
  Input,
  Iconwrapper,
  InputWrapper,
  DateWrapper,
  CalendarWrapper,
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

  const pickDay = (day) => {
    setShowCalendar(false);
    setDate(format(day, "dd/MM/yyyy"));
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

        <DateWrapper>
          <Input
            type="text"
            placeholder="DD/MM/YY"
            uppercase
            readonly
            value={date}
            {...register(name)}
            {...rest}
          />
          {/* TODO: hide when out of focus */}
          {showCalendar ? (
            <CalendarWrapper>
              <Calendar onClickDay={pickDay} />
            </CalendarWrapper>
          ) : null}
        </DateWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
