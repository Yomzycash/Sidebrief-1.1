import { useState } from "react";

export const useActions = ({}) => {
	const [showToolbar, setShowToolbar] = useState(false);

	const toggleShowToolbar = () => {
		setShowToolbar((prev) => !prev);
	};

	return { showToolbar, toggleShowToolbar };
};
