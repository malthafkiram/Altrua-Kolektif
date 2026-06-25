const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const router = require("./routes/router");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: "altrua-kolektif-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  }),
);

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
