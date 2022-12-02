import { RewardCard } from "components/cards";
import CountryCard from "components/cards/CountryCard";
import StaffEntityCard from "components/cards/StaffEntityCard";
import FileLoading from "components/FileUpload/FileLoading";
import StaffEntityModal from "components/modal/StaffEntityModal";
import StaffRewardModal from "components/modal/StaffRewardModal";
import StaffSidebar from "components/sidebar/StaffSidebar";
import Modal1 from "layout/modal1";
import React from "react";
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from "react-loading-icons";

const Test = () => {
  return (
    <div>
      <StaffRewardModal />;
      <StaffSidebar />
      <StaffEntityModal />
    </div>
  );
};

export default Test;
