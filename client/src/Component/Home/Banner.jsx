import { Container, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import GenreSort from "../GenreSort";
import Carousel from "./Carousel1/Carousel";

const useStyle = makeStyles(() => ({
  bannerContent: {
    height: 395,
    opacity: 0.7,
    display: "flex",
    width: "100%",
    marginTop: "17rem",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));

const Banner = () => {
  const classes = useStyle();

  return (
    <Container className={classes.bannerContent}>
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "900",
          color: "white",
          paddingTop: "150px",
        }}
      >
        Most popular{" "}
      </Typography>
      <Carousel className={classes.Carousel} /> 
      <GenreSort />
    </Container>
  );
};

export default Banner;
