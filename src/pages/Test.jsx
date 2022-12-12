import StaffEntityModal from "components/modal/StaffEntityAddModal";
import StaffRewardModal from "components/modal/StaffRewardModal";
import StaffSidebar from "components/sidebar/StaffSidebar";
import React from "react";

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
