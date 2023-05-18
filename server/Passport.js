const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport =require("passport")
const GOOGLE_CLIENT_ID="196569626700-1nbvdd6kfogfmq4kkftoauhc0bs5ktlt.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});