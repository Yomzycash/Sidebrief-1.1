import React from 'react'
import { ButtonContainer } from "./styled"

const QuestionnaireButton = ({ 
    text, 
    active,
    action = () => {},
    style,
    classname,
    type,
    LeftIcon,
    RightIcon,
    textStyle,
    leftIconColor,
    rightIconColor,
    component,
   
}) => {
  return (
    <ButtonContainer 
        onClick={action}
        style={style}
        active={active}
        className={"button__effect" || classname}
        type={type || "button"}
    >
         {LeftIcon && <LeftIcon size={20} color={leftIconColor || "white"} />}
          {text && <span style={textStyle}>{text}</span>}
          {RightIcon && (
            <RightIcon size={24} color={rightIconColor || "white"} />
          )}
          {component && <>{component}</>}
    </ButtonContainer>
  )
}

export default QuestionnaireButton