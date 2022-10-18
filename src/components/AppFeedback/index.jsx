import React from "react";
import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet

const AppFeedback = ({ subProject }) => {
  let userEmail = localStorage.getItem('userEmail')
  
  return (
    <Feedback
      projectId="634c60e423e539000420993e"
      primaryColor="#00A2D4"
      subProject={subProject}
      hoverBorderColor="none"
      activeBorderColor="none"
      emailDefaultValue={userEmail}
    />
  );
};

export default AppFeedback;
