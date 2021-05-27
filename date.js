
// module.exports = getDate;
console.log(module);
function getDate(){

    var today = new Date();

    var options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
    var day = today.toLocaleDateString("en-IN", options);
return day;
}
