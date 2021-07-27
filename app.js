const express = require("express");
const path = require("path");
const configureRoutes = require("./routes");
const app = express();

// config
const port = 8080;

// templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// serve static assets
app.use(express.static(path.join(__dirname, "public")));

configureRoutes(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
