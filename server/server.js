const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const request = require("request")

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
  );
  app.use("/auth", authRoute);

// app.get('/:id', function (req, res) {
app.get('/recomm/:id', function (req, res) {
  // const { id } = useParams();

  // request(`http://127.0.0.1:5000/movie/Hulk`, function (error, response, body) {
  request(`http://127.0.0.1:5000/movie/` + req.params.id, function (error, response, body) {
    console.error('error:', error); // Print the error
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the data received
    res.send(body); //Display the response on the website
  });
});



app.listen("5000", () => {
  console.log("Server is running! on PORT 5000");
});