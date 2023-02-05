import React from "react";
import FeatureSection from "containers/Feature/FeatureSection";
import { ResourcesIcon } from "asset/Icons";
import { BiRightArrowAlt } from "react-icons/bi";
import { ScrollBox } from "containers";
import { RewardCard } from "components/cards";
import FeatureTable from "components/Tables/FeatureTable";
import CopyIcon from "asset/Icons/CopyIcon";
import DownloadIcon from "asset/Icons/DownloadIcon";
import { GladeLogo } from "asset/images";
import { IoMdMore } from "react-icons/io";
import ServicesModal from "components/modal/ServicesModal";
import { Chats } from "containers/ServiceChat";
import AllServices from "./Dashboard/staffDashboard/Businesses/Services/AllServices";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";

const Test = () => {
  // This exemplifies a data recieved from the backend

  return (
    <div>
      <AnalyticsChart />
    </div>)
}

export default Test
