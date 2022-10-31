window.addEventListener('load', () => {
    maskMoney('preco');
    maskHoras('duracao');
});

const btn = document.querySelector("#btnCadastro");
btn.addEventListener("click", auditoria);

let Titulo = document.querySelector("#titulo");
Titulo.addEventListener("keypress", function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});


async function auditoria(event){
    event.preventDefault();
    let mensagem = '';

    const servicoId = document.querySelector('#idServico').value;
    const acao = document.querySelector('#acao').value;
    const titulo = document.querySelector('#titulo').value;
    const preco = document.querySelector("#preco").value;
    const duracao = document.querySelector('#duracao').value;
    const url = document.querySelector("#url").value;
    const descricao= document.querySelector("#descricao").value;
    let agenda= document.querySelector("#agendamento");

    if(agenda.checked){
        agenda = document.querySelector("#agendamento").value;
    }else{
        agenda = 0;
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

    const dados = {servicoId, acao, titulo, duracao, agenda, preco, descricao, url}
    

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
            location.href = `/servicos/${servico.data.idServico}`;
        }, 3000);

    } catch (error) {
        return warningAlert({ descricao: error });
    }
    
}