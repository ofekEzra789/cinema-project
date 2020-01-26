const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = 'cinema', collectionName = 'users';
const ObjectId = require('mongodb').ObjectId;

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
            userName: queryUser.userName, email: queryUser.email, password: queryUser.password, confirmPassword: queryUser.confirmPassword
        },
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
        const userId = req.body.userId;
        const favorite = req.body.favorites
        console.log(req.body.userId)

        dbo.collection(collectionName).findOne({ "_id": ObjectId(userId) }, function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (user) {
                if (user.favorites) {
                    const favArray = user.favorites;
                    favArray.push(favorite);
                    console.log('faveArray', favArray);
                    dbo.collection(collectionName).update({ "_id": ObjectId(userId) }, { $set: { "favorites": favArray } })
                    return res.status(200).send(favArray);
                }
                else {
                    console.log(user);
                    dbo.collection(collectionName).update({ "_id": ObjectId(userId) }, { $set: { "favorites": [req.body.favorites] } })
                    return res.status(200).send(favorites);
                }
            } else {
                return res.sendStatus(404);
            }

        });
    });
};
//Get
function getFavorite(req, res) {
    console.log("/users/favoritesList is accessed");

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        const userId = req.params.id;
        console.log(userId)

        dbo.collection(collectionName).findOne({ "_id": ObjectId(userId) }, function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (user) {
                if (user.favorites) {
                    return res.status(200).send(user.favorites);
                }
            } else {
                return res.sendStatus(404);
            }

        });
    });

}
//Delete
function handleDelete(array, req, res) {
    const id = req.params.id;
    // --- check if movie exist , if not send 404
    const index = array.findIndex(item => item.id == id);
    if (index == -1) {
        // --- not found
        res.sendStatus(404);
    }
    else {
        // -- movie found
        array.splice(index, 1);
        res.sendStatus(200);
    }
}

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.favorites = favorites;
module.exports.getFavorite = getFavorite;
module.exports.handleDelete = handleDelete;