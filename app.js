//


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
//const api = 8355d4acb3e07063a31e5fdea4799f78;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",

      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }

    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/45668ec3b8",
    method: "POST",
    headers: {
      "Authorization": "sam1 8355d4acb3e07063a31e5fdea4799f78-us4"
    },
    body: jsonData

  };

  request(options, function(error, response, body) {
    if (error) {
      res.send("error");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});





app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port Heroku or 3000...");
});

//8355d4acb3e07063a31e5fdea4799f78-us4

//list: 45668ec3b8
