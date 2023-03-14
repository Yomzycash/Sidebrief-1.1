import React, { useState } from 'react';
import styled from 'styled-components';
import { TextAreaWithLabel } from '.';
import { InputWithLabel } from '.';
import { Checkbox2 } from '.';

const QuestionnaireInput = ( { label }) => {
  const [activeButton, setActiveButton] = useState('A');
  const handleButtonClick = (buttonName) => setActiveButton(buttonName);

  const renderSection = (buttonName, Component) => (
    <Section show={activeButton === buttonName}>
      <Component />
    </Section>
  );

  const MultiChoiceOptions = () => (
    <div>
      <input type="radio" name="option" value="option1" />
      <label>Type the first option here</label>
      <br />
      <input type="radio" name="option" value="option2" />
      <label>Type the first option here</label>
      <br />
      <input type="radio" name="option" value="option3" />
      <label>Type the first option here</label>
      <br />
      <input type="radio" name="option" value="option4" />
      <label>Type the first option here</label>
    </div>
  );

  const CheckboxOptions = () => (
    <div>

      <Checkbox2 text1="Type the first option here" />
      <Checkbox2 text1="Type the second option here" />
      <Checkbox2 text1="Type the third option here" />
    </div>
  );

  const ShortTextOptions = () => (
    <InputWithLabel type="text" placeholder="Short Text"/>
  )
    

  const ParagraphOptions = () => (
    <TextAreaWithLabel placeholder="Paragraph" />
  )
  return (
    <QuestionContainer>
        <Container>
            <Button onClick={() => handleButtonClick('A')} active={activeButton === 'A'}>
                Multipe Choice
            </Button>
            <Button onClick={() => handleButtonClick('B')} active={activeButton === 'B'}>
                Checkbox
            </Button>
            <Button onClick={() => handleButtonClick('C')} active={activeButton === 'C'}>
                Short Text
            </Button>
            <Button onClick={() => handleButtonClick('D')} active={activeButton === 'D'}>
                Paragraph
            </Button>
        </Container>

        <SectionContainer>
            {renderSection('A', MultiChoiceOptions)}
            {renderSection('B', CheckboxOptions)}
            {renderSection('C', ShortTextOptions)}
            {renderSection('D', ParagraphOptions)}
        </SectionContainer>
    </QuestionContainer>
    
  );
};

export default QuestionnaireInput;



const Container = styled.div`
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right:15px;
    color: ${(props) => (props.active ? '#fff' : '#959697')};
    padding: 10px 24px;
    cursor: pointer;  
    border: ${(props) => (props.active ? 'none' : '1px solid #959697')};
    border-radius: 8px;
    outline:none;
    max-width: max-content;
    background-color: ${(props) => (props.active ? '#00A2D4' : '#fff')};
`;
const SectionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
`
const Section = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const QuestionContainer = styled.div`
    display:flex;
    position:relative;
    justify-content:flex-start;

    p {
        color: #4e5152;
        font-weight: 500;
        font-size: clamp(12px, 1.3vw, 14px);
    }
`

