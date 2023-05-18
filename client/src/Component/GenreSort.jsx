import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate  } from "react-router-dom";

const GenreSort = () => {

    const useStyle = makeStyles(()=>({
            btn:{
                margin:"1.2rem",
                borderRadius:"2rem",
                color:"white",
                border:"solid 1px #97ebf4",
                '&:hover': {
                    background: "#97ebf4",
                    color:"black",
                    border:"solid 1px white",
                 },
            }


    }))
    
    const classes=useStyle();
    const navigate=useNavigate();


    

  return (
    <div  style={{width:"100%",marginTop:"27.1rem",display:"felx",flexDirection:"column" }} >
      <Typography variant='h4' style={{color:"white"}}> Filter on Genres</Typography>
      <div>
        <Button onClick={() => navigate(`/filter/35/Comedy`)} className={classes.btn}>Comedy</Button>
        <Button onClick={() => navigate(`/filter/28/Action`)} className={classes.btn}>Action</Button>
        <Button onClick={() => navigate(`/filter/878/Sci-Fi`)} className={classes.btn}>Sci-Fi</Button>
        <Button onClick={() => navigate(`/filter/18/Drama`)} className={classes.btn}>Drama</Button>
        <Button onClick={() => navigate(`/filter/27/Horror`)} className={classes.btn}>Horror</Button>
        <Button onClick={() => navigate(`/filter/10749/Romance`)} className={classes.btn}>Romance</Button>
        <Button onClick={() => navigate(`/filter/16/Animation`)} className={classes.btn}>Kids</Button>
        <Button onClick={() => navigate(`/filter/9648/Mystery`)} className={classes.btn}>Mystery</Button>
        <Button onClick={() => navigate(`/filter/80/Crime`)} className={classes.btn}>Crime</Button>
        <Button onClick={() => navigate(`/filter/99/Documentry`)} className={classes.btn}>Documentry</Button>
        </div>
    </div>
  )
}

export default GenreSort