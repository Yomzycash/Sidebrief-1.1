import React from "react";
import { Wrapper, Label, ErrMsg, Top } from "./styled";
import Select from 'react-select'

const DropDown = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage,
  container,
  onSelectedChange = () => {},
  placeholder,
  onChange,
  type,
  options,
  name,
  register,
  ...rest
}) => {

  // const handleChange = (e) => {
  //   let selectedValue = e.target.value;
  //   onSelectedChange(selectedValue);
  //   console.log(selectedValue);
  // };
  // let options = OptionValues.map((data) => (
  //   <option key={data.id} value={data.value}>
  //     {data.value}
  //   </option>
  // ));
  const selectStyle = {
    background: 'red',
    container: (base, state) => ({
      ...base,
      width: '100%', 
      marginTop: 20,

    }),
    control: (base, state) => ({
      ...base,
      boxShadow: 'none',
      borderRadius: 10,
      height: 55,
      paddingLeft: 20,
      border: `1px solid ${
        state.isFocused ? "#00A2D4" : errorMessage ? "red" : "#ECECEC"
      }`,
      outlineColor: '#00A2D4',
    }),
    placeholder: (base, state) => ({
      ...base,
    }),
    input: (provided, state) => ({
      ...provided,
      height: 46,
      borderRadius: 15,
      marginLeft: 20,
      outlineColor: '#00A2D4',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 20,
    }),
  }
  return (
    <Wrapper className={containerStyle}>
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>

    
        <Select 
          onChange={onChange} 
          options={options} 
          styles={selectStyle}/>
      
    </Wrapper>
  );
};

export default DropDown;
