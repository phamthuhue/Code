import React from "react";

import { Hero } from "../components/Home/Hero";
import { UpcomingTours } from "../components/Home/UpcomingTours";
import { Services } from "../components/Home/Services";
import { ToursItems } from "../components/Home/ToursItems";
import { Comments } from "../components/Home/Comments";

export const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingTours />
      <Services />
      <ToursItems />
      <Comments />
    </>
  );
};
