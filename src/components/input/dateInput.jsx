import React, { useEffect, useRef, useState } from "react";
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

  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) {
      inputRef.current.focus();
    }
  }, [active]);
  const handleBorder = () => {
    setActive(!active);
  };

  return (
    <Wrapper className={containerStyle}>
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
      >
        <Iconwrapper>
          <label htmlFor="date">
            <CalendarIcon />
          </label>
        </Iconwrapper>

        <DateWrapper>
          <DatePicker
            selected={dateIsTouched ? selectedDate : ""}
            onChange={pickDay}
            placeholderText={"DD/MM/YY"}
            dateFormat={"dd/MM/yyyy"}
            closeOnScroll={true}
            className="date"
            id="date"
          />
        </DateWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
