
require("dotenv").config()

const passport = require("passport");

const UserModel = require("../DB/user.model");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({

  clientID: process.env.googleclientid,
  clientSecret: process.env.googleclientsecret,
  callbackURL: "http://localhost:3000/auth/google/callback"

},

  async function (accessToken, refreshToken, profile, cb) {

    try {

      let Email = profile._json.email

      console.log(Email, profile._json.name)

      const user = await UserModel.findOne({ Email })

      console.log(user)

      if (!user) {

        console.log("adding new user")

        let newuser = new UserModel({

          Email,
          Name: profile._json.name

        })

        await newuser.save()

        return cb(null, newuser)

      }

      else {

        console.log("user is present db")

        return cb(null, user)

      }
    }
    catch (error) {

      console.log(error)

    }

    //console.log(profile)

  }

));




module.exports = { passport }
