import { Button, Container, Typography } from "@material-ui/core";
import { Rating } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { img_300 } from "../Config/Config";

const SearchPages = () => {
  const { id } = useParams();
  const [content, setcontent] = useState([]);

  const fetchSearch = async () => {
    try {
      const { data } = await Axios.get(
        `
            https://api.themoviedb.org/3/search/movie?api_key=b9e11d2c8939104a4a755544e4eb8847&language=en-US&query=${id}&page=1&include_adult=false`
      );
      setcontent(data.results);
      // console.log(data.results);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [id]);

  const navigate = useNavigate();
  return (
    <Container style={{ marginTop: "90px" }}>
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "700",
          color: "white",
          paddingBlock: "32px",
        }}
      >
        Results Based On your search " {id} "
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "justify",
        }}
      >
        {content.map((c) => (
          <Button onClick={() => navigate(`/detail/${c.id}/${c.title}`)}>
            <div style={{ paddingRight: "0.5rem", paddingBlock: "1.5rem" }}>
              <img
                src={`${img_300}/${c.poster_path}`}
                width="100%"
                height="350"
                alt="hello"
              />
              <div>
                <Typography style={{ color: "white", width: "100%" }}>
                  {`${c.title}`.length > 20 ? (
                    <div>{`${`${c.title}`.substring(0, 20)}...`}</div>
                  ) : (
                    <p>{`${c.title}`}</p>
                  )}
                </Typography>
              </div>
              <div>
                <Rating name="read-only" value={c.vote_average / 2} readOnly />
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default SearchPages;
