const express = require("express");
const bodyParser = require("body-parser");
let ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

var count = 0;
app.get("/", function(req, res) {
  res.render(__dirname + "/views/index.ejs");
});


app.post("/", function(req, res) {
  const wordsToBeCount = req.body.words;

  function countWords(str) {
    str = str.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
    str = str.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
    str = str.replace(/\n /, "\n"); // exclude newline with a start spacing
    return str.split(' ').length;
  }

  var numberOfWords = countWords(wordsToBeCount);
  count = numberOfWords;

  console.log(numberOfWords);
  res.redirect("/success");

});

app.get("/success", function(req, res) {
  res.render("success", {
    count: count
  });
});

app.listen(3000, function() {
  console.log("server is started on port 3000");
});
