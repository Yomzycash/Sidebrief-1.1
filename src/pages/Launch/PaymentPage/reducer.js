let Array = [];

export const providerReducer = (state, action) => {
	switch (action.type) {
		case actions.ACTIVATE:
			Array = [...state].map((el) => {
				return { ...el, active: el.id === action.id };
			});
			return Array;
		default:
			return state;
	}
};

export const actions = {
	ACTIVATE: "ACTIVATE",
};
