import React from "react";
// Helper Funtions
import { fetchData } from "../helpers";
import { Outlet, useLoaderData } from "react-router-dom";

// Assets
import wave from "../assets/wave.svg";
import Nav from "../components/Nav.jsx";

// Loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img
        src={wave}
        alt="Wave Image for Footer"
        title="Wave Image"
        loading="eager"
      />
    </div>
  );
};

export default Main;
