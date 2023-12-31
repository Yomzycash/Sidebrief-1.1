import { Container, Text, TextContainer, SubText } from "./styles";
import { styled } from "@mui/material/styles";
import { Switch as MuiSwitch } from "@mui/material";

export const Switch = ({ text, id, subText, action }) => {
	const handleChange = (event) => {
		// perform change action or call change function
	};

	return (
		<Container>
			<TextContainer>
				<Text>{text}</Text>
				<SubText>{subText}</SubText>
			</TextContainer>
			<IOSSwitch onChange={handleChange} />
		</Container>
	);
};

const IOSSwitch = styled((props) => (
	<MuiSwitch
		focusVisibleClassName=".Mui-focusVisible"
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		padding: 0,
		margin: 2,
		transitionDuration: "300ms",
		"&.Mui-checked": {
			transform: "translateX(16px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				backgroundColor:
					theme.palette.mode === "dark" ? " #00A2D4" : " #00A2D4",
				opacity: 1,
				border: 0,
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: 0.5,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			color: "#00A2D4",
			border: "6px solid #fff",
		},
		"&.Mui-disabled .MuiSwitch-thumb": {
			color:
				theme.palette.mode === "light"
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		"&.Mui-disabled + .MuiSwitch-track": {
			opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
		},
	},
	"& .MuiSwitch-thumb": {
		boxSizing: "border-box",
		width: 22,
		height: 22,
	},
	"& .MuiSwitch-track": {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
	},
}));
