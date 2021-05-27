const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");

const app = express();
var items = ["A", "B", "C"];
workItems = [];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({  extended: true }));
app.use(express.static("public"));


app.get("/", function(req, res) {

let day = date.getDate();




  res.render("list", {listTitle: day, newListItems: items  });

});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work",  newListItems: workItems  });
});
app.get("/about", function(req,res){
  res.render("about");
});

app.post("/", function(req, res) {
  var item = req.body.userInput;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});


app.listen(3000, function() {
  console.log(`Server running on port 3000: http://localhost:${3000} `);
});
