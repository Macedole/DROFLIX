window.addEventListener('load', () => {
    maskCpf('cpf');
    maskData('dataNasc');
    maskCel('telefone');
    maskCep('cep');
});

if(document.querySelector('#acao').value === 'C') {
    const confirmSenha = document.querySelector('#confirmSenha');
    confirmSenha.addEventListener('blur', validaSenhas);
}

function validaSenhas() {
    const senha = document.querySelector('#senha');
    if(senha.value !== confirmSenha.value && confirmSenha.value.length > 0) {
        return warningAlert({ descricao: 'As senhas devem ser idênticas!' });
    }
}

const cep = document.querySelector('#cep');
cep.addEventListener('blur', event => pesquisaCep(event.target.value));

const btnCadastro = document.querySelector('#btnCadastro');
btnCadastro.addEventListener('click', validaForm);

var inputNome = document.querySelector("#nome");
nome.addEventListener("keypress", function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});

async function validaForm(event) {
    event.preventDefault();

    const acao = document.querySelector('#acao').value;
    const cpf = document.querySelector('#cpf').value;
    const nome = document.querySelector('#nome').value;
    const dataNasc = document.querySelector('#dataNasc').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const senha = acao === 'C' ? document.querySelector('#senha').value : '';
    const confirmSenha = acao === 'C' ? document.querySelector('#confirmSenha').value : '';
    const cep = document.querySelector('#cep').value;
    const logradouro = document.querySelector('#logradouro').value;
    const numero = document.querySelector('#numero').value;
    const complemento = document.querySelector('#complemento').value;
    const bairro = document.querySelector('#bairro').value;
    const cidade = document.querySelector('#cidade').value;
    const uf = document.querySelector('#uf').value;

    let mensagem = '';
    if(!nome) {
        mensagem = 'Preencha o nome corretamente!';
    }else if(cpf.length < 14) {
        mensagem = 'Preencha o CPF corretamente!';
    }else if(!dataNasc) {
        mensagem = 'Preencha a data de nascimento corretamente!';
    }else if(!email) {
        mensagem = 'Preencha o e-mail corretamente!';
    }else if(!telefone) {
        mensagem = 'Preencha o celular corretamente!';
    }else if(acao === 'C' && senha.length < 6) {
        mensagem = 'A senha deve possuir pelo menos 6 caracteres!';
    }else if(acao === 'C' && !confirmSenha) {
        mensagem = 'Preencha a confirmação da senha corretamente!';
    }else if(!cep) {
        mensagem = 'Preencha o CEP da residência corretamente!';
    }else if(!logradouro) {
        mensagem = 'Preencha o logradouro da residência corretamente!';
    }else if(!numero) {
        mensagem = 'Preencha o numero da residência corretamente!';
    }else if(!bairro) {
        mensagem = 'Preencha o bairro da residência corretamente!';
    }else if(!cidade) {
        mensagem = 'Preencha a cidade da residência corretamente!';
    }else if(!uf) {
        mensagem = 'Preencha o UF da residência corretamente!';
    }

    if(mensagem !== '') {
        return warningAlert({ descricao: mensagem });
    }

    const dados = {
        acao,
        cpf,
        nome, 
        email, 
        dataNasc, 
        telefone,
        senha,
        confirmSenha,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        uf,
        cep
    }

    try {
        disableButton('btnCadastro');
        const funcionario = await axios.post('/funcionario', dados);

        if(funcionario.data.erro) {
            return warningAlert({
                descricao: funcionario.data.mensagem
            });
        }

        enableButton('btnCadastro', 'Salvar');

        successAlert({
            titulo: funcionario.data.mensagem
        });

        return setTimeout(() => {
            location.href = `/funcionario/${funcionario.data.idFuncionario}`;
        }, 3000);

    } catch (error) {
        enableButton('btnCadastro', 'Salvar');
        return warningAlert({ descricao: error });
    }
}