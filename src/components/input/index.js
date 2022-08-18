import React, { useState } from 'react'
import './input.css'


export const InputWithLabel = ({
    label,
    labelStyle,
    leftIcon,
    container,
    placeholder,
    secureTextEntry,
}) => {
    const [isBlurred, setIsBlurred] = useState(true);
  return (
    <div className='container'>
        {
            label && <label className='inputLabel'>{label}</label>
        }
        <div className={isBlurred ? 'blurredWrapper' : 'wrapper'}>
            {leftIcon && <div className='leftIcon'>{leftIcon}</div>}

            <input 
            placeholder={placeholder}
            onFocus={() => setIsBlurred(false)}
            className='inputLabel'
            />
        </div>
    </div>
  )
}

export default InputWithLabel