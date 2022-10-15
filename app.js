const express = require("express");
const path = require("path");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Config session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use(cookieParser('zlatanibrahimovic'));

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const funcionarioRoutes = require("./routes/funcionario");
const clienteRoutes = require("./routes/cliente");
const produtoRoutes = require("./routes/produto");

app.use(shopRoutes);
app.use(authRoutes);
app.use(funcionarioRoutes);
app.use(clienteRoutes);
app.use(produtoRoutes);

app.listen(port, () => console.log(`Servidor em execução na porta ${port}...`));
