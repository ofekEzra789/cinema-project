const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.send('<h1>hello world</h1>');
});

app.post('/account/users', (req, res) => {
    console.log(req.body);
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));