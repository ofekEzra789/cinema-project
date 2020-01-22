const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = 'cinema', collectionName = 'users';


function login(req, res) {
    console.log("/users/login is accessed");

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);

        // --- expecting email , passeord
        const queryUser = req.body;

        dbo.collection(collectionName).findOne(queryUser, function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (user) {
                // --- this is post but no document is creatrd so return 200 
                return res.sendStatus(200);
            }
            // --- user not found
            return res.sendStatus(404);
        });
    });
};


function signUp(req, res) {

    console.log("/users/signUp is accessed");

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const dbo = db.db(dbName);
        // --- expecting email , password...
        const queryUser = req.body;

        dbo.collection(collectionName).findOne({ 
            userName:queryUser.userName, email:queryUser.email, password:queryUser.password, confirmPassword:queryUser.confirmPassword },
             function (err, userFound) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (userFound) {
                // --- email found 
                return res.sendStatus(400);
            }

            // --- no email match --> insert user
            dbo.collection(collectionName).insertOne(queryUser, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(201);
            });

        });
    });

}

module.exports.signUp = signUp;
module.exports.login = login;