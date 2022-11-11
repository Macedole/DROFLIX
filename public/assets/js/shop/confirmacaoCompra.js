window.addEventListener("load", () => {
    document.querySelectorAll('.produto').forEach(p => p.children[0].innerText = Number(p.children[0].innerText).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
});

const inputCupom = document.querySelector('#cupom');
inputCupom.addEventListener('blur', event => verificaCupom(event, event.target.value));

async function verificaCupom(event, codigo) {
    event.preventDefault();

    if(codigo.length > 0) {
        try {
            const response = await axios.post('/verifica-cupom', {
                cupom: codigo.toUpperCase()
            });
    
            const listaProdutos = document.querySelectorAll('.produto');
            let novoPreco;
            listaProdutos.forEach(produto => {
                if(produto.dataset.categoria == response.data.cupom.PK_idCategoria) {
                    novoPreco = document.createElement('strong');
                    novoPreco.classList.add('text-success');
                    novoPreco.innerText = `${(Number(produto.dataset.preco) - (Number(produto.dataset.preco) * 0.1)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
                    produto.children[0].innerHTML = `<del class="text-danger me-3">${produto.innerHTML}</del>`;                
                    produto.appendChild(novoPreco);
                    produto.dataset.preco = Number(produto.dataset.preco) - (Number(produto.dataset.preco) * Number(response.data.cupom.desconto));
                }
            });
    
            if(novoPreco) {
                inputCupom.setAttribute('disabled', 'disabled');
                atualizaPrecoFinal();
                successAlert({ titulo: 'Cupom aplicado com sucesso!' });
            } else {
                warningAlert({ descricao: 'Cupom inválido!' });
            }
        } catch (error) {
            console.log(error);
            warningAlert({ descricao: 'Houve um erro ao aplicar o cupom!' });
        }
    }
}

function atualizaPrecoFinal() {
    let total = 0;

    const listaProdutos = document.querySelectorAll('.produto');
    listaProdutos.forEach(produto => {
        total += Number(produto.dataset.preco.replace(',', '.'));
    })
    
    document.querySelector('#precoTotal').innerText = `Total: ${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
}