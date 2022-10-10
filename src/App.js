import "./App.css";
import AppRouter from "./routes/appRouter";
import { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
	saveUserInfo,
	setLaunchResponse,
	setGeneratedLaunchCode,
} from "redux/Slices";
import { store } from "redux/Store";

// Added style reset
const GlobalStyle = createGlobalStyle`
body{
  font-family: 'BR Firma', sans-serif;

}
`;

function App() {
	// const userInfo = useSelector((store) => store.UserDataReducer.userInfo);

	let localUserInfo = localStorage.getItem("userInfo");
	let launchInfo = localStorage.getItem("launchInfo");
	useEffect(() => {
		if (localUserInfo) {
			store.dispatch(saveUserInfo(JSON.parse(localUserInfo)));
			console.log(JSON.parse(localUserInfo));
		}
		console.log(launchInfo);
		if (launchInfo) {
			store.dispatch(setLaunchResponse(JSON.parse(launchInfo)));
			store.dispatch(
				setGeneratedLaunchCode(JSON.parse(launchInfo).launchCode)
			);
			console.log(JSON.parse(launchInfo));
		}
	}, [localUserInfo, launchInfo]);

	return (
		<>
			<AnimatePresence exitBeforeEnter>
				<GlobalStyle />
				<AppRouter />
			</AnimatePresence>
		</>
	);
}

export default App;
