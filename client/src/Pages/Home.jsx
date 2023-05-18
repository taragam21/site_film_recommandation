import React from "react";
import Banner from "../Component/Home/Banner";
import { Horror } from "../Component/Home/Horror";
import Romance from "../Component/Home/Romance";
import Action from "../Component/Home/Action";
import ScienceFiction from "../Component/Home/ScienceFiction";

const Home = () => {
  return (
    <div>
      <Banner />

      <Horror />
      <Romance />
      <ScienceFiction />
      <Action />
    </div>
  );
};

export default Home;
