const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const routeHelper = require('./routeHelper')

const app = express();
app.use(express.json());
app.use(cors());


// SignUp
app.post("/account/users/signUp", (req, res) => {
    routeHelper.signUp(req, res);
});
// Login
app.post("/account/users/login", (req, res) => {
    routeHelper.login(req, res);
});
// wishList
app.post("/account/users/favorites", (req, res) => {
    routeHelper.favorites(req, res);
});
//Get 
app.get("/account/users/favorites", (req, res) => {

    routeHelper.getFavorite(req, res);
})
//handleDelete
app.delete("/account/users/favorites/:id", (req, res) => {
    routeHelper.handleDelete(routeHelper.favorites, req, res);
})
// Port
const port = 5000 || process.env.PORT ;
app.listen(port, () => console.log(`Listening on port ${port}...`));