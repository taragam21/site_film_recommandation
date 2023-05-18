import { Container, Typography } from "@material-ui/core";
import React from "react";
import Carousel4 from "./Carousel4/Carousel4";

export const Action = () => {
  return (
    <Container style={{ marginTop: "6.1rem" }}>
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "700",
          color: "white",
          paddingTop: "32px",
        }}
      >
        Action
      </Typography>
      <Carousel4 />
    </Container>
  );
};

export default Action;
