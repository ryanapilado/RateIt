module.exports = function (app, mongo) {

app.get('/users', function (req, res) {

    // assemble the query parameters into a document
    var queryDoc = {};
    if (req.query.firstname) queryDoc.firstname = req.query.firstname;
    if (req.query.lastname) queryDoc.lastname = req.query.lastname;
    if (req.query.age) queryDoc.age = parseInt(req.query.age);
    if (req.query.sex) queryDoc.sex = req.query.sex;

    var retJSON = { users: [] };

    //  find and return all matching users
    mongo.getDB().collection("Users").find(
    queryDoc
    ).sort( {username: 1} ).toArray(
    function (err, users) {
        retJSON.users = users;
        res.status(200).send(retJSON);
    });
});

}