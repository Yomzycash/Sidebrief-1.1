import React, { useState } from "react";
import styled from "styled-components";
import {
  useGetSingleCountryQuery,
  useUpdateCountryMutation,
} from "services/staffService";
import { useParams } from "react-router-dom";
import { Puff } from "react-loading-icons";
import StaffCountryModal from "components/modal/StaffCountryModal";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

const CountryDetails = ({
  date = "12th August, 2022",
  name = " Oluwole Sayo",
}) => {
  const [open, setOpen] = useState(false);

  const { ISO } = useParams();
  const { data, isLoading, refetch } = useGetSingleCountryQuery(ISO);
  const [updateCountry, updateState] = useUpdateCountryMutation();

  const getRequired = (formData) => {
    return {
      countryName: formData.country_name,
      countryCode: formData.country_code,
      countryCurrency: formData.currency,
      countryISO: formData.country_iso,
      countryFlag: formData.flag,
    };
  };

  // This updates an existing country
  const handleCountryUpdate = async (formData) => {
    let requiredData = getRequired(formData);
    console.log(requiredData);
    let response = await updateCountry(requiredData);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Country updated successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  return (
    <Container>
      <Wrapper>
        <LeftContainer>
          {isLoading ? (
            <Loader>
              <Puff stroke="#00A2D4" fill="white" />
            </Loader>
          ) : (
            <ContentContainer>
              <ContentWrapper>
                <Label>Country Name</Label>
                <TextContainer>
                  <TextWrapper>{data?.countryName}</TextWrapper>
                </TextContainer>
              </ContentWrapper>
              <Grid>
                <ContentWrapper>
                  <Label>Country Code</Label>
                  <TextContainer>
                    <TextWrapper>{`+${data?.countryCode}`}</TextWrapper>
                  </TextContainer>
                </ContentWrapper>
                <ContentWrapper>
                  <Label>Country ISO</Label>
                  <TextContainer>
                    <TextWrapper>{data?.countryISO}</TextWrapper>
                  </TextContainer>
                </ContentWrapper>

                <ContentWrapper>
                  <Label>Country Currency</Label>
                  <TextContainer>
                    <TextWrapper>{data?.countryCurrency}</TextWrapper>
                  </TextContainer>
                </ContentWrapper>

                <ContentWrapper>
                  <Label>Country Flag</Label>
                  <TextContainer>
                    <TextWrapper>{`https://countryflagsapi.com/png/${data?.countryISO.toLowerCase()}`}</TextWrapper>
                  </TextContainer>
                </ContentWrapper>
              </Grid>
            </ContentContainer>
          )}
        </LeftContainer>
        <RightContainer>
          <InnerWrapper>
            <Circle />
            <LastWrapper>
              <StatusWrapper>
                <Text>created</Text>
              </StatusWrapper>
              <LightText>{date}</LightText>
              <LightText>by {name}</LightText>
            </LastWrapper>
          </InnerWrapper>
        </RightContainer>
      </Wrapper>
      <BottomWrapper onClick={() => setOpen(true)}>
        <TitleWrapper>Update Changes</TitleWrapper>
      </BottomWrapper>
      <StaffCountryModal
        open={open}
        setOpen={setOpen}
        cardAction="edit"
        countryInfo={data}
        disableAll={false}
        title="Update Country Information"
        submitAction={handleCountryUpdate}
        loading={updateState.isLoading}
        $hideIcons
      />
    </Container>
  );
};

export default CountryDetails;
const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-flow: column;
  gap: 40px;
  height: 100%;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;
const LeftContainer = styled.div`
  max-width: 825px;
  padding-block: 40px;
  padding-inline: 24px;
  flex: 1;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
`;
const ContentContainer = styled.div`
  /* width: 100%; */
  max-width: 544px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;
const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  background: #fafafa;
  border: 1px solid #edf1f7;
  border-radius: 8px;
`;
const TextWrapper = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #242627;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Grid = styled.div`
  display: grid;
  /* flex-direction: row; */
  /* align-items: flex-start; */
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 0px;
  gap: 24px;
  width: 100%;
`;
const RightContainer = styled.div`
  max-width: 275px;
  width: 100%;
  background: #ffffff;
  padding-inline-start: 24px;
  padding-block: 40px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
`;
const InnerWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00a2d4;
`;
const LastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
`;
const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 10px;
  width: 90px;
  background: rgba(0, 162, 212, 0.05);
  border-radius: 12px;
`;
const Text = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #00a2d4;
`;
const LightText = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 10px;
  width: fit-content;
  min-height: 27px;
  background: #00a2d4;
  border-radius: 8px;
  margin-left: 24px;
  cursor: pointer;
  transition: 0.3s all ease;

  :hover {
    background-color: #0082aa;
  }
`;
const TitleWrapper = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;
  /* identical to box height, or 193% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: white;
  /* color: #ffffffa3; */
`;

const Loader = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100px;
`;
