window.addEventListener('load', () => {
    maskCpf('cpf');
    maskData('dataNasc');
    maskCel('telefone');
    maskCep('cep');
});

const confirmSenha = document.querySelector('#confirmSenha');
confirmSenha.addEventListener('blur', validaSenhas);

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

async function validaForm(event) {
    event.preventDefault();

    const acao = document.querySelector('#acao').value;
    const cpf = document.querySelector('#cpf').value;
    const nome = document.querySelector('#nome').value;
    const dataNasc = document.querySelector('#dataNasc').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const senha = document.querySelector('#senha').value;
    const confirmSenha = document.querySelector('#confirmSenha').value;
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
    }else if(!senha.length < 6) {
        console.log(senha, senha.length);
        mensagem = 'A senha deve possuir pelo menos 6 caracteres!';
    }else if(!confirmSenha) {
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
        const funcionario = await axios.post('/funcionario', dados);

        if(funcionario.data.erro) {
            return warningAlert({
                descricao: funcionario.data.mensagem
            });
        }

        successAlert({
            titulo: funcionario.data.mensagem
        });

        return setTimeout(() => {
            location.href = `/funcionario/${funcionario.data.idFuncionario}`;
        }, 3000);

    } catch (error) {
        return warningAlert({ descricao: error });
    }
}