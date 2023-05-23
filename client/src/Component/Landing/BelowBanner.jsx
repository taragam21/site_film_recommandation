import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const BelowBanner = () => {
  const useStyle = makeStyles(() => ({  
    box: {
      flex: "1",
      padding: "3rem",
      textAlign: "center",
      height: "25rem",
      marginInline: "1rem",
      backgroundColor: "transparent",
      "&:hover": {
        background: "#e2e7e9",
        color: "#2684AB",
        border: "solid 1px transparent",
        boxShadow: "-2px -4px 400px -37px rgba(158,158,158,0.95);",
      },
    },
    topDiv: {
      display: "flex",
      flexDirection: "row",
      margin: "2rem",
      color: "white",
      "@media (max-width:780px)": {
        display: "flex",
        flexDirection: "column",
        margin: "2rem",
        color: "white",
      },
    },
  }));

  const classes = useStyle();

  return (
    <div className={classes.topDiv}>
      <div className={classes.box}>
        <div>
          <a href="https://www.geeksforgeeks.org/machine-learning/" target="_blank">
            <img
              style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
              src="https://acehacker.com/microsoft/engage2022/img/algorithms.png"
              alt=""
              srcset=""
            />
          </a>  
        </div>
        <Typography
          style={{
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "40px",
          }}
        >
          Machine Learning
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "17px",
          }}
        >
          We Use Machine Learning Algorithm To Suggest You Best Movie Based On
          Your Search
        </Typography>
      </div>
      <div className={classes.box}>
        <div>
          <a href="/home">
            <img
              style={{
                objectFit: "cover",
                maxHeight: "0%",
                maxWidth: "72%",
                width: "100%",
              }}
              src="https://blush.design/api/download?shareUri=us0Zf7tSpE3wmqIf&c=Hair_0%7Ec38741-0.2%7E711515-0.3%7Ec38741_Skin_0%7Ec26e5e-0.2%7Ef6cbc3-0.3%7Eecafa3&w=800&h=800&fm=png"
              alt=""
              srcset=""
            />
          </a>  
        </div>
        <Typography
          style={{
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "40px",
          }}
        >
          Features
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "17px",
          }}
        >
          Want to dive in to recommendations, we can't wait to show you. 
        </Typography>
      </div>
    </div>
  );
};

export default BelowBanner;
