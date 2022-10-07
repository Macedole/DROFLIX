window.addEventListener('load', () => {
    
    maskCel('telefone');
    maskCpf('cpf');
    maskCep('cep');
    maskData('dataNasc');

    if(document.querySelector("#acao").value === "C"){
        const confirmaSenha = document.querySelector('#confirmaSenha');
        confirmaSenha.addEventListener('blur', event => {
        let senha = document.querySelector('#senha');
        if(senha.value != (event.target.value)){
            warningAlert({ descricao: 'Senhas diferentes' });
            event.target.value = "";
            senha.value = '';
        }
        })
    }

});

const cep = document.querySelector('#cep');
cep.addEventListener('blur', event => pesquisaCep(event.target.value));


const cpf = document.querySelector('#cpf');
cpf.addEventListener('blur', event =>  {

    let validar = TestaCPF(event.target.value.replace(/[^\d]/g, ""));
    if(!validar){
        warningAlert({ descricao: 'CPF digitado é inválido' });
        event.target.value = "";
    }});



const btnCadastro = document.querySelector('#btnCadastro');
btnCadastro.addEventListener('click',validaForm)

async function validaForm(event) {
    event.preventDefault();

    const cpf = document.querySelector('#cpf').value;
    const nome = document.querySelector('#nome').value;
    const dataNasc = document.querySelector('#dataNasc').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value; 
    const cep = document.querySelector('#cep').value;
    const logradouro = document.querySelector('#logradouro').value;
    const numero = document.querySelector('#numResidencial').value;
    const complemento = document.querySelector('#complemento').value;
    const bairro = document.querySelector('#bairro').value;
    const cidade = document.querySelector('#cidade').value;
    const uf = document.querySelector('#uf').value;
    if(document.querySelector("#acao").value === "C"){
    const senha = document.querySelector('#senha').value;
    const confirmaSenha = document.querySelector('#confirmaSenha').value;
    }
    const senha = 1540;
    const confirmaSenha = 1540;
    const receberNotificacao = document.querySelector('#receberNotificacao').checked;
    const acao = document.querySelector('#acao').value;

    let mensagem = '';
    if(!nome) {
        mensagem = 'Preencha o nome corretamente!';
    }else if(!cpf) {
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
    }else if(!senha){
        mensagem = 'Preencha a senha corretamente!';
    }else if(!confirmaSenha){
        mensagem = 'Preencha a senha corretamente!';
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
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        uf,
        cep,
        receberNotificacao
    }
    
    try {
        const cadastro = await axios.post('/cliente', dados);

        if(cadastro.data.erro) {
            return warningAlert({
                descricao: cadastro.data.mensagem
            });
        }
        
        
        successAlert({
            titulo: cadastro.data.mensagem
        });
        return setTimeout(() => {
            location.href = `/cliente/${cadastro.data.idCustomer}`;
        }, 3000);

    } catch (error) {
        return warningAlert({ descricao: error });
    }
}