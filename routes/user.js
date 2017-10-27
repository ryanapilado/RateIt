module.exports = function (app, mongo) {

// validate the req.body to fit the schema
app.all('/user', function (req, res, next) {

    if (req.body) {
        checkTypes();
    } else {
        next();
    }

    function checkTypes () {
        if (req.body.username && typeof req.body.username !== 'string'
        || req.body.lastname && typeof req.body.lastname !== 'string'
        || req.body.firstname && typeof req.body.firstname !== 'string'
        || req.body.sex && typeof req.body.sex !== 'string'
        || parseInt(req.body.age) && typeof parseInt(req.body.age) !== 'number') {
            return res.sendStatus(400);
        } else {
            removeUnknownKeys();
        }
    }

    function removeUnknownKeys () {
        var tempBody = {};
        if (req.body.username) tempBody.username = req.body.username;
        if (req.body.lastname) tempBody.lastname = req.body.lastname;
        if (req.body.firstname) tempBody.firstname = req.body.firstname;
        if (req.body.sex) tempBody.sex = req.body.sex;
        if (req.body.age) tempBody.age = parseInt(req.body.age);
        req.body = tempBody;
        next();
    }

});

app.post('/user', function (req, res) {

    initUser();

    // set up given values and default values
    function initUser () {
        if (!req.body.username) return res.sendStatus(403);
        req.body.firstname = req.body.firstname ? req.body.firstname : '';
        req.body.lastname = req.body.lastname ? req.body.lastname : '';
        req.body.sex = req.body.sex ? req.body.sex : '';
        req.body.age = req.body.age ? req.body.age : 0;
        checkNotExist();
    }

    // check that a user with the username does not exist
    function checkNotExist () {
        mongo.getDB().collection('Users').findOne({
            username: req.body.username
        },
        function (err, existingUser) {
            if (existingUser) {
                return res.sendStatus(403);
            } else {
                mongo.getAutoIndex('Users', insertUser);
            }
        }
        );
    }

    var new_id;
    // insert the new user into the collection
    function insertUser (autoIndex) {
        new_id = autoIndex;
        req.body._id = autoIndex;
        mongo.getDB().collection('Users').insertOne( 
            req.body,
            function () {
                findNewUser();
            }
        );
    }

    function findNewUser () {
        mongo.getDB().collection('Users').findOne(
        { _id:new_id },
        function (err, user) {
            if (!user) {
                return res.sendStatus(404);
            } else {
                return res.status(200).send(user);
            }
        }
        );  
    }
});

app.get('/user', function (req, res) {

    // validation and setup
    if (!req.query) return res.sendStatus(400);
    if (!req.query.id && !req.query.username) return res.sendStatus(400);
    queryDoc = {};
    if (req.query.username) queryDoc.username = req.query.username;
    if (req.query.id) queryDoc._id = parseInt(req.query.id);

    // retrieve the user
    mongo.getDB().collection('Users').findOne(
    queryDoc,
    function (err, user) {
        if (!user) {
            return res.sendStatus(404);
        } else {
            return res.send(user);
        }
    }
    );
});

app.delete('/user', function (req, res) {
    if (!req.query.id) return res.sendStatus(400);
    mongo.getDB().collection('Users').deleteOne({
        _id:parseInt(req.query.id)
    },
    function (err, result) {
        if (result.deletedCount === 0) {
            return res.sendStatus(404);
        } else {
            return res.sendStatus(200);
        }
    }
    );
});

app.put('/user', function (req, res) {

    // validation
    if (!req.query.id) return res.sendStatus(403);
    if (req.body.username) delete req.body.username;
    if (req.body._id) delete req.body.id;

    // // I wanted to use this but it wouldn't work for me
    // mongo.getDB().collection('Users').findAndModify({
    // query: { _id:parseInt(req.query.id) },
    // update: {$set: req.body},
    // new: true
    // },
    // function (err, user) {
    //     console.log(err);
    //     if (!user) {
    //         return res.sendStatus(404);
    //     } else {
    //         return res.status(200).send(user);
    //     }
    // }
    // );

    // handle case where req.body is empty (skip update if nothing to update)
    if (Object.keys(req.body).length === 0) {
        findUpdatedUser()
    } else {
        updateUser();
    }

    // update the user
    function updateUser () {
        mongo.getDB().collection('Users').updateOne(
        { _id:parseInt(req.query.id) },
        { $set: req.body },
        function (err, output) {
            if (output.result.n === 0) {
                return res.sendStatus(404);
            } else {
                findUpdatedUser();
            }
        }
        );
    }

    // find the updated user
    function findUpdatedUser () {
        mongo.getDB().collection('Users').findOne({
        _id:parseInt(req.query.id)
        },
        function (err, user) {
            if (!user) {
                return res.sendStatus(404);
            } else {
                return res.status(200).send(user);
            }
        }
        );
    }

});

}
