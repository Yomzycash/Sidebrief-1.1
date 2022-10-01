import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ isVerified, children }) => {
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  });

  if (isVerified) {
    return children;
  } else {
    redirect === false && setRedirect(true);
  }
};

export default Protected;
