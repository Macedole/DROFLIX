window.addEventListener('load', () => {
    maskCpf('cpf');
    maskData('dataNasc');
    maskCel('telefone');
    maskCep('cep');
});

if(document.querySelector('#acao').value === 'C') {
    const senha = document.querySelector('#senha');
    senha.addEventListener('keyup', (event) => verificaNivelSenha(event));

    const confirmSenha = document.querySelector('#confirmSenha');
    confirmSenha.addEventListener('blur', validaSenhas);
}

function verificaNivelSenha(event) {
    let keyCode = event.keyCode;
    if(keyCode !== 13 && keyCode !== 16 && keyCode !== 17 && keyCode !== 18 && keyCode !== 20 && keyCode !== 32) {
        let senha = document.querySelector('#senha').value;
        senha = senha.split('');
        const loadSenha = document.querySelector('#loadSenha');
        const labelSenha = document.querySelector('#labelValidadorSenha');
        const nivelSenha = document.querySelector('#nivelSenha');
        let qtdNums = 0;
        let qtdEspeciais = 0;

        const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const carateres = ['!', '@', '#', '$', '%', '&', '?', '_'];

        if(senha.length < 6) {
            loadSenha.style.width = '25%';
            loadSenha.style.backgroundColor = '#ff0000';
            labelSenha.innerText = 'Senha Fraca';
            nivelSenha.value = 0;
        } else {
            numeros.forEach(num => {
                if(senha.indexOf(num) != -1) {
                    qtdNums++;
                }
            });

            carateres.forEach(carac => {
                if(senha.indexOf(carac) != -1) {
                    qtdEspeciais++;
                };
            });

            if(qtdNums === 1 && qtdEspeciais === 0) {
                loadSenha.style.width = '50%';
                loadSenha.style.backgroundColor = '#ffbb00';
                labelSenha.innerText = 'Senha Razoável';
                nivelSenha.value = 1;
            }
            if(qtdNums > 1 && qtdEspeciais == 0) {
                loadSenha.style.width = '75%';
                loadSenha.style.backgroundColor = '#66ff00';
                labelSenha.innerText = 'Senha Boa';
                nivelSenha.value = 2;
            }
            if(qtdNums > 1 && qtdEspeciais > 1) {
                loadSenha.style.width = '100%';
                loadSenha.style.backgroundColor = '#0c564d';
                labelSenha.innerText = 'Senha Ótima';
                nivelSenha.value = 3;
            }
        }
    } else {
        event.preventDefault();
    }
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
    const nivelSenha = acao === 'C' ? document.querySelector('#nivelSenha').value : '';
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
    }else if(acao === 'C' && nivelSenha < 2) {
        mensagem = 'A senha é muito fraca!';
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