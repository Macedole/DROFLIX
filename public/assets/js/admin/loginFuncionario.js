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
    const funcionario = await axios.post("/funcionario/login", {email, senha});

    if (funcionario.data.erro) {
      return warningAlert({descricao: funcionario.data.mensagem});
    } else {
      location.href = `http://localhost:3000/funcionario/${funcionario.data.id}`;
    }
  } catch (error) {
    warningAlert({descricao: error});
  }
}
