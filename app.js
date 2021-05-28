const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname +"/date.js");

const app = express();

// const items = [];
// const workItems = [];


app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);


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

const listSchema = {
  name: String,
  items: [itemsSchema ]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

let day = date.getDate();
Item.find({}, function(err,foundItems){
  if(foundItems.length === 0){
    Item.insertMany(defaultItems, function(err){
      if (err) {
        console.log(err);
      }else {
        console.log("Successfully saved default items!");
      }
    });
    res.redirect("/");

  }else{
    res.render("list", {listTitle: day, newListItems: foundItems  });

  }


});
});

app.get("/:customListName", function(req,res){
const customListName = req.params.customListName;

List.findOne({name: customListName}, function(err, foundList){
if(!err){
  if (!foundList) {
    // create a new list
    const list = new List({
      name:customListName,
      items: defaultItems

    });

    list.save();
    res.redirect("/" + customListName);
  }else{
    // show an existing list
    res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
  }
}

});


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
app.post("/delete", function(req, res){
const checkedItem = req.body.checkbox;
Item.findByIdAndRemove(checkedItem, function(err){
  if(!err){
    console.log("Successfully deleted checked item!");
    res.redirect("/");
  }
});
});


app.listen(3000, function() {
  console.log(`Server running on port 3000: http://localhost:${3000} `);
});
