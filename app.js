const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Config session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

app.use(cookieParser("zlatanibrahimovic"));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.clienteId = req.session.cliente;
  next();
});

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const funcionarioRoutes = require("./routes/funcionario");
const clienteRoutes = require("./routes/cliente");
const produtoRoutes = require("./routes/produto");
const carrinhoRoutes = require("./routes/carrinho");

app.use(shopRoutes);
app.use(authRoutes);
app.use(funcionarioRoutes);
app.use(clienteRoutes);
app.use(produtoRoutes);
app.use(carrinhoRoutes);

app.listen(port, () => console.log(`Servidor em execução na porta ${port}...`));
