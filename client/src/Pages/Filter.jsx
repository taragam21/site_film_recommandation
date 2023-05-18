import { Button, Container, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { img_300 } from "../Config/Config";

const Filter = () => {
    const {id,title}=useParams();


    const [content, setContent] = useState([]);
    const fetchTrending = async () => {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&primary_release_year=2015&api_key=b9e11d2c8939104a4a755544e4eb8847`
      );
      setContent(data.results);
      console.log(data.results);
    };
  
    useEffect(() => {
      fetchTrending();
    }, []);
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
          Filtered On <i>"{title}"</i>
        
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
          < Button onClick={() => navigate(`/detail/${c.id}/${c.title}`)}>
          <div style={{ paddingRight: "0.5rem", paddingBlock: "1.5rem" }}>
            <img
              src={`${img_300}/${c.poster_path}`}
              width="100%"
              height="350"
              alt="hello"
            />
            <div>
              <Typography  style={{ color: "white" ,width:"100%" }}>
                
                {`${c.title}`.length > 20 ? (
                  <div>{`${`${c.title}`.substring(0, 20)}...`}</div>
                ) : (
                  <p>{`${c.title}`}</p>
                )}
              </Typography>
            </div>
            <div>
              
            </div>
          </div>
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Filter;
