import React from "react";
import { CornerPetal } from "asset/svg";
import styled from "styled-components";
import { ReactComponent as MoreIcon } from "../../../../src/asset/svg/threeDot.svg";
import { ReactComponent as MailIcon } from "../../../../src/asset/svg/mailbox.svg";

const CountryCard = ({
	image,
	name = "NIgeria",
	countryCode = "NGA",
	countryNumber = "+234",
	countryCurrency = "Naira",
	action,
}) => {
	return (
		<Container onClick={action}>
			<Corner>
				<CornerPetal viewBox="0 0 40 170" />
			</Corner>
			<Top>
				<TopWrapper>
					<CountryImageWrapper>
						<img
							crossOrigin="anonymous"
							src={`https://countryflagsapi.com/png/${
								countryCode.toLowerCase().split("-")[0]
							}`}
							alt="flag"
						/>
					</CountryImageWrapper>
					<CountryName>{name}</CountryName>
				</TopWrapper>
				<MoreIconWrapper>
					<MoreIcon />
				</MoreIconWrapper>
			</Top>
			<Low>
				<LowContainer>
					<ImageWrapper>
						<MailIcon />
					</ImageWrapper>
					<CountryCodeWrapper>{countryCode}</CountryCodeWrapper>
				</LowContainer>
				<LowContainer>
					<ImageWrapper>
						<MailIcon />
					</ImageWrapper>
					<CountryCodeWrapper>{countryNumber}</CountryCodeWrapper>
				</LowContainer>
				<LowContainer>
					<ImageWrapper>
						<MailIcon />
					</ImageWrapper>
					<CountryCodeWrapper>{countryCurrency}</CountryCodeWrapper>
				</LowContainer>
			</Low>
		</Container>
	);
};

export default CountryCard;
const Container = styled.div`
	cursor: pointer;
	max-width: 342px;
	width: 100%;
	min-height: 108px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	gap: 17px;
	transition: all 0.2s;
	position: relative;

	background: #ffffff;
	padding: 24px;

  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  &:hover {
    background: #00a2d4;
  }
`;
const Corner = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	transform: rotateX(0deg);

  svg {
    ellipse {
      fill: #ccf3ff7a;
      fill-opacity: 1;
    }
  }

  ${Container}:hover & {
    svg {
      ellipse {
        fill: #ffffffa3;
      }
    }
  }
`;
const Top = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 16px;
`;
const TopWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 16px;
`;
const CountryImageWrapper = styled.div`
	min-width: 24px;
	max-width: 24px;
	height: 24px;

	background: #ffffff;
	box-shadow: 0px 2px 4px #d7d7d7;
	border-radius: 500px;
	overflow: hidden;

	img {
		height: 100%;
		width: 100%;
		object-fit: fill;
	}
`;
const ImageWrapper = styled.div``;
const CountryName = styled.h3`
	font-weight: 600;
	font-size: 20px;
	line-height: 21px;
	letter-spacing: -0.02em;
	text-transform: capitalize;
	color: ${({ theme }) => theme.grey1};
`;
const MoreIconWrapper = styled.div``;
const Low = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	gap: 8px;
`;
const LowContainer = styled.div`
	display: inline-flex;
	align-items: center;
	width: 100%;
	gap: 8px;
	padding: 0px 8px;
`;
const CountryCodeWrapper = styled.h3`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: #4e5152;
`;
