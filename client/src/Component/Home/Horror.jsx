import { Container, Typography } from "@material-ui/core";
import React from "react";
import Carousel3 from "./Carousel3/Carousel3";

export const Horror = () => {
  return (
    <Container style={{ marginTop: "11rem" }}>
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "700",
          color: "white",
          paddingTop: "52px",
        }}
      >
        Horror{" "}
      </Typography>
      <Carousel3 />
    </Container>
  );
};
