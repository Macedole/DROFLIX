window.addEventListener('load', () => {
    maskData('dtLote');
    maskMoney('preco');
    let ctgrs = document.querySelector('#categorias').value;
    if(ctgrs != 1){
        document.getElementById('drug').style.display = "none";
    }
    
});


const exibe = document.querySelector('#categorias');
exibe.addEventListener('blur', event => oculta_exibe(event.target.value));
function oculta_exibe(){
    let ctgrs = document.querySelector('#categorias').value;
    if(ctgrs != 1){
        document.getElementById('drug').style.display = "none";
    }else{
        document.getElementById('drug').style.display = "flex";
    }
}

const btn = document.querySelector("#btnCadastro");

btn.addEventListener("click", auditoria);

let inputNome = document.querySelector("#nome");
nome.addEventListener("keypress", function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});

async function auditoria(event){
    event.preventDefault();

    const acao = document.querySelector('#acao').value;
    const nome = document.querySelector("#nome").value;
    const url = document.querySelector("#imagem").value;
    const preco = document.querySelector("#preco").value;
    const qtd = document.querySelector("#qtd").value;
    const nLote= document.querySelector("#nLote").value;
    const dtLote= document.querySelector("#dtLote").value;
    const descricao= document.querySelector("#descricao").value;
    const selectCate = document.getElementById('categorias');
    const categoria = selectCate.options[selectCate.selectedIndex].value;
    const selectTarja = document.getElementById('tarja');
    let tarja = selectTarja.options[selectTarja.selectedIndex].value;
    const selectLoja = document.getElementById('loja');
    const loja = selectLoja.options[selectLoja.selectedIndex].value;
    
    
    

    let mensagem = ""

    if(nome ==""){
       mensagem = "Preencha o nome corretamente!";
    }else if(!url) {
        mensagem = 'Informe o nome da imagem!';
    }else if(categoria == 0) {
        mensagem = 'Informe a categoria do produto!';
    }else if(!preco) {
        mensagem = 'Informe o preço do produto!';
    }else if(!qtd) {
        mensagem = 'Informe a quantidade de produtos do lote!';
    }else if(!nLote) {
        mensagem = 'Informe o número de identificação do lote!';
    }else if(!dtLote) {
        mensagem = 'Informe a data de vencimento do lote!';
    }else if(!descricao) {
        mensagem = 'Informe uma descrição!';
    }else if(categoria == 1){
        if(tarja == 0){
            mensagem = 'Informe a classificação da tarja do medicamento!';
        }
    }else if(tarja == 0){
        tarja = 4;   
    }
     
    if(loja == 0){
        mensagem = 'Informe a loja responsável!!';
    }


    if(mensagem !== '') {
        return warningAlert({ descricao: mensagem });
    }

    const dados = {acao, nome, categoria, preco, qtd, nLote, dtLote, descricao, url, tarja, loja}

    try {
        const produto = await axios.post('/produto', dados);

        if(produto.data.erro) {
            return warningAlert({
                descricao: produto.data.mensagem
            });
        }

        successAlert({
            titulo: produto.data.mensagem
        });

        return setTimeout(() => {
            //location.href = `/produto/${produto.data.idProduto}`;
            location.href = `/`;
        }, 3000);

    } catch (error) {
        return warningAlert({ descricao: error });
    }
}