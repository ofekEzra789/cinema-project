const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = 'cinema', collectionName = 'users', collectionFavorite = "favorites";

// login
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
                return res.status(200).send(user);
            }
            // --- user not found
            return res.sendStatus(404);
        });
    });
};

// signUp
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
            // {favorite:[]},
             function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (user) {
                // --- email found 
                console.log(user)
                return res.status(201).send(user);
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

};

// WishList
function favorites(req, res) {
    console.log("/users/favorites is accessed");

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        const queryUser = req.body;
        console.log(req.body)
        
        dbo.collection(collectionFavorite).findOne(queryUser, function (err, favorite) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (favorite) {
                // --- this is post but no document is creatrd so return 200 
                return res.status(200).send(favorite);
            }
            // --- user not found
            return res.sendStatus(404);
        });
    });
};



module.exports.signUp = signUp;
module.exports.login = login;
module.exports.favorites = favorites;