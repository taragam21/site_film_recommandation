import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const TopBanner = () => {
  const useStyle = makeStyles(() => ({
    btn: {
      margin: "1.2rem",
      color: "white",
      border: "solid 1px white",
      backgroundColor: "black",

      "&:hover": {
        background: "#2684AB",
        color: "black",
        border: "solid 1px #2684AB",
      },
    },
    topDiv: {
      height: "34rem",
      backgroundColor: "white",
      marginTop: "5.5rem",
      display: "flex",
      width:"100%",
      flexDirection: "row",
      "@media (max-width:780px)": {
        flexDirection: "column",
        width:"100%",
        height: "68rem",
      },
    },
    bannerImage: {
      
      maxHeight: "90%",
      maxWidth: "90%",
      position : 'relative',
      top : 120,
      right : 0,
      "@media (max-width:780px)": {
        objectFit: "cover",
        maxHeight: "80%",
        maxWidth: "80%",
        position : 'relative',
        top : 10,
        left : 15,
      },
    },
  }));

  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <div>
      <div className={classes.topDiv}>
        <div
          style={{
            flex: 4,
            padding: "4rem",
            paddingTop: "7rem",
            textAlign: "center",
          }}
        >
          <Typography
            style={{
              color: "black",
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: 45
            }}
            variant="h2"
          >
            {" "}
            Movies recommendations
          </Typography>
          <Typography
            style={{
              color: "black",
              fontFamily: "Montserrat",
              fontWeight: "500",
              paddingBlock: "2rem",
            }}
            variant="h5"
          >
            Welcome to our website! As a result of a school project, we uses machine learning to suggest you best movies contained in our dataset
          </Typography>
          <Button onClick={() => navigate(`/home`)} className={classes.btn}>
            Lets get Into Recom.me
          </Button>
        </div>

        <div style={{ flex: 3, display: "inlineblock" }}>
          <a href="https://www.utbm.fr//" target="_blank">
            <img
              className={classes.bannerImage}
              src="https://th.bing.com/th/id/R.5dbb51645344997e9b4d31fb7342e8a0?rik=gKoLAn89%2bqxXyg&riu=http%3a%2f%2fwww.deviensingenieur.fr%2fservlet%2fcom.univ.collaboratif.utils.LectureFichiergw%3fCODE_FICHIER%3d1452530384705%26ID_FICHE%3d3664&ehk=LJgZty%2bGiTkIkAmrm5IAD9Vm0ku5I3cbdtPdbPA8C%2fA%3d&risl=&pid=ImgRaw&r=0"
              alt="utbm"
              srcset=""
            />
          </a>  
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
