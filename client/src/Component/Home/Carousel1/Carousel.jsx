import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import Axios from "axios";
import { img_300 } from "../../../Config/Config";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const Carousel = () => {
  const useStyles = makeStyles(() => ({
    carousel: {
      height: "220px",
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await Axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US&page=1`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  const items = content
    .filter((c, index) => index < 10)
    .map((c) => (
      <Button onClick={() => navigate(`/detail/${c.id}/${c.title}`)}>
        <div style={{ paddingInline: "0.5rem" }}>
          <img
            src={`${img_300}/${c.poster_path}`}
            onDragStart={handleDragStart}
            width="100%"
            height="558"
            alt="hello"
          />
        </div>
      </Button>
    ));
  const responsive = {
    0: {
      items: 2,
    },
    700: {
      items: 3,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={3000}
        animationDuration={2000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
        keyboardNavigation={true}
      />
    </div>
  );
};

export default Carousel;
