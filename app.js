const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

const shopRoutes = require("./routes/shop");

app.use(shopRoutes);

app.listen(3000);
