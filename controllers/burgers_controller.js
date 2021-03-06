// import the following: express & burger.js
var express = require("express");
var burger = require("../models/burger.js");


// 4. Create the `router` for the app, and export the `router` at the end of your file.
var router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
    });
});

router.post("/api/burgers",function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    
    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete(
    "/api/burgers/:id", function(req, req) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if ( result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;