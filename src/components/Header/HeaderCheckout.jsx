import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProgressBar } from "components/Indicators";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import toast from "react-hot-toast";
import { CheckoutController } from "containers";
import { HiX } from "react-icons/hi";

const HeaderCheckout = ({ getStarted, noProgress, backToDashBoard }) => {
	const LayoutInfo = useSelector((store) => store.LayoutInfo);
	const { checkoutProgress } = LayoutInfo;
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [headerShadow, setHeaderShadow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setHeaderShadow(window.pageXOffset > 0 ? true : false);
		});
	}, []);

	const handleClick = () => {
		setOpenModal(true);
	};

	const handleNext = () => {
		localStorage.removeItem("launchInfo");
		localStorage.removeItem("countryISO");
		localStorage.removeItem("paymentDetails");
		toast.success("Saved");
		setOpenModal(false);
		navigate("/dashboard");
	};

	const handlePrev = () => {
		setOpenModal(false);
	};

	const toDashboard = () => {
		// navigate("/dashboard");
	};

	return (
		<>
			<Wrapper headerShadow={headerShadow}>
				{!getStarted ? (
					<BackContainer onClick={handleClick}>
						<FiArrowLeft color="#151717" size={24} />
						<Text>Save & Exit</Text>
					</BackContainer>
				) : null}

				{backToDashBoard ? (
					<BackContainer onClick={toDashboard}>
						<FiArrowLeft color="#151717" size={24} />
						<Text>Back to Dashboard</Text>
					</BackContainer>
				) : null}

				{!noProgress ? (
					<ProgressWrapper style={{ left: getStarted && 0 }}>
						<ProgressBar progress={checkoutProgress} />
					</ProgressWrapper>
				) : null}
			</Wrapper>

			<Dialog open={openModal} fullWidth maxWidth="sm">
				<ModalWrapper>
					<Top>
						<CloseWrapper onClick={() => setOpenModal(false)}>
							<HiX size={20} />
						</CloseWrapper>
					</Top>

					<Question>Save and continue later ?</Question>
					<ModalButton>
						<CheckoutController
							backAction={handlePrev}
							backText={"No"}
							forwardAction={handleNext}
							forwardText={"Yes"}
						/>
					</ModalButton>
				</ModalWrapper>
			</Dialog>
		</>
	);
};

export default HeaderCheckout;

const Wrapper = styled.div`
	width: 100%;
	background: #ffffff;
	border-bottom: 1px solid #edf1f7;
	display: flex;
	align-items: center;
	height: clamp(90px, 15vw, 164px);
	gap: 12%;
	position: sticky;
	z-index: 4;
	top: 0;
	/* padding-inline: 8%; */
	padding-inline: clamp(24px, 3.4vw, 40px);
	box-shadow: ${(props) =>
		props.headerShadow === true ? "0px 10px 15px -5px #9596971a" : null};
`;

const BackContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	cursor: pointer;
`;
const Text = styled.h3`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #151717;

	@media screen and (max-width: 700px) {
		display: none;
	}
`;

const ProgressWrapper = styled.div`
	position: relative;
	left: -6%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const ModalWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 40px 0px;
	flex-flow: column;
`;
export const ModalButton = styled.div`
	display: flex;
	width: 80%;
`;
const Question = styled.p`
	margin-bottom: 30px;
	font-size: clamp(16px, 1.5vw, 20px);
`;
const Top = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	width: 80%;
`;

const CloseWrapper = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	align-items: center;
	padding: 10px;
	border-radius: 100%;
	background-color: #d7d7d7;
	margin-bottom: 20px;
`;
