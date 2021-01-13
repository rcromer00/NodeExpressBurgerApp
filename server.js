const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8080;


const app = express();

app.use(express.static("public"));

app.use(express.static("../img"));

// app.use("/bootstrap", express.static(_dirname+"/node_modules/bootstrap/dist"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT)
});