const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const funcionarioRoutes = require("./routes/funcionario");
const clienteRoutes = require("./routes/cliente");

app.use(shopRoutes);
app.use(authRoutes);
app.use(funcionarioRoutes);
app.use(clienteRoutes);

app.listen(port, () => console.log(`Servidor em execução na porta ${port}...`));
