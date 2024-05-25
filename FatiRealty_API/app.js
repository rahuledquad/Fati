const http = require("http");
const express = require("express");
//const axios =   require("axios");
const path = require("path");
const morgan = require("morgan");
const timeout = require("connect-timeout");

const { PORT = 8081 } = process.env;
var bodyParser = require("body-parser");
var cors = require("cors");

// create express app, set up json parsing and logging
const app = express();
app.use(timeout("50s"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const TenantRegistrationForm = require("./models/TenantRegistrationForm.js");
const SignUpFrom = require("./models/SignUpFrom.js");

// static assets directory
app.use(express.static(path.join(__dirname, "static")));
// router (homepage)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/Get/testapi", cors(), (req, res) => {
  TenantRegistrationForm.testapi((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      return res.send(data);
    }
  });
});

/////////////////////////////////////SignUp/////////////////////////////////////////////////
app.post("/Post/SignUp", cors(), (req, res) => {
  var userName = req.body.userName;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var dateOfBirth = req.body.dateOfBirth;
  var email = req.body.email;
  var phone = req.body.phone;
  var action = 1;
  SignUpFrom.SignUp(userName, password,firstName, lastName,dateOfBirth,email,phone,action,(err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      return res.send(data);
    }
  });
});

app.post("/Post/Login", cors(), (req, res) => {
  const { userName, password } = req.body;
  SignUpFrom.Login(userName, password, (err, data) => {
      if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(data);
      }
  });
});
/////////////////////////////////////SignUp Closed/////////////////////////////////////////


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  let data = req.body;
});

// create server
const server = http.createServer(app);
server.listen(PORT);
console.debug("...server listening on port " + PORT);
