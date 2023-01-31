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

const Test = () => {
  // This exemplifies a data recieved from the backend
  let exampleData = [
    "Ayomide Constructions & Sons",
    "Ayomide Constructions & Sons",
    "Ayomide Constructions & Sons",
    "Ayomide Constructions & Sons",
    "Ayomide Constructions & Sons",
    "Ayomide Constructions & Sons",
  ];

  const header = ["Business Name", "Bank Name", "Account Number"];

  const dataBody = exampleData.map((el) => [
    el,
    <div>
      <img src={GladeLogo} alt="" />
      Sterling Bank
    </div>,
    <div>
      3399449933
      <CopyIcon size={20} />
    </div>,
    <div onClick={(e) => console.log(e)}>
      <DownloadIcon size={20} />
      <span style={{ color: "#00A2D4" }}>View account</span>
    </div>,
    <IoMdMore />,
  ]);

  return (
    <div style={{ display: "flex", flexFlow: "column", gap: "40px" }}>
      {/* <FeatureSection
        title="Registered Businesses"
        subText="View and create bank accounts for all registered businesses"
        btnText="Create bank account"
        btnLeftIcon={ResourcesIcon}
      >
        <FeatureTable header={header} body={dataBody} />
      </FeatureSection>
      <FeatureSection
        title="Banks"
        subText="See all available banks to create an account with"
        searchPlaceholder="Search for a bank"
        btnText="View all"
        btnRightIcon={BiRightArrowAlt}
      >
        <ScrollBox>
          {Array(5)
            .fill("__")
            .map((reward, index) => (
              <RewardCard
                key={index}
                title={reward?.rewardPartner}
                body={reward?.rewardName}
                image={reward?.rewardImage}
              />
            ))}
        </ScrollBox>
      </FeatureSection> */}
      <ServicesModal open={true} />
    </div>
  );
};

export default Test;
