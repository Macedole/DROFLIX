window.addEventListener("load", () => {
    maskPercent('desconto');
});

const botaoCadastro = document.querySelector('#btnCadastro');
botaoCadastro.addEventListener('click', event => validaForm(event));

async function validaForm(event) {
    event.preventDefault();

    const codigo = document.querySelector('#codigo').value;
    const desconto = document.querySelector('#desconto').value;
    const idCategoria = document.querySelector('#categoria').value;

    if(!codigo) {
        return warningAlert({ descricao: 'Preencha corretamente o código do cupom!' });
    } else if(desconto.length == 1) {
        return warningAlert({ descricao: 'Preencha corretamente a porcentagem de desconto do cupom!' });
    }

    const dados = {
        codigo,
        desconto,
        idCategoria
    }

    try {
        disableButton('btnCadastro');

        const cupom = await axios.post('/cupom', dados);

        enableButton('btnCadastro', 'Cadastrar');

        if(cupom.data.erro) {
            return warningAlert({
                descricao: cupom.data.mensagem
            });
        }

        successAlert({
            titulo: cupom.data.mensagem
        });

        return setTimeout(() => {
            location.href = `/cupons`;
        }, 3000);

    } catch (error) {
        enableButton('btnCadastro', 'Salvar');
        return warningAlert({ descricao: error });
    }
}

const btnExclusao = document.querySelectorAll('.btnExclusao');
btnExclusao.forEach(btn => btn.addEventListener('click', () => manipulaCupom(btn.dataset.cupom, btn.dataset.acao)));

const btnAtivar = document.querySelectorAll('.btnAtivar');
btnAtivar.forEach(btn => btn.addEventListener('click', () => manipulaCupom(btn.dataset.cupom, btn.dataset.acao)));

async function manipulaCupom(idCupom, acao) {
    confirmAlert({
        descricao: `Você deseja realmente ${acao} esse cupom?`,
        labelBotao: 'Sim',
        idRegistro: idCupom
    }, 
    async () => {
        try {
            const cupom = await axios.patch('/cupom', { idCupom, acao });
    
            if(cupom.data.erro) {
                return warningAlert({
                    descricao: cupom.data.mensagem
                });
            }
    
            successAlert({
                titulo: cupom.data.mensagem
            });
    
            return setTimeout(() => {
                location.href = `/cupons`;
            }, 3000);
    
        } catch (error) {
            return warningAlert({ descricao: error });
        }
    });
}