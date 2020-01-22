const express = require("express");
const bodyParser = require('body-parser');
// const router = express.Router();
const app = express();
const routeHelper = require('./routeHelper')

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


// New code
app.post("/account/users/signUp", (req, res) => {
    routeHelper.signUp(req, res);
});
app.post("/account/users/login", (req, res) => {
    routeHelper.login(req, res);
});

// Data base
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/cinema";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("cinema");
//     app.get('/', (req, res) => {
//         res.send('"hii');
//     });

//     app.post('/account/users', (req, res) => {
//         console.log(req.body);
//         dbo.collection("users").insertOne(req.body, (err, user)=>{
//             if (err) {
//                 console.log(err);
//                 res.send("there is some issue");
//             }
//             res.send(user);
//         })
//     });
// });

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));