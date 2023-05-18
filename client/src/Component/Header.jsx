import {
  AppBar,
  Button,
  makeStyles,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ user }) {
  const [navSize, setnavSize] = useState("5.5rem");
  const [navColor, setnavColor] = useState("#2684AB");
  const [navSearchColor, setnavSearchColor] = useState("#2C98C5");
  const [navTextCol, setNavTextCol] = useState("black");
  const [loginpadding, setLoginpadding] = useState("2.5rem");

  //   *****************Provided On Scroll Effect*****************
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#2C98C5") : setnavColor("#2684AB");
    window.scrollY > 10 ? setnavSize("4.5rem") : setnavSize("5.5rem");
    window.scrollY > 10 ? setNavTextCol("white") : setNavTextCol("black");
    window.scrollY > 10 ? setLoginpadding("1rem") : setLoginpadding("1.9rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  //   ***************** On Scroll Effect Ended*****************

  // ****************************logout functionality starts**********************************

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  // ****************************logout functionality end**********************************

  //**************************Search Part Start***************************************/

  const [searchText, setSearchText] = useState("");
  // const str=searchText

  //**************************Search Part End***************************************/

  const useStyles = makeStyles(() => ({
    body: {
      color: "pink",
    },
    title: {
      //   flex: 1,
      color: "#123d6e",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
      paddingLeft: "10px",
    },
    btn: {
      color: navTextCol,
    },
    cssLabel: {
      color: navTextCol,
      "&.Mui-focused": {
        color: navTextCol,
      },
    },
    multilineColor: {
      color: navTextCol,
      "&.Mui-focused": {
        color: navTextCol,
      },
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: "all 0.5s",
        }}
        elevation={0}
      >
        <Toolbar
          style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 0.5s",
          }}
        >
          <Typography
            className={classes.title}
            onClick={() => navigate("/home")}
            variant="h3"
            style={{ color: navTextCol }}
          >
            Recom.me
          </Typography>

          <TextField
            InputLabelProps={{
              classes: { root: classes.cssLabel, focused: classes.cssFocused },
            }}
            InputProps={{
              className: classes.multilineColor,
            }}

            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setSearchText(e.target.value)
                navigate(`/search/${searchText}`)
              }
            }}

            id="outlined-search"
            label={<><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Search Movies Here...</>}
            type="search"
            style={{
              marginLeft: 500,
              flex: "1",
              color: setNavTextCol,
              backgroundColor: navSearchColor,
              borderRadius: '10% / 50%'
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
          className={classes.btn}
            style={{ marginBottom: 15, color: setNavTextCol, height: "50px" }}
            onClick={() => navigate(`/search/${searchText}`)}
          >
            <SearchIcon />
          </Button>
          {user ? (
            <>
              <Button
                className={classes.btn}
                style={{
                  height:"3rem",
                  marginLeft: "1rem",
                  paddingBlock: loginpadding,
                }}
              >
                <Tooltip title={user.displayName} style={{ fontSize: "300px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <AccountCircleIcon fontSize="large" />
                    </div>
                    <div>
                      <Typography style={{ fontSize: "12px" }}>
                        {user.name.givenName}
                      </Typography>
                    </div>
                  </div>
                </Tooltip>
              </Button>
              <Button
                onClick={logout}
                className={classes.btn}
                style={{
                  height:"3rem",
                  paddingBlock: loginpadding,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <LogoutIcon fontSize="small" />
                  </div>
                  <div>
                    <Typography style={{ fontSize: "8px" }}>Logout</Typography>
                  </div>
                </div>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className={classes.btn}
              style={{
                height: "3rem",
                paddingBlock: loginpadding,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <AccountCircleIcon fontSize="small" />
                </div>
                <div>
                  <Typography>Login</Typography>
                </div>
              </div>
            </Button>
          )}
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </>
  );
}
