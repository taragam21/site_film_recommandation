import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';

const Footer = ({ user }) => {
  const useStyles = makeStyles(() => ({
    body: {
      fontFamily: "Montserrat",
    },
    title: {
      color: "white",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
    topDiv:{
      backgroundColor: "#2684AB",
      alignItems: "center",
      marginTop: "9.1rem",
      height: "40vh",
      paddingBlock: "10px",
      display: "flex",
      bottom: "0px",
      width:"100%",
      flexDirection: "row",
      "@media (max-width:780px)": {
        flexDirection: "column",
        marginTop:"3rem",
      height: "70vh",
      },
    }
  }));
  const classes = useStyles();

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  return (
    <Container
    className={classes.topDiv}
      style={{
        paddingTop: 100
      }}
    >
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
          marginTop: -100
        }}
      >
        {user ? (
          <>
            <Typography style={{ color: "white" }}>
              <Button>Hey Wassup {user.name.givenName}</Button>
            </Typography>
          </>
        ) : (
          <Typography style={{ color: "white" }}>
            <Button style={{ color: "white" }} onClick={() => navigate(`/login`)}>Login</Button>
          </Typography>
        )}
        <a
          style={{ textDecoration: "none" }}
          href=""
        >
          <Typography style={{ color: "white" }}>
            <Button style={{ color: "white" }}>About the Developer</Button>
          </Typography>
        </a>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            InputLabelProps={{}}
            id="outlined-search"
            label={<span style={{ color: "white" }}>Search Movies Here...</span>}
            type="search"
            style={{
              marginLeft: 10,
              padding: 0,
              flex: "1",
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            style={{ marginBottom: 15, color: "white", height: "50px" }}
            onClick={() => navigate(`/search/${searchText}`)}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div
        style={{
          flex: 4,
          display: "flex",
          flexDirection: "column",
          marginLeft: -170,
          marginTop: -120
        }}
      >
        {" "}
        <div>
          <Typography
            className={classes.title}
            onClick={() => navigate("/home")}
            variant="h3"
            style={{ color: "white" }}
            align="center"
          >
            Recom.me
          </Typography>
        </div>
        <Typography style={{ marginBlock: "20px", color: "white"}} align="center">
          Connect With Us
        </Typography>
        <div style={{ paddingLeft: 200}}>
            <Button style={{ flex: "1" }} align="center">
          <a style={{ color:"white"}} href="" target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="large" />
          </a>
            </Button>
            <Button style={{ flex: "1" }} align="center">
          <a style={{ color:"white" }} href="https://www.youtube.com/@myUTBM" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon fontSize="large" />
          </a>
            </Button>
            <Button style={{ flex: "1" }} align="center">
          <a style={{ color:"white", padding: 0, margin: 0  }} href="" target="_blank" rel="noopener noreferrer">
              <TwitterIcon fontSize="large" />
          </a>
            </Button>
            <Button style={{ flex: "1" }} align="center">
          <a style={{ color:"white" }} href="https://www.linkedin.com/in/taragam" target="_blank" rel="noopener noreferrer"> 
              <LinkedInIcon fontSize="large" />
          </a>
            </Button>
            <Button style={{ flex: "1" }} align="center">
          <a style={{ color:"white" }} href="https://github.com/taragam21" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="large" />
          </a>
            </Button>
        </div>

      </div>
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "row",
          marginTop: -100,
          color: "white",
          marginBottom: 10,
        }}
      >
        <div >
         <p><HomeIcon  style={{color: "white", padding: 10, marginBottom: -15}}/><b> 5 avenue Winston Churchill</b></p>
         <p><EmailIcon style={{color: "white", padding: 10, marginBottom: -15}}/><b> group3@utbm.fr</b></p>
         <p><CallIcon style={{color: "white", padding: 10, marginBottom: -15}}/><b> 07 89 58 65 23</b></p>
         <p><PrintIcon style={{color: "white", padding: 10, marginBottom: -15}}/><b>+01 245 144 25</b></p>
        </div>
        
      </div>
      
    </Container>
  );        
};

export default Footer;


