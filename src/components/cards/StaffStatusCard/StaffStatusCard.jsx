import React from "react";
import {
	BottomWrapper,
	Container,
	DropdownWrapper,
	IconWrapper,
	LastContainer,
	Middle,
	Top,
	Wrapper,
} from "./styles";

const StatusCard = ({
	total,
	draft,
	awaiting,
	approved,
	rejected,
	totalPercentageIncrease,
	draftPercentageIncrease,
	approvedPercentageIncrease,
	awaitingPercentageIncrease,
	rejectedPercentageIncrease,
}) => {
	const numberOrNull = (number) => {
		return number ? number : "--";
	};

	return (
		<Wrapper>
			<Container border="none">
				<Top>Total</Top>
				<Middle>{numberOrNull(total)}</Middle>
				<BottomWrapper>
					<IconWrapper />
					<div>
						{numberOrNull(totalPercentageIncrease)}% this month
					</div>
				</BottomWrapper>
			</Container>
			<Container>
				<Top>Drafts</Top>
				<Middle>{numberOrNull(draft)}</Middle>
				<BottomWrapper>
					<IconWrapper />
					<div>
						{numberOrNull(draftPercentageIncrease)}% this month
					</div>
				</BottomWrapper>
			</Container>
			<Container>
				<Top>Pending</Top>
				<Middle>{numberOrNull(awaiting)}</Middle>
				<BottomWrapper>
					<IconWrapper />
					<div>
						{numberOrNull(awaitingPercentageIncrease)}% this month
					</div>
				</BottomWrapper>
			</Container>
			<Container>
				<Top>Approved</Top>
				<Middle>{numberOrNull(approved)}</Middle>
				<BottomWrapper>
					<IconWrapper />
					<div>
						{numberOrNull(approvedPercentageIncrease)}% this month
					</div>
				</BottomWrapper>
			</Container>
			<Container>
				<Top>Rejected</Top>
				<Middle>{numberOrNull(rejected)}</Middle>
				<BottomWrapper>
					<IconWrapper color="#ED4E3A" />
					<p>
						{numberOrNull(rejectedPercentageIncrease)}% this month
					</p>
				</BottomWrapper>
			</Container>
			<LastContainer>
				<p>This month</p>
				<DropdownWrapper>{}</DropdownWrapper>
			</LastContainer>
		</Wrapper>
	);
};

export default StatusCard;
