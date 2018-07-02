const app = require("express")();
const bodyParser = require("body-parser");
const Mailgun = require("mailgun-js");
const twilio = require("twilio")("ACd74eaa07213fb7ebcfb142b597bccd2f", "8f593b438c35c95ec7068e3143bbbd73");
const mailgun = new Mailgun({
  apiKey: "key-820ec8fedd020cd2c1e32edfa345779b",
  domain: "sandbox231ef7c0b0a24a31b509f2e2b3d3e849.mailgun.org"
});
const port = 1337;



// set up app to understand json in post requests & route index page to something
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {

  let mgData = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html
  };

  twilio.messages.create({
    from: "+442380000598",
    to: "+447805031421",
    body: req.body.html
  }).then((message) => {
    console.log(message);
    res.send("message sent!");
  });

  mailgun.messages().send(mgData, (err, body) => {
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
