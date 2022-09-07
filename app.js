const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(shopRoutes);
app.use(authRoutes);

app.listen(port, () => console.log(`Servidor em execução na porta ${port}...`));
