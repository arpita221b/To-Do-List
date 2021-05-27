const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ["A", "B", "C"];
workItems = [];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  var day = today.toLocaleDateString("en-IN", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    newListItems: workItems
  });
});

app.post("/", function(req, res) {
  var item = req.body.userInput;
  console.log(req.body.list);
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
