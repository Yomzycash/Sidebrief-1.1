import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ isVerified, children, redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified) {
      navigate(redirect ? redirect : "/login");
    }
  }, [isVerified]);

  if (isVerified) {
    return children;
  }
};

export default Protected;
