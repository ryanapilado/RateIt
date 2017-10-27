$(document).ready(function() {

    // view control
    $("input[name=method]").change(updateInputPanel);
    $("input[name=object]").change(updateInputPanel);

    function updateInputPanel () {
        var method = $('input[name=method]:checked').val();
        var obj = $('input[name=object]:checked').val();

        $(".input-panel").hide();
        $("#output").hide();

        switch(method + obj) {
            case 'postuser':
                $("#post-user").show();
                break;
            case 'getuser':
                $("#get-user").show();
                break;
            case 'getalluser':
                $("#get-users").show();
                break;
            case 'deleteuser':
                $("#delete-user").show();
                break;
            case 'putuser':
                $("#put-user").show();
                break;
            case 'poststore':
                $("#post-store").show();
                break;
            case 'getstore':
                $("#get-store").show();
                break;
            case 'deletestore':
                $("#delete-store").show();
                break;
            case 'putstore':
                $("#put-store").show();
                break;
            case 'getallstore':
                $("#get-stores").show();
                break;
            case 'postreview':
                $("#post-review").show();
                break;
            case 'getreview':
                $("#get-review").show();
                break;
            case 'deletereview':
                $("#delete-review").show();
                break;
            case 'putreview':
                $("#put-review").show();
                break;
            case 'getallreview':
                $("#get-reviews").show();
                break;
            case 'aggruser':
                aggregateUser();
                break;
            case 'aggrstore':
                aggregateStore();
                break;
            default:
                break;
        }
    }

    // POST /user
    $("#submit-post-user").click(function () {
        $.ajax({
            url: "/user",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { 
                "username": $("#post-user-username").val(),
                "firstname": $("#post-user-firstname").val(),
                "lastname": $("#post-user-lastname").val(),
                "sex": $("#post-user-sex").val(),
                "age": $("#post-user-age").val()
            } ),
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Failure...') }
            }
        });
    })

    // GET /user
    $("#submit-get-user").click(function () {
        // construct URL from fields
        var queryString = '';
        var username = $("#get-user-username").val();
        var id = $("#get-user-id").val();
        if (username != '') queryString += '&username=' + username;
        if (id != '') queryString += '&id=' + id;
        var url = '/user?' + queryString.slice(1, queryString.length);

        // send ajax request
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) {displayUser(response)},
            statusCode: {
                404: function () {
                    alert('User not found!');
                }
            }
        });

        function displayUser (response) {
            $("#output").show();
            $("#output").html("\
            <p>ID: " + response._id + "</p>\
            <p>Username: " + response.username + "</p>\
            <p>Firstname: " + response.firstname + "</p>\
            <p>Lastname: " + response.lastname + "</p>\
            <p>Sex: " + response.sex + "</p>\
            <p>Age: " + response.age + "</p>\
            ");
        }
    })

    // DELETE /user
    $("#submit-delete-user").click(function () {

        var url = "/user?id=" + $("#delete-user-id").val();

        // send ajax request
        $.ajax({
            url: url,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) {displayUser(response)},
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Please enter an ID') },
                404: function () { alert('User not found!') }
            }
        });
    })

    // PUT /user
    $("#submit-put-user").click(function () {

        var url = "/user?id=" + $("#put-user-id").val();

        $.ajax({
            url: url,
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { 
                "firstname": $("#put-user-firstname").val(),
                "lastname": $("#put-user-lastname").val(),
                "sex": $("#put-user-sex").val(),
                "age": $("#put-user-age").val()
            } ),
            success: function (response) { displayUpdatedUser(response) },
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Failure...') }
            }
        });

        function displayUpdatedUser (response) {
            $("#output").show();
            $("#output").html("\
            <p>ID: " + response._id + "</p>\
            <p>Username: " + response.username + "</p>\
            <p>Firstname: " + response.firstname + "</p>\
            <p>Lastname: " + response.lastname + "</p>\
            <p>Sex: " + response.sex + "</p>\
            <p>Age: " + response.age + "</p>\
            ");
        }
    })

    // GET /users
    $("#submit-get-users").click(function () {
        // construct URL from fields
        var queryString = '';
        var firstname = $("#get-users-firstname").val();
        var lastname = $("#get-users-lastname").val();
        var sex = $("#get-users-sex").val();
        var age = $("#get-users-age").val();
        if (firstname != '') queryString += '&firstname=' + firstname;
        if (lastname != '') queryString += '&lastname=' + lastname;
        if (sex != '') queryString += '&sex=' + sex;
        if (age != '') queryString += '&age=' + age;
        var url = '/users?' + queryString.slice(1, queryString.length);

        // send ajax request
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayUsers(response) },
        });

        function displayUsers (response) {
            $("#output").html("");
            $("#output").show();
            var users = response.users;
            for (var i = 0; i < users.length; i++) {
                $("#output").append("\
                <div class=\"panel panel-default\"> \
                    <p>ID: " + users[i]._id + "</p>\
                    <p>Username: " + users[i].username + "</p>\
                    <p>Firstname: " + users[i].firstname + "</p>\
                    <p>Lastname: " + users[i].lastname + "</p>\
                    <p>Sex: " + users[i].sex + "</p>\
                    <p>Age: " + users[i].age + "</p>\
                </div> \
                ");
            }
        }
    });

    // POST /store
    $("#submit-post-store").click(function () {
        $.ajax({
            url: "/store",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { 
                "storename": $("#post-store-storename").val(),
                "category": $("#post-store-category").val(),
                "address": $("#post-store-address").val()
            } ),
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Failure...') }
            }
        });
    });

    // GET /store
    $("#submit-get-store").click(function () {

        var url = '/store?id=' + $("#get-store-id").val();

        // send ajax request
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayStore(response) },
            statusCode: {
                404: function () { alert('Store not found!') }
            }
        });

        function displayStore (response) {
            $("#output").show();
            $("#output").html("\
            <p>ID: " + response._id + "</p>\
            <p>Storename: " + response.storename + "</p>\
            <p>Category: " + response.category + "</p>\
            <p>Address: " + response.address + "</p>\
            ");
        }
    });

    // DELETE /store
    $("#submit-delete-store").click(function () {

        var url = "/store?id=" + $("#delete-store-id").val();

        // send ajax request
        $.ajax({
            url: url,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayUser(response) },
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Please enter an ID') },
                404: function () { alert('Store not found!') }
            }
        });
    });

    // PUT /store
    $("#submit-put-store").click(function () {

        var url = "/store?id=" + $("#put-store-id").val();

        var storename = $("#put-store-storename").val();
        var category = $("#put-store-category").val();
        var address = $("#put-store-address").val();

        var data = {};
        if (storename != '') data.storename = storename;
        if (category != '') data.category = category;
        if (address != '') data.address = address;

        $.ajax({
            url: url,
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) { displayUpdatedStore(response) },
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Failure...') }
            }
        });

        function displayUpdatedStore (response) {
            $("#output").show();
            $("#output").html("\
            <p>ID: " + response._id + "</p>\
            <p>Storename: " + response.storename + "</p>\
            <p>Category: " + response.category + "</p>\
            <p>Address: " + response.address + "</p>\
            ");
        }
    })

    // GET /stores
    $("#submit-get-stores").click(function () {
        // construct URL from fields
        var queryString = '';
        var category = $("#get-stores-category").val();
        var storename = $("#get-stores-storename").val();
        if (category != '') queryString += '&category=' + category;
        if (storename != '') queryString += '&storename=' + storename;
        var url = '/stores?' + queryString.slice(1, queryString.length);

        // send ajax request
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayStores(response) },
        });

        function displayStores (response) {
            $("#output").html("");
            $("#output").show();
            var stores = response.stores;
            for (var i = 0; i < stores.length; i++) {
                $("#output").append("\
                <div class=\"panel panel-default\"> \
                    <p>ID: " + stores[i]._id + "</p>\
                    <p>Storename: " + stores[i].storename + "</p>\
                    <p>Category: " + stores[i].category + "</p>\
                    <p>Address: " + stores[i].address + "</p>\
                </div> \
                ");
            }
        }
    });

    // POST /review
    $("#submit-post-review").click(function () {
        $.ajax({
            url: "/review",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { 
                "userID": $("#post-review-userid").val(),
                "storeID": $("#post-review-storeid").val(),
                "rating": $("#post-review-rating").val(),
                "comment": $("#post-review-comment").val()
            } ),
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Failure...') }
            }
        });
    });

    // GET /review
    $("#submit-get-review").click(function () {

        var url = '/review?id=' + $("#get-review-id").val();

        // send ajax request
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayReview(response) },
            statusCode: {
                404: function () { alert('Review not found!') }
            }
        });

        function displayReview (response) {
            $("#output").show();
            $("#output").html("\
            <p>ID: " + response._id + "</p>\
            <p>StoreID: " + response.storeID + "</p>\
            <p>UserID: " + response.userID + "</p>\
            <p>Rating: " + response.rating + "</p>\
            <p>Comment: " + response.comment + "</p>\
            ");
        }
    });

    // DELETE /review
    $("#submit-delete-review-1").click(function () {

        // construct URL from fields
        var url = '/review?id=' + $("#delete-review-id").val();

        // send ajax request
        $.ajax({
            url: url,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayUser(response) },
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Please enter an ID') },
                404: function () { alert('Store not found!') }
            }
        });
    });

    // DELETE /review
    $("#submit-delete-review-2").click(function () {

        // construct URL from fields
        var queryString = '';
        var storeid = $("#delete-review-storeid").val();
        var userid = $("#delete-review-userid").val();
        if (storeid != '') queryString += '&storeid=' + storeid;
        if (userid != '') queryString += '&userid=' + userid;
        var url = '/review?' + queryString.slice(1, queryString.length);

        // send ajax request
        $.ajax({
            url: url,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayUser(response) },
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Please enter an ID') },
                404: function () { alert('Store or user not found!') }
            }
        });
    });

    // PUT /review
    $("#submit-put-review").click(function () {

        var url = "/review?id=" + $("#put-review-id").val();

        var rating = $("#put-review-rating").val();
        var comment = $("#put-review-comment").val();

        var data = {};
        if (rating != '') data.rating = rating;
        if (comment != '') data.comment = comment;

        $.ajax({
            url: url,
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) { displayUpdatedReview(response) },
            statusCode: {
                200: function () { alert('Success!') },
                403: function () { alert('Failure...') }
            }
        });

        function displayUpdatedReview (response) {
            $("#output").show();
            $("#output").html("\
            <p>ID: " + response._id + "</p>\
            <p>StoreID: " + response.storeID + "</p>\
            <p>UserID: " + response.userID + "</p>\
            <p>Rating: " + response.rating + "</p>\
            <p>Comment: " + response.comment + "</p>\
            ");
        }
    })

    // GET /reviews
    $("#submit-get-reviews").click(function () {
        // construct URL from fields
        var queryString = '';
        var storeID = $("#get-reviews-storeid").val();
        var userID = $("#get-reviews-userid").val();
        if (storeID != '') queryString += '&storeid=' + storeID;
        if (userID != '') queryString += '&userid=' + userID;
        var url = '/review?' + queryString.slice(1, queryString.length);

        // send ajax request
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayReviews(response) },
        });

        function displayReviews (response) {
            $("#output").html("");
            $("#output").show();
            var reviews = response.reviews;
            for (var i = 0; i < reviews.length; i++) {
                $("#output").append("\
                <div class=\"panel panel-default\"> \
                    <p>ID: " + reviews[i]._id + "</p>\
                    <p>StoreID: " + reviews[i].storeid + "</p>\
                    <p>UserID: " + reviews[i].userid + "</p>\
                    <p>Rating: " + reviews[i].rating + "</p>\
                    <p>Comment: " + reviews[i].comment + "</p>\
                </div> \
                ");
            }
        }
    });

    // Get aggregate user data
    function aggregateUser () {
        $.ajax({
            url: '/aggregate/users',
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayAggregateUsers(response) },
        });

        function displayAggregateUsers(response) {
            $("#output").html("");
            $("#output").show();
            var users = response.users;
            for (var i = 0; i < users.length; i++) {
                $("#output").append("\
                <div class=\"panel panel-default\"> \
                    <p>ID: " + users[i]._id + "</p>\
                    <p>Highest Rating Given: " + users[i].max + "</p>\
                    <p>Lowest Rating Given: " + users[i].min + "</p>\
                    <p>Average Rating Given: " + users[i].avg + "</p>\
                </div> \
                ");
            }
        }
    }

    // Get aggregate store data
    function aggregateStore () {
        $.ajax({
            url: '/aggregate/stores',
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) { displayAggregateStores(response) },
        });

        function displayAggregateStores(response) {
            $("#output").html("");
            $("#output").show();
            var stores = response.stores;
            for (var i = 0; i < stores.length; i++) {
                $("#output").append("\
                <div class=\"panel panel-default\"> \
                    <p>ID: " + stores[i]._id + "</p>\
                    <p>Highest Rating Received: " + stores[i].max + "</p>\
                    <p>Lowest Rating Received: " + stores[i].min + "</p>\
                    <p>Average Rating Received: " + stores[i].avg + "</p>\
                </div> \
                ");
            }
        }
    }
});