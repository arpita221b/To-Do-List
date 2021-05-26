const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){

var today = new Date();
var currentDay = today.getDay();
var day = "";

switch(currentDay){
  case 0:
  day = "Sunday";break;
case 1:
  day = "Monday";
break;
  case 2:
  day = "TuesDay";
  break;
  case 3:
  day = "Wednessday";
  break;
  case 4:
  day = "Thursday";
  break;
  case 5:
  day = "Friday";
  break;
  case 6:
    day = "Saturday";
  break;
  default:
  console.log("Errpr: current day is equal to:" + currentDay);
  }
res.render("list", {kindOfDay: day});

});

app.listen(3000, function() {
  console.log(`Server running on port 3000: http://localhost:${3000} `);
});
