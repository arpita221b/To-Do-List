const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname +"/date.js");

const app = express();

// const items = [];
// const workItems = [];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({  extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true} );

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "A" });
const item2 = new Item({ name: "B" });
const item3 = new Item({ name: "C" });

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
  if (err) {
    console.log(err);
  }else {
    console.log("Successfully saved default items!");
  }
});

app.get("/", function(req, res) {

let day = date.getDate();
Item.find({}, function(err,foundItems){
  res.render("list", {listTitle: day, newListItems: foundItems  });


});
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
