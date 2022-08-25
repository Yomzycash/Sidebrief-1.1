import React, { useEffect, useState } from "react";
import { Wrapper, Label, ErrMsg, Top } from "./styled";
import Select from 'react-select'

const CountryInput = ({
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

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
    }, []);

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
      height: 56,
      paddingLeft: 20,
      border: '1px solid #ececec',
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
      options={countries}
      styles={selectStyle}
      value={selectedCountry}
      onChange={(selectedOption) => setSelectedCountry(selectedOption)}
    />
      
    </Wrapper>
  );
};

export default CountryInput;
