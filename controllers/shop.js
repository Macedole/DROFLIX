// DADOS PARA TESTE
const produtosPromocao = [
  {
    titulo: "Desodorante",
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    precoAnterior: 19.99,
    precoAtual: 9.99,
  },
  {
    titulo: "Fralda",
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    precoAnterior: 36.99,
    precoAtual: 25.99,
  },
  {
    titulo: "Lenço umedecido",
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    precoAnterior: 21.99,
    precoAtual: 15.99,
  },
  {
    titulo: "Novalgina",
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    precoAnterior: 33.99,
    precoAtual: 25.99,
  },
];

const produtos = [
  {
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    titulo: "Hidratante",
    preco: 41.99,
  },
  {
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    titulo: "Strepsils",
    preco: 17.99,
  },
  {
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    titulo: "Dorflex",
    preco: 19.99,
  },
  {
    img: "https://drogariasp.vteximg.com.br/arquivos/ids/710794-500-500/783056---Sabonete-Liquido-Protex-Glicerina-de-Origem-Natural-200ml-1.jpg?v=637940282574800000",
    titulo: "Protetor solar",
    preco: 49.99,
  },
];

exports.getIndex = (req, res) => {
  res.render("shop/index", {
    paginaTitulo: "Droflix",
    produtosPromocao: produtosPromocao,
    produtos: produtos,
    servicos: [],
  });
};

exports.getEnviarParcerias = (req, res) => {
  res.render("shop/enviar-parcerias", {
    paginaTitulo: "Enviar parcerias",
  });
};
