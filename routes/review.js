module.exports = function(app, mongo) {

// validate the req.body to fit the schema
app.all('/review', function (req, res, next) {

    if (req.body) {
        checkTypes();
    } else {
        next();
    }

    function checkTypes () {
        if (req.body.userID && typeof req.body.userID !== 'string'
        || req.body.storeID && typeof req.body.storeID !== 'string'
        || req.body.comment && typeof req.body.comment !== 'string'
        || parseInt(req.body.rating) && typeof parseInt(req.body.rating) !== 'number'
        || parseInt(req.body.rating) > 10
        || parseInt(req.body.rating) < 1) {
            return res.sendStatus(403);
        } else {
            removeUnknownKeys();
        }
    }

    function removeUnknownKeys () {
        var tempBody = {};
        if (req.body.userID) tempBody.userID = parseInt(req.body.userID);
        if (req.body.storeID) tempBody.storeID = parseInt(req.body.storeID);
        if (req.body.rating) tempBody.rating = parseInt(req.body.rating);
        if (req.body.comment) tempBody.comment = req.body.comment;
        req.body = tempBody;
        next();
    }

});

app.post('/review', function (req, res) {

    // validation
    if (!req.body.userID || !req.body.storeID || !req.body.rating) {
        return res.sendStatus(403);
    } else {
        checkStoreExists();
    }

    // check if a store with the storeID exists
    function checkStoreExists() {
        mongo.getDB().collection('Stores').findOne({
            _id: parseInt(req.body.storeID)
        },
        function (err, existingStore) {
            if (existingStore) {
                checkUserExists();
            } else {
                return res.sendStatus(403);
            }
        }
        );
    }

    // check if a user with the userID exists
    function checkUserExists () {
        mongo.getDB().collection('Users').findOne({
            _id: parseInt(req.body.userID)
        },
        function (err, existingStore) {
            if (existingStore) {
                checkNotExist();
            } else {
                return res.sendStatus(403);
            }
        }
        );
    }

    // check if a review with the userID-storeID pair exists
    function checkNotExist () {
        mongo.getDB().collection('Reviews').findOne({
            userID: parseInt(req.body.userID),
            storeID: parseInt(req.body.storeID)
        },
        function (err, existingReview) {
            if (existingReview) {
                return res.sendStatus(403);
            } else {
                mongo.getAutoIndex('Reviews', insertReview);
            }
        }
        );
    }

    var new_id;

    // insert the review into the collection
    function insertReview (autoIndex) {
        req.body._id = autoIndex;
        new_id = autoIndex;
        if (!req.body.comment) req.body.comment = '';
        mongo.getDB().collection('Reviews').insertOne( 
            req.body,
            function () { findNewReview() }
        );
    }

    function findNewReview () {
        mongo.getDB().collection('Reviews').findOne({
            _id:new_id
        },
        function (err, review) {
            if (!review) {
                return res.sendStatus(404);
            } else {
                return res.status(200).send(review);
            }
        });
    }

});

app.get('/review', function (req, res) {
    if (!req.query) res.sendStatus(400);

    // decide whether to get by ID or by storeID-userID based on user query
    if (req.query.id) {
        getByID();
    } else if (req.query.userid || req.query.storeid) {
        getByStoreOrUser ();
    } else {
        return res.sendStatus(400);
    }

    // find the review with the given ID
    function getByID () {
        mongo.getDB().collection('Reviews').findOne({
            _id:parseInt(req.query.id)
        },
        function (err, review) {
            if (!review) {
                return res.sendStatus(404);
            } else {
                return res.send(review);
            }
        });
    }
    
    // find the review(s) with the given storeID and/or userID
    function getByStoreOrUser () {
        if (!req.query.userid && !req.query.storeid) return res.sendStatus(400);
        queryDoc = {};
        if (req.query.userid) queryDoc.userID = parseInt(req.query.userid);
        if (req.query.storeid) queryDoc.storeID = parseInt(req.query.storeid);
        var result = { reviews:[] };
        mongo.getDB().collection('Reviews').find(
        queryDoc
        ).sort({ _id:1 }).toArray(
        function (err, reviews) {
            result.reviews = reviews;
            return res.send(result);
        }
        );
    }
});

app.delete('/review', function (req, res) {

    if (!req.query) return res.sendStatus(400);

    // decide whether to delete by ID or by storeID-userID based on user query
    if (req.query.id) {
        deleteByID();
    } else if (req.query.storeid || req.query.userid) {
        deleteByStoreOrUser();
    } else {
        return res.sendStatus(400);
    }

    // delete the review with the given ID
    function deleteByID () {
        mongo.getDB().collection('Reviews').deleteOne({
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
    }

    // delete the review(s) with the given storeID and/or userID
    function deleteByStoreOrUser () {
        queryDoc = {};
        if (req.query.userid) queryDoc.userID = parseInt(req.query.userid);
        if (req.query.storeid) queryDoc.storeID = parseInt(req.query.storeid);
        mongo.getDB().collection('Reviews').deleteMany(
        queryDoc,
        function (err, output) {
            if (output.result.n === 0) {
                return res.sendStatus(404);
            } else {
                return res.sendStatus(200);
            }
        }
        );
    }
});

app.put('/review', function (req, res) {

    // validation
    if (!req.query.id) return res.sendStatus(403);
    if (req.body.userID) delete req.body.userID;
    if (req.body.storeID) delete req.body.storeID;

    // handle case where req.body is empty (skip update if nothign to update)
    if (Object.keys(req.body).length === 0) {
        findUpdatedReview()
    } else {
        updateReview();
    }

    // update the review
    function updateReview () {
        mongo.getDB().collection('Reviews').updateOne(
        { _id:parseInt(req.query.id) },
        { $set: req.body },
        function (err, output) {
            if (output.result.n === 0) {
                return res.sendStatus(404);
            } else {
                findUpdatedReview();
            }
        }
        );
    }

    // find and return the updated review
    function findUpdatedReview () {
        mongo.getDB().collection('Reviews').findOne({
        _id:parseInt(req.query.id)
        },
        function (err, review) {
            if (!review) {
                return res.sendStatus(404);
            } else {
                return res.status(200).send(review);
            }
        }
        );
    }

});

}