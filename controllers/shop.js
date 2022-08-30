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

const servicos = [
  {
    titulo: "Teste de COVID-19",
    img: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    titulo: "Aplicação de vacinas",
    img: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    titulo: "Teste de diabetes",
    img: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    titulo: "Medição de pressão",
    img: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    titulo: "Perfuração de orelha",
    img: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    titulo: "Realização de curativos",
    img: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

exports.getIndex = (req, res) => {
  res.render("shop/index", {
    paginaTitulo: "Droflix",
    produtosPromocao: produtosPromocao,
    produtos: produtos,
    servicos: servicos,
  });
};

exports.getEnviarParcerias = (req, res) => {
  res.render("shop/enviar-parcerias", {
    paginaTitulo: "Enviar parcerias",
  });
};
