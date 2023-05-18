import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AliceCarousel from "react-alice-carousel";
import Axios from "axios";
import { img_300 } from "../../Config/Config";
import { useNavigate, useParams } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const RecmCarousel = () => {
  const useStyles = makeStyles(() => ({
    carousel: {
      marginTop: "42px",
      height: "270px",
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  }));
  const { id } = useParams();
  let navigate = useNavigate();
  const classes = useStyles();

  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US&page=1`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  });

  const items = content
    .filter((c, index) => index < 10)
    .map((c) => (
      <Button onClick={() => navigate(`/detail/${c.id}/${c.title}`)}>
        <div style={{ paddingInline: "0.5rem" }}>
          <img
            src={`${img_300}/${c.poster_path}`}
            onDragStart={handleDragStart}
            role="presentation"
            width="100%"
            height="290"
            alt={`${c.title}`}
          />
        </div>
      </Button>
    ));
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    900: {
      items: 5,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        disableDotsControls
        items={items}
        responsive={responsive}
        controlsStrategy="responsive"
        autoPlay={true}
        autoPlayInterval={5000}
        infinite={true}
        renderPrevButton={() => {
          return (
            <Button
              className="p-4 absolute left-0 top-0"
              style={{ marginInline: "20px", color: "white" }}
            >
              <KeyboardDoubleArrowLeftIcon fontSize="large" />
            </Button>
          );
        }}
        renderNextButton={() => {
          return (
            <Button
              className="p-4 absolute right-0 top-0"
              style={{ marginInline: "20px", color: "white" }}
            >
              <KeyboardDoubleArrowRightIcon fontSize="large" />
            </Button>
          );
        }}
      />
    </div>
  );
};

export default RecmCarousel;
