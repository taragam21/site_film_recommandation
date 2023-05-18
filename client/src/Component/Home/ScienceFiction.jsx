import { Container, Typography } from "@material-ui/core";
import React from "react";
import Carousel5 from "./Carousel5/Carousel5";

const ScienceFiction = () => {
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
          Science Fiction
        </Typography>
        <Carousel5 />
      </Container>
    </>
  );
};

export default ScienceFiction;
