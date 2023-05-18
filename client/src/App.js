import React, { createContext, useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CastDetail from "./Pages/CastDetail";
import Header from "./Component/Header";
import { makeStyles } from '@material-ui/core'
import Footer from "./Component/Footer";
import Detailview from "./Pages/Detailview";
import NotFound from "./Pages/NotFound"
import SearchPages from "./Pages/SearchPages";
import RecomDetailView from "./Pages/RecomDetailView";
import Filter from "./Pages/Filter";
import Landing from "./Pages/Landing";

export const userContext = createContext();


function App() {
  const useStyles = makeStyles(() => ({
    App: {
      display: "flex",
      flexDirection: "column",
    },
    footer: {
      bottom: 0
    }

  }))

  const classes = useStyles();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const [showNav, setShowNav] = useState(true);

  return (
    <BrowserRouter>
      <div className={classes.App}>
        {showNav && <Header user={user} />
        }
        <Routes>

          < Route exact path="/" element={<Landing funcNav={setShowNav} />} />
          < Route exact path="/home" element={<Home />} />
          <Route exact path="/detail/:id/:title" element={<Detailview />} />
          < Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          < Route exact path="/casts/:id" element={<CastDetail />} />
          < Route exact path="/search/:id" element={<SearchPages />} />
          < Route exact path="/recomm/detail/:id/:title" element={<RecomDetailView />} />
          < Route exact path="/filter/:id/:title" element={<Filter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer className={classes.footer} user={user} />


      </div>
    </BrowserRouter>
  );
}

export default App;
