window.addEventListener('load', () => {
    maskData('data');
    maskHoras('hora');
    maskCpf('cpf')
});

const cpf = document.querySelector("#cpf");
cpf.addEventListener("blur", (event) => {
  if (event.target.value.length == 14) {
    let validar = TestaCPF(event.target.value.replace(/[^\d]/g, ""));
    if (!validar) {
      warningAlert({descricao: "CPF digitado é inválido"});
      event.target.value = "";
    }
  }
});

const btn = document.querySelector("#btn");
btn.addEventListener("click", auditoria);

async function auditoria(event){
    event.preventDefault();
    let mensagem = '';

    const selectServico = document.getElementById('servicos');
    let servico = selectServico.options[selectServico.selectedIndex].value;
    const data = document.querySelector('#data').value;
    const hora = document.querySelector('#hora').value;
    const cpf = document.querySelector('#cpf').value;

    if(!servico){
        mensagem = 'SELECIONE UM SERVIÇO!';
    }else if(!data){
        mensagem = 'INFORME UMA DATA';
    }else if(!hora){
        mensagem = 'INFORME A HORA DO SERVIÇO';
    }else if(!cpf){
        mensagem = 'INFORME O CPF';
    }

    if(mensagem !== '') {
        return warningAlert({ descricao: mensagem });
    }

    const dados = {servico, data, hora, cpf}

    console.log(dados);

    try {
        const servico = await axios.post('/servico/agendamento', dados);
    
        if(servico.data.erro) {
            return warningAlert({
                descricao: servico.data.mensagem
            });
        }
    
        successAlert({
            titulo: servico.data.mensagem
        });
    
        return setTimeout(() => {
            //location.href = `/servicos/${servico.data.idServico}`;
        }, 3000);
    
    } catch (error) {
        return warningAlert({ descricao: error });
    }
}
