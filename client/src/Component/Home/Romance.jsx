import { Container, Typography } from "@material-ui/core";
import React from "react";
import Carousel2 from "./Carousel2/Carousel2";

const Romance = () => {
  return (
    <>
      <Container style={{ marginTop: "6.1rem" }}>
        <Typography
          variant="h5"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            color: "white",
            paddingTop: "52px",
          }}
        >
          Romance
        </Typography>
        <Carousel2 />
      </Container>
    </>
  );
};

export default Romance;
