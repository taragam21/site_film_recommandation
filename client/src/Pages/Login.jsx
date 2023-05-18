import React from "react";

const Login = () => {

  const google=()=>{
    window.open("http://localhost:5000/auth/google","_self")
  }



  return (
    <div
      style={{
        color: "white",
        marginTop: "88px",
        fontFamily: "Montserrat",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginTop: "50px" }}> Login Via Google </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "150px",
          cursor: "pointer",
        }}
        onClick={google}
      >
        <div
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            borderRadius: "20px 0 0 20px ",
          }}
        >
          <img
            style={{ width: "30px", padding: "5px" }}
            src="https://pngimg.com/uploads/google/google_PNG19630.png"
            alt="google_login"
            srcset=""
          />
        </div>
        <div
          style={{
            width: "190px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            backgroundColor: "#4285F4",
            color: "white",
            borderRadius: "0px 20px 20px 0px ",
          }}
        >
          {" "}
          Google
        </div>
      </div>
    </div>
  );
};

export default Login;
