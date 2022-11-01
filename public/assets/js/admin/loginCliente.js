const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", (event) => validaForm(event));

async function validaForm(event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  if (!email) {
    return warningAlert({descricao: "Preencha o e-mail corretamente!"});
  }

  if (senha.length < 6) {
    return warningAlert({descricao: "A senha deve possuir pelo menos 6 caracteres!"});
  }

  try {
    const cliente = await axios.post("/cliente/login", {email, senha});

    if (cliente.data.erro) {
      return warningAlert({descricao: cliente.data.mensagem});
    } else {
      location.href = `http://localhost:3000/`;
    }
  } catch (error) {
    warningAlert({descricao: error});
  }
}
