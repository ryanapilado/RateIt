module.exports = function (app, mongo) {

// validate the req.body to fit the schema
app.all('/store', function (req, res, next) {

    if (req.body) {
        checkTypes();
    } else {
        next();
    }

    function checkTypes () {
        if (req.body.storename && typeof req.body.storename !== 'string'
        || req.body.category && typeof req.body.category !== 'string'
        || req.body.address && typeof req.body.address !== 'string') {
            return res.sendStatus(400);
        } else {
            removeUnknownKeys();
        }
    }

    function removeUnknownKeys () {
        var tempBody = {};
        if (req.body.storename) tempBody.storename = req.body.storename;
        if (req.body.category) tempBody.category = req.body.category;
        if (req.body.address) tempBody.address = req.body.address;
        req.body = tempBody;
        next();
    }

});

app.post('/store', function (req, res) {

    initStore();

    function initStore () {
        if (!req.body || !req.body.storename || req.body.storename === '') {
            return res.sendStatus(403);
        }
        req.body.category = req.body.category ? req.body.category : '';
        req.body.address = req.body.address ? req.body.address : '';
        mongo.getAutoIndex('Stores', insertStore);
    }

    var new_id;
    function insertStore (autoIndex) {
        new_id = autoIndex;
        req.body._id = autoIndex;
        mongo.getDB().collection('Stores').insertOne( 
            req.body,
            function () { findNewStore () }
        );
    }

    function findNewStore () {
        mongo.getDB().collection('Stores').findOne({
            _id:new_id
        },
        function (err, store) {
            if (!store) {
                return res.sendStatus(404);
            } else {
                return res.status(200).send(store);
            }
        }
        );
    }
});

app.get('/store', function (req, res) {
    if (!req.query) res.sendStatus(400);
    if (!req.query.id) return res.sendStatus(400);
    mongo.getDB().collection('Stores').findOne({
        _id:parseInt(req.query.id)
    },
    function (err, store) {
        if (!store) {
            return res.sendStatus(404);
        } else {
            return res.send(store);
        }
    }
    );
});

app.delete('/store', function (req, res) {
    if (!req.query.id) res.sendStatus(403);
    mongo.getDB().collection('Stores').deleteOne({
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

app.put('/store', function (req, res) {
    if (!req.query.id) return res.sendStatus(403);
    if (req.body._id) delete req.body.id;

    // handle case where req.body is empty
    if (Object.keys(req.body).length === 0) {
        findUpdatedStore()
    } else {
        updateStore();
    }

    function updateStore () {
        mongo.getDB().collection('Stores').updateOne(
        { _id:parseInt(req.query.id) },
        { $set: req.body },
        function (err, output) {
            if (output.result.n === 0) {
                return res.sendStatus(404);
            } else {
                findUpdatedStore();
            }
        }
        );
    }

    function findUpdatedStore () {
        mongo.getDB().collection('Stores').findOne({
        _id:parseInt(req.query.id)
        },
        function (err, store) {
            return res.status(200).send(store);
        }
        );
    }

});

}