const express = require("express");
const bodyParser = require('body-parser');
// const router = express.Router();
const app = express();
const routeHelper = require('./routeHelper')

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


// SignUp
app.post("/account/users/signUp", (req, res) => {
    routeHelper.signUp(req, res);
});
// Login
app.post("/account/users/login", (req, res) => {
    routeHelper.login(req, res);
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));