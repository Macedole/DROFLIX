window.addEventListener("load", () => {
    maskCpf("cpf");
    maskData("dataNasc");
    maskData("dataNasc");
});

const btn = document.querySelector("#btnCadastro");
btn.addEventListener("click", auditoria);

async function auditoria(event){
    event.preventDefault();

    const servico =  document.querySelector("#idServico").value;
    const dados = {servico}

    try {
        const baixa = await axios.post('/darBaixa', dados);

        if(baixa.data.erro) {
            return warningAlert({
                descricao: baixa.data.mensagem
            });
        }

        successAlert({
            titulo: baixa.data.mensagem
        });

        return setTimeout(() => {
            location.href = `/agendamento`;
        }, 3000);

    } catch (error) {
        return warningAlert({ descricao: error });
    }
}