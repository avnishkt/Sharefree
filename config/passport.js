const passport = require('passport');
const User = require('../model/person');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8001/auth/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
          .then((currentUser) => {
            if (currentUser) {
              done(null, currentUser);
            } else {
              new User({
                username: profile.displayName,
                isVerified: profile.emails[0].verified,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value,
                googleId: profile.id,
              })
                .save()
                .then((newUser) => {
                  done(null, newUser, { message: 'user created' });
                });
            }
          })
          .catch((err) => {
            // Handle any errors that occurred during the query
            done(err, null);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
