//jshint esversion:6
const express = require("express");
const ejs = require("ejs")
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.render("home")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
})



app.listen("3000", (req, res) => {
  console.log("Server listening on port 3000.")
})
