import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
// library Imports
import { FaHome } from "react-icons/fa";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <HiMiniArrowUturnLeft width={20} />
          <span>Go Back</span>
        </button>
        <Link to={"/"} className="btn btn--dark">
          <FaHome width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
