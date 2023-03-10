import { question } from "pages/Services/Review/constant";
import React, { useEffect, useState } from "react";
import { useViewComplyMutation } from "services/complyService";
import { Answer, Container, InnerContainer, Question, Wrapper } from "./style";

const QuestionCard = () => {
  const [viewComply] = useViewComplyMutation();
  const [complyData, setComplyData] = useState([]);

  const handleData = async () => {
    let response = await viewComply({
      complyCode: "335928451015517734",
    });

    setComplyData(response?.data?.complyData);
  };
  useEffect(() => {
    handleData();
  }, []);

  console.log(complyData);
  return (
    <div>
      <Wrapper>
        <Container>
          {complyData?.map((el, index) => {
            return (
              <InnerContainer key={index}>
                <Question>{el.complyQuestion}</Question>
                <Answer>{el.complyAnswer}</Answer>
              </InnerContainer>
            );
          })}
        </Container>
      </Wrapper>
    </div>
  );
};

export default QuestionCard;
