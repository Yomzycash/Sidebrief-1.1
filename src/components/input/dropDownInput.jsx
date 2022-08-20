import React from 'react'
import { InputWrapper, Wrapper, Label, ErrMsg, Top, Select } from './styled';


const DropDownInput = ({
    label,
    labelStyle,
    containerStyle,
    edit,
    error,
    errorMessage,
    OptionValues,
    onSelectedChange = () =>{},
    container,
    placeholder,
    secureTextEntry,
    type,
    ...rest
}) => {
    const handleChange = (e) => {
        let selectedValue = e.target.value;
        onSelectedChange(selectedValue)

    }
        let options = OptionValues.map((data) => (
            <option key={data.id} value={data.value}>
                {data.value}
            </option>))
  return (
    <Wrapper className={containerStyle}>
        <Top>
        {
            label && <Label className={labelStyle}>{label}</Label>
        }

        {
            errorMessage ? 
            (
                <ErrMsg>{errorMessage}</ErrMsg>
            ): null
        }
        </Top>

        <InputWrapper>

            <Select onChange={handleChange} >
               <option>Select</option>
               <option>Bolu</option>
               {options}
            </Select>
        </InputWrapper>

    </Wrapper>
  )
}

export default DropDownInput