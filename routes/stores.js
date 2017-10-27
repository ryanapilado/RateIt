module.exports = function (app, mongo) {

app.get('/stores', function (req, res) {

    // assemble the query parameters into a document
    var queryDoc = {};
    if (req.query.storename) queryDoc.storename = req.query.storename;
    if (req.query.category) queryDoc.category = req.query.category;

    var retJSON = { stores: [] };

    // find and return all matching stores
    mongo.getDB().collection("Stores").find(
    queryDoc
    ).sort({ storename:1, _id:1}).toArray(
    function (err, stores) {
        retJSON.stores = stores;
        res.status(200).send(retJSON);
    });
});

}