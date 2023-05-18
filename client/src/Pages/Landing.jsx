import React from "react";
import BelowBanner from "../Component/Landing/BelowBanner";
import TopBanner from "../Component/Landing/TopBanner";

const Landing = (props) => {
  props.funcNav(true);

  return (
    <div>
      <TopBanner />
      <BelowBanner/>
    </div>
  );
};

export default Landing;
