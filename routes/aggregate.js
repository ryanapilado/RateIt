module.exports = function (app, mongo) {

// Find the maximum, minimum, and average ratings received by each store
app.get('/aggregate/stores', function (req, res) {
    mongo.getDB().collection('Reviews').aggregate([
        { $group: 
            { _id: "$storeID",
            max: { $max: "$rating" },
            min: { $min: "$rating" },
            avg: {$avg: "$rating" }}
        },
    ],
    function (err, result) {
        var response = { stores:result };
        res.send(response);
    }
    )
});

// Find the maximum, minimum, and average ratings given by user
app.get('/aggregate/users', function (req, res) {
    mongo.getDB().collection('Reviews').aggregate([
        { $group: 
            { _id: "$userID",
            max: { $max: "$rating" },
            min: { $min: "$rating" },
            avg: {$avg: "$rating" }}
        },
    ],
    function (err, result) {
        var response = { users:result };
        res.send(response);
    }
    )
});


}