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
      alignItems: "center",
    },
  }));
  const { id, title } = useParams();
  let navigate = useNavigate();
  const classes = useStyles();

  const [content, setContent] = useState([]);

  // console.log(id);
  // console.log(title);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await Axios.get(`http://localhost:5000/recomm/` + title);
      setContent(data);
    };
    fetchTrending();
  }, [title]);

  const [movie1, setMovie1] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/movie/${content.movie_name1}?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US`
      );
      setMovie1(data);
      console.log(data);
    };
    fetchMovie();
  }, [content]);

  const [movie2, setMovie2] = useState([]);

  useEffect(() => {
    const fetchMovie2 = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/movie/${content.movie_name2}?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US`
      );
      setMovie2(data);
      console.log(data);
    };
    fetchMovie2();
  }, [content]);

  const [movie3, setMovie3] = useState([]);

  useEffect(() => {
    const fetchMovie3 = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/movie/${content.movie_name3}?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US`
      );
      setMovie3(data);
      console.log(data);
    };
    fetchMovie3();
  }, [content]);

  const [movie4, setMovie4] = useState([]);

  useEffect(() => {
    const fetchMovie4 = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/movie/${content.movie_name4}?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US`
      );
      setMovie4(data);
      console.log(data);
    };
    fetchMovie4();
  }, [content]);

  const [movie5, setMovie5] = useState([]);

  useEffect(() => {
    const fetchMovie5 = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/movie/${content.movie_name5}?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US`
      );
      setMovie5(data);
      console.log(data);
    };
    fetchMovie5();
  }, [content]);

  const items = [
    <Button
      onClick={() => navigate(`/recomm/detail/${movie1.id}/${movie1.title}`)}
    >
      <div style={{ paddingInline: "0.5rem" }}>
        <img
          src={`${img_300}/${movie1.poster_path}`}
          onDragStart={handleDragStart}
          role="presentation"
          width="100%"
          height="290"
          alt={`${movie1.title}`}
        />
      </div>
    </Button>,
    <Button
      onClick={() => navigate(`/recomm/detail/${movie2.id}/${movie2.title}`)}
    >
      <div style={{ paddingInline: "0.5rem" }}>
        <img
          src={`${img_300}/${movie2.poster_path}`}
          onDragStart={handleDragStart}
          role="presentation"
          width="100%"
          height="290"
          alt={`${movie2.title}`}
        />
      </div>
    </Button>,
    <Button
      onClick={() => navigate(`/recomm/detail/${movie3.id}/${movie3.title}`)}
    >
      <div style={{ paddingInline: "0.5rem" }}>
        <img
          src={`${img_300}/${movie3.poster_path}`}
          onDragStart={handleDragStart}
          role="presentation"
          width="100%"
          height="290"
          alt={`${movie3.title}`}
        />
      </div>
    </Button>,
    <Button
      onClick={() => navigate(`/recomm/detail/${movie4.id}/${movie4.title}`)}
    >
      <div style={{ paddingInline: "0.5rem" }}>
        <img
          src={`${img_300}/${movie4.poster_path}`}
          onDragStart={handleDragStart}
          role="presentation"
          width="100%"
          height="290"
          alt={`${movie4.title}`}
        />
      </div>
    </Button>,
    <Button
      onClick={() => navigate(`/recomm/detail/${movie5.id}/${movie5.title}`)}
    >
      <div style={{ paddingInline: "0.5rem" }}>
        <img
          src={`${img_300}/${movie5.poster_path}`}
          onDragStart={handleDragStart}
          role="presentation"
          width="100%"
          height="290"
          alt={`${movie5.title}`}
        />
      </div>
    </Button>,
  ];

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
