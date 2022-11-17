const btnRecuperacao = document.querySelector('#btnRecuperacao');
btnRecuperacao.addEventListener('click', event => validaForm(event));

async function validaForm(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;

    if(!email) {
        return warningAlert({ descricao: 'O e-mail é de preenchimento obrigatório!' });
    }

    try {
        disableButton('btnRecuperacao');

        const response = await axios.post("/recuperacao-senha", { email });
    
        enableButton('btnRecuperacao', 'Receber código novamente');

        if (response.data.erro) {
          return warningAlert({
            descricao: response.data.mensagem
          });
        }
    
        successAlert({
          titulo: response.data.mensagem,
        });

        exibeCampoCodigo()
        
      } catch (error) {
        enableButton('btnRecuperacao', 'Receber código de verificação');
        return warningAlert({descricao: error});
      }
}

const codigos = document.querySelectorAll('.codigo');
codigos.forEach(codigo => codigo.addEventListener('keyup', event => manipulaCodigos(event.target.id, event)));

function manipulaCodigos(campo, event) {
    let keyCode = event.keyCode;
    if(keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
        document.querySelector(`#${campo}`).style.border = 'solid 2px #0c564d';
        if(campo != 'codigo6') {
            const proxCampo = Number(campo.replace('codigo', '')) + 1;
            document.querySelector(`#codigo${proxCampo}`).focus();
        }
    } else if(keyCode == 8) {
        if(campo != 'codigo1') {
            const campoAnterior = Number(campo.replace('codigo', '')) - 1;
            document.querySelector(`#codigo${campoAnterior}`).value = '';
            document.querySelector(`#codigo${campoAnterior}`).focus();
        }
    } else {
        document.querySelector(`#${campo}`).value = '';
    }
}

function exibeCampoCodigo() {
    document.querySelector('#email').setAttribute('readonly', 'readonly');
    document.querySelector('#areaCodigos').classList.remove('d-none');
    document.querySelector('#btnConfirmacao').classList.remove('d-none');
}

const btnConfirmacao = document.querySelector('#btnConfirmacao');
btnConfirmacao.addEventListener('click', event => confirmaCodigo(event));

async function confirmaCodigo(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;

    let codigoVerificacao = '';
    const codigos = document.querySelectorAll('.codigo');
    codigos.forEach(codigo => codigoVerificacao += codigo.value);

    if(codigoVerificacao.length < 6) {
        return warningAlert({descricao: 'O código de verificação deve conter 6 caracteres!'});
    }

    try {
        disableButton('btnConfirmacao');

        const response = await axios.post("/recuperacao-senha/verificacao", { email, codigo: codigoVerificacao });
    
        enableButton('btnConfirmacao', 'Confirmar Código');

        if (response.data.erro) {
          return warningAlert({
            descricao: response.data.mensagem
          });
        }

        exibeCampoSenhas();
    } catch (error) {
        enableButton('btnConfirmacao', 'Confirmar Código');
        return warningAlert({descricao: error});
    }
}

function exibeCampoSenhas() {
    document.querySelector('#areaCodigos').classList.add('d-none');
    document.querySelector('#btnConfirmacao').classList.add('d-none');
    document.querySelector('#btnRecuperacao').classList.add('d-none');

    document.querySelector('#areaSenhas').classList.remove('d-none');
    document.querySelector('#btnConfirmacaoSenhas').classList.remove('d-none');
}

const senha = document.querySelector('#senha');
senha.addEventListener('keyup', (event) => verificaNivelSenha(event));

const confirmSenha = document.querySelector('#confirmSenha');
confirmSenha.addEventListener('blur', validaSenhas);

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

const btnConfirmacaoSenhas = document.querySelector('#btnConfirmacaoSenhas');
btnConfirmacaoSenhas.addEventListener('click', event => atualizaSenha(event));

async function atualizaSenha(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const confirmSenha = document.querySelector('#confirmSenha').value;
    const nivelSenha = document.querySelector('#nivelSenha').value;

    let mensagem = '';
    if(senha.length < 6) {
        mensagem = 'A senha deve possuir pelo menos 6 caracteres!';
    }else if(!confirmSenha) {
        mensagem = 'Preencha a confirmação da senha corretamente!';
    }else if(nivelSenha < 2) {
        mensagem = 'A senha é muito fraca!';
    }

    if(mensagem.length > 0) {
        return warningAlert({ descricao: mensagem });
    }
    
    try {
        disableButton('btnConfirmacaoSenhas');

        const response = await axios.post("/alteracao-senha", { email, senha });
    
        enableButton('btnConfirmacaoSenhas', 'Alterar Senha');

        if (response.data.erro) {
            return warningAlert({
                descricao: response.data.mensagem
            });
        }

        successAlert({
            titulo: response.data.mensagem,
        });

        return setTimeout(() => {
            location.href = `/login`;
          }, 3000);
    } catch (error) {
        enableButton('btnConfirmacaoSenhas', 'Alterar Senha');
        return warningAlert({descricao: error});
    }
}