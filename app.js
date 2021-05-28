const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const mongoose = require('mongoose');

const app = express();


mongoose.connect("mongodb://localhost:27017/newListDB", {useNewUrlParser: true, useUnifiedTopology: true})
app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({  extended: true }));
app.use(express.static("public"));

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);


app.get("/", function(req, res) {

let day = date.getDate();
Item.find({}, function(err, foundItems){

      res.render("list", {listTitle: day, newListItems: foundItems });

 });


});

app.post("/delete", function(req, res){
const checkedItemId = req.body.checkbox;

Item.findByIdAndRemove(checkedItemId , function(err){
  if(!err){
    console.log("Successfully deleted checked items!");
    res.redirect("/");
  }

  });
});
app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work",  newListItems: workItems  });
});
app.get("/about", function(req,res){
  res.render("about");
});

app.post("/", function(req, res) {
  var itemName = req.body.userInput;

 const item = new Item({
   name: itemName
 });
 item.save();
 res.redirect("/");

});


app.listen(3000, function() {
  console.log(`Server running on port 3000: http://localhost:${3000} `);
});
