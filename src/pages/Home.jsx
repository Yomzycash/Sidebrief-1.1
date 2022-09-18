import React from "react";
import RewardModal from "components/modal/RewardModal";
import { CheckoutFormInfo } from "containers";
const Home = () => {
  return (
    <>
      <RewardModal />
      <CheckoutFormInfo title="Shareholder's Information" />
    </>
  );
};

export default Home;
