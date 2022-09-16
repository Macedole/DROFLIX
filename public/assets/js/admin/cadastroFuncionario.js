window.addEventListener('load', () => {
    maskCpf('cpf');
    maskData('dataNasc');
    maskCel('telefone');
    maskCep('cep');
    maskMoney('salario');
});

const cep = document.querySelector('#cep');
cep.addEventListener('blur', event => pesquisaCep(event.target.value));

const btnCadastro = document.querySelector('#btnCadastro');
btnCadastro.addEventListener('click', validaForm);

async function validaForm(event) {
    event.preventDefault();

    const cpf = document.querySelector('#cpf').value;
    const nome = document.querySelector('#nome').value;
    const dataNasc = document.querySelector('#dataNasc').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const cargo = document.querySelector('#cargo').value;
    const departamento = document.querySelector('#departamento').value;
    const cep = document.querySelector('#cep').value;
    const logradouro = document.querySelector('#logradouro').value;
    const numero = document.querySelector('#numero').value;
    const complemento = document.querySelector('#complemento').value;
    const bairro = document.querySelector('#bairro').value;
    const cidade = document.querySelector('#cidade').value;
    const uf = document.querySelector('#uf').value;
    const salario = document.querySelector('#salario').value;

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
    }else if(!cargo) {
        mensagem = 'Preencha o cargo corretamente!';
    }else if(!salario) {
        mensagem = 'Preencha o salário corretamente!';
    }

    if(mensagem !== '') {
        return warningAlert({ descricao: mensagem });
    }

    const dados = {
        cpf: cpf, 
        nome: nome, 
        email: email, 
        dataNasc: dataNasc, 
        telefone: telefone, 
        cargo: cargo, 
        departamento: departamento,
        salario: salario,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        complemento: complemento,
        cidade: cidade,
        uf: uf,
        cep: cep
    }

    try {
        const funcionario = await axios.post('/funcionario', dados);

        if(funcionario.data.erro) {
            return warningAlert({
                descricao: funcionario.data.mensagem
            });
        }

        return successAlert({
            titulo: funcionario.data.mensagem
        });

    } catch (error) {
        return warningAlert({ descricao: error });
    }
}