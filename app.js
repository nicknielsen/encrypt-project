//jshint esversion:6
const express = require("express");
const ejs = require("ejs")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/userDB', {useNewURLParser: true});

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

/////MONGOOSE USER SCHEMA/MODEL SETUP
const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);

/////ROOT
app.get("/", (req, res) => {
  res.render("home")
});

/////LOGIN
app.route("/login")

  .get((req, res) => {
    res.render("login")
  })

  .post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const query = User.where({email: username, password: password});

    query.findOne((err, foundUser)=>{
      if (err) console.log(err);
      if (foundUser) res.render("secrets");
    })
  });

/////REGISTER
app.route("/register")

  .get((req, res) => {
    res.render("register")
  })

  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password
    })

    newUser.save().then(res.render("secrets"));
  });

/////LISTEN
app.listen("3000", (req, res) => {
  console.log("Server listening on port 3000.")
})
