import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const withRouter = (WrapperComponent) => (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <WrapperComponent
      params={param}
      {...props}
      navigate={navigate}
      location={location}
    />
  );
};

export default withRouter;
