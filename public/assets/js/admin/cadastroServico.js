const btn = document.querySelector("#btnCadastro");

btn.addEventListener("click", auditoria);

async function auditoria(event){
    event.preventDefault();
    let mensagem = '';

    const titulo = document.querySelector('#titulo').value;
    const preco = document.querySelector("#preco").value;
    const duracao = document.querySelector('#duracao').value;
    const url = document.querySelector("#url").value;
    const descricao= document.querySelector("#descricao").value;
    let agenda= document.querySelector("#agendamento");

    if(agenda.checked){
        agenda = document.querySelector("#agendamento").value;
        console.log(agenda +" foi");
    }else{
        agenda = 0;
        console.log(agenda +" não foi");
    }

    if(titulo ==""){
        mensagem = "Preencha o titulo corretamente!";
    }else if(!url) {
        mensagem = 'Informe a url da imagem!';
    }else if(!duracao) {
        mensagem = 'Informe a duração do serviço!';
    }else if(!preco) {
        mensagem = 'Informe o preço do serviço!';
    }else if(!descricao) {
        mensagem = 'Informe uma breve descrição do serviço!';
    }

    if(mensagem !== '') {
        return warningAlert({ descricao: mensagem });
    }

    const dados = {titulo, duracao, agenda, preco, descricao, url}

    //console.log(dados);
    

    try {
        const servico = await axios.post('/servico', dados);

        if(servico.data.erro) {
            return warningAlert({
                descricao: servico.data.mensagem
            });
        }

        successAlert({
            titulo: servico.data.mensagem
        });

        return setTimeout(() => {
            //location.href = `/servico/${produto.data.idProduto}`;
            location.href = `/`;
        }, 3000);

    } catch (error) {
        return warningAlert({ descricao: error });
    }
    
}