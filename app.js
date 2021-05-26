const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){

var today = new Date();
var currentDay = today.getDay();
var day = "";

var options = {
  weekday: "long",
  day: "numeric",
  month: "long"
}
var day = today.toLocaleDateString("en-IN", options);

res.render("list", {kindOfDay: day});

});

app.listen(3000, function() {
  console.log(`Server running on port 3000: http://localhost:${3000} `);
});
