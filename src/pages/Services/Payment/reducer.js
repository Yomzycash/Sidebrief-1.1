import { paymentProviders } from "./constants";
import { useReducer } from "react";

let Array = [];

const providerReducer = (state, action) => {
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

const actions = {
  ACTIVATE: "ACTIVATE",
};

export const usePaymentReducer = () => {
  const [providers, dispatch] = useReducer(
    providerReducer,
    paymentProviders.map((provider, index) => {
      return {
        ...provider,
        id: index + 1,
        active: index === 0,
      };
    })
  );

  const activateProvider = (id) => {
    dispatch({ type: actions.ACTIVATE, id: id });
  };

  // get current active
  const getActive = () => {
    return providers.find((el) => el.active === true).name.toLowerCase();
  };

  return {
    providers,
    activateProvider,
    getActive,
  };
};
