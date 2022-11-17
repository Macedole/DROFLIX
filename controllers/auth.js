const modelCliente = require("../models/Cliente.js");
const disparaEmail = require("../public/assets/utils/disparaEmail.js");

const bcrypt = require("bcryptjs");

class AuthController {
  getLogin(req, res) {
    res.render("auth/login", {
      paginaTitulo: "Login",
      isLoggedIn: false
    });
  };

  getCadastro(req, res) {
    res.render("auth/cadastro", {
      paginaTitulo: "Criar conta",
      isLoggedIn: false
    });
  };

  renderRecuperacao(req, res) {
    res.render("auth/recuperar-senha", {
      paginaTitulo: "Recuperação de senha",
      isLoggedIn: false
    });
  }

  async disparaEmail(req, res) {
    const { email } = req.body;

    const cliente = await modelCliente.getCustomer({ campo: 'email', valor: email });

    if(cliente.length == 0) {
      return res.json({ erro: true, mensagem: 'E-mail não localizado em nossa base de dados!' });
    }

    let codigo = '';

    for(let i = 0; i < 6; i++) {
      codigo += Math.floor(Math.random() * 10);
    }

    const codigoVerificacao = await modelCliente.storeCodigoVerificacao({ 
      tabela: 'clientes', 
      id: cliente[0].id_Cliente,
      codigo
    });

    if(codigoVerificacao.affectedRows > 0) {
      const texto = `
        <h1>Olá ${cliente[0].nome}</h1>
        <p>Idenficamos que você solicitou a recuperação de sua senha.</p>
        <p>Para redefinir sua senha, informe o seguinte código na interface de redefinição de senha.</p>
        <h2><span style="color: green">${codigo}</span></h2>
        <p>Caso você não tenha solicitado a recuperação de senha, por gentileza, desconsidere esse e-mail.</p>
        <p>Atenciosamente, </p>
        <p>Suporte Droflix </p>
      `;

      const disparo = await disparaEmail({
        email: cliente[0].email,
        assunto: 'Recuperação de Senha',
        texto
      });

      if (disparo) {
        return res.json({ erro: false, mensagem: `E-mail enviado com sucesso para ${cliente[0].email}` });
      } else {
        return res.json({ erro: true, mensagem: 'Houve um erro ao enviar o e-mail!' });
      }
    } else {
      return res.json({ erro: true, mensagem: 'Houve um erro ao enviar o e-mail!' });
    }
  }

  async verificaCodVerificacao (req, res) {
    const { email, codigo } = req.body;

    const cliente = await modelCliente.getCustomer({ campo: 'email', valor: email });

    if(cliente.length == 0) {
      return res.json({ erro: true, mensagem: 'E-mail não localizado em nossa base de dados!' });
    }

    if(cliente[0].cod_verificacao !== codigo) {
      return res.json({ erro: true, mensagem: 'O código de verificação está incorreto!' });
    }

    return res.json({ erro: false });
  }

  async updateSenha (req, res) {
    const { email, senha } = req.body;

    const cliente = await modelCliente.getCustomer({ campo: 'email', valor: email });

    if(cliente.length == 0) {
      return res.json({ erro: true, mensagem: 'E-mail não localizado em nossa base de dados!' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    const alteracao = await modelCliente.updateSenha( { 
      tabela: 'clientes', 
      id: cliente[0].id_Cliente,
      senha: hash
    });

    if(alteracao.affectedRows > 0) {
      return res.json({ erro: false, mensagem: 'Senha atualizada com sucesso!' });
    }
  }

  async logoff(req, res) {
    req.session.token = '';
    req.idCliente = '';
    req.session.isLoggedIn = '';
    req.session.cliente = '';
    res.redirect('/login');
  }
}

module.exports = new AuthController;