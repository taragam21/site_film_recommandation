import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-taragam-carousel/lib/taragam-carousel.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TaragamCarousel from "react-taragam-carousel";
import Axios from "axios";
import { img_300 } from "../../Config/Config";
import { useNavigate, useParams } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const ItemColApiRecomCarousel = () => {
  const useStyles = makeStyles(() => ({
    carousel: {
      marginTop: "42px",
      height: "270px",
      width: "100%",
      alignItems: "center",
    },
  }));
  const { id, title } = useParams();
  let navigate = useNavigate();
  const classes = useStyles();
  const list=[19995,285,206647,5176,260346,1389,9894,8592,913,11091]
  
  const [content, setContent] = useState([]);


  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * list.length);
    const movieId = list[randomIndex];
    const fetchTrending = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US&page=1`
      );
      setContent(data.results);
    };
    fetchTrending();
  }, []);

  const items = content.map((c) => (
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
      <TaragamCarousel
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

export default ItemColApiRecomCarousel;
