const app = require("express")();
const bodyParser = require("body-parser");
const Mailgun = require("mailgun-js");
const port = 1337;

const config = {
  apiKey: "key-820ec8fedd020cd2c1e32edfa345779b",
  domain: "sandbox231ef7c0b0a24a31b509f2e2b3d3e849.mailgun.org"
};

const mailgun = new Mailgun({
  apiKey: config.apiKey,
  domain: config.domain
});

let from = "Some User <nohippies@partyhard.com>";


// set up app to understand json in post requests & route index page to something
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(app.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.send("howdy");
});

// dynamic route of the form /submit/someone@example.com
app.post("/submit", (req, res) => {
  let data = {
    from: req.body.from ? req.body.from : from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html
  };

  mailgun.messages().send(data, (err, body) => {
    if (err){
      console.log(err);
      res.render("error", { error: err });
    }
    else {
      console.log(body);
      res.send("email sent!");
    }
  });
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
