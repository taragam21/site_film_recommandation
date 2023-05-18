import { Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./CastDetailCarousel";
import Axios from "axios";
import { img_300 } from "../../Config/Config";

const DetailBanner = () => {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await Axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US`
    );

    setContent(data);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: "50px", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <img
            src={`${img_300}/${content.profile_path}`}
            height="500px"
            width="100%"
            alt={content.title}
          ></img>
        </div>
        <div
          style={{
            marginLeft: "38px",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            fontFamily: "montserrat",
            lineHeight: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <Typography style={{ fontSize: "40px", fontWeight: "700" }}>
              {content.name}
            </Typography>
          </div>
          <div style={{ fontSize: "20px" }}>Birth Day : {content.birthday}</div>
          <div>
            <b>Place Of Birth : </b>
            {content.place_of_birth}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Tooltip title="User Rating">
              <div style={{ alignSelf: "center" }}>
                <b>Popularity :</b> {content.popularity}
              </div>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b>
              {" "}
              <div>Biography :</div>
            </b>
            <div>{content.biography}</div>
          </div>
        </div>
      </div>
      <div>
        <Typography
          variant="h5"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            color: "white",
            paddingLeft: "30px",
          }}
        >
          Popular Movies of {content.name}
        </Typography>
        <Carousel />
      </div>
    </div>
  );
};

export default DetailBanner;
