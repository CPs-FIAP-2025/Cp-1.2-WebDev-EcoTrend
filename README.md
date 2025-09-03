EcoTrend - Projeto de E-commerce Sustentável

Este documento detalha a arquitetura e as funcionalidades chave do projeto EcoTrend, uma aplicação de e-commerce focada em produtos sustentáveis. O projeto foi desenvolvido utilizando React e Vite, com uma abordagem moderna para a interface do usuário e gerenciamento de estado.

1. Visão Geral da Aplicação

O EcoTrend simula uma loja online onde os usuários podem navegar por produtos, filtrá-los por categoria e faixa de preço, buscar itens específicos, adicionar produtos ao carrinho de compras e simular um processo de checkout. A aplicação é projetada para ser intuitiva e responsiva, proporcionando uma experiência de compra agradável.

2. Implementação da "Fake API" (products.json)

Para simular a interação com um backend, o EcoTrend utiliza um arquivo products.json localizado na pasta public. Este arquivo atua como uma "fake API", fornecendo os dados dos produtos que são carregados dinamicamente na aplicação. Esta abordagem permite o desenvolvimento e teste do frontend sem a necessidade de um servidor backend real.

2.1 Estrutura do products.json

O arquivo products.json é um array de objetos JSON, onde cada objeto representa um produto. Cada produto possui as seguintes propriedades:

•
id: Identificador único do produto.

•
name: Nome do produto.

•
category: Categoria à qual o produto pertence (e.g., "roupas", "beleza", "casa", "tecnologia").

•
price: Preço do produto.

•
image: URL da imagem do produto.

•
description: Descrição detalhada do produto.

•
sustainability: Informações sobre a sustentabilidade do produto.

Exemplo de um item no products.json:

JSON


{
  "id": 1,
  "name": "Camiseta Orgânica Básica",
  "category": "roupas",
  "price": 89.90,
  "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  "description": "Camiseta 100% algodão orgânico, tingimento natural e produção sustentável.",
  "sustainability": "Algodão orgânico certificado"
}


2.2 Carregamento dos Dados

Os dados do products.json são carregados na aplicação através de um useEffect no componente principal App.jsx. Uma função assíncrona loadProducts é responsável por fazer a requisição fetch para o arquivo JSON e atualizar o estado products da aplicação. Um pequeno delay é simulado para demonstrar um carregamento assíncrono de dados.

JavaScript


  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const response = await fetch("/products.json")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])


3. Funcionalidades do Carrinho de Compras

O carrinho de compras é uma funcionalidade central do EcoTrend, permitindo aos usuários adicionar, remover e ajustar a quantidade de produtos antes de finalizar a compra. O estado do carrinho é gerenciado no componente App.jsx e persistido no localStorage do navegador.

3.1 Gerenciamento do Estado do Carrinho

O estado cart é um array de objetos, onde cada objeto representa um item no carrinho, incluindo o produto e a quantidade desejada. As seguintes funções são responsáveis pela manipulação do carrinho:

•
addToCart(product): Adiciona um produto ao carrinho. Se o produto já existir, sua quantidade é incrementada. Caso contrário, o produto é adicionado com quantidade 1.

•
removeFromCart(productId): Remove um produto do carrinho com base no seu productId.

•
updateQuantity(productId, newQuantity): Atualiza a quantidade de um produto específico no carrinho. Se newQuantity for 0, o produto é removido.

O total do carrinho (cartTotal) e a contagem de itens (cartItemsCount) são calculados dinamicamente com base no estado cart.

3.2 Persistência do Carrinho

O carrinho é salvo automaticamente no localStorage do navegador sempre que há uma alteração no estado cart. Isso garante que o conteúdo do carrinho seja mantido mesmo se o usuário fechar e reabrir a aplicação. No carregamento inicial da aplicação, o carrinho é restaurado do localStorage.

JavaScript


  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("ecotrend-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem("ecotrend-cart", JSON.stringify(cart))
  }, [cart])


3.3 Checkout Simulado

A função handleCheckout simula um processo de finalização de compra. Ela exibe mensagens de sucesso ou erro após um delay simulado, limpa o carrinho em caso de sucesso e fecha a barra lateral do carrinho. Há uma chance de 80% de sucesso na simulação.

JavaScript


  const handleCheckout = async () => {
    if (cart.length === 0) return

    setIsCheckingOut(true)
    setCheckoutMessage("")

    try {
      // Simular validação e processamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular sucesso/erro aleatório
      const success = Math.random() > 0.2 // 80% de sucesso
      
      if (success) {
        setCheckoutMessage("✅ Pedido realizado com sucesso! Obrigado por escolher produtos sustentáveis!")
        setCart([])
        setTimeout(() => {
          setIsCartOpen(false)
          setCheckoutMessage("")
        }, 3000)
      } else {
        setCheckoutMessage("❌ Erro no processamento. Tente novamente.")
      }
    } catch (error) {
      setCheckoutMessage("❌ Erro no processamento. Tente novamente.")
    } finally {
      setIsCheckingOut(false)
    }
  }


4. Busca e Filtragem de Itens Específicos

O EcoTrend oferece diversas opções para os usuários encontrarem produtos específicos, incluindo busca por termo e filtragem por categoria e faixa de preço. Essas funcionalidades são combinadas para refinar os resultados exibidos.

4.1 Filtro por Categoria

Os produtos podem ser filtrados por categorias pré-definidas (e.g., "Roupas Sustentáveis", "Beleza Natural"). A seleção da categoria é gerenciada pelo estado selectedCategory e aplicada aos produtos exibidos.

4.2 Filtro por Faixa de Preço

Os usuários podem definir uma faixa de preço mínima e máxima para os produtos. O estado priceRange armazena esses valores e é utilizado para filtrar os produtos que se encaixam no intervalo especificado.

4.3 Busca por Termo

A barra de busca permite que os usuários procurem produtos por nome ou descrição. O termo de busca é armazenado no estado searchTerm e é utilizado para filtrar os produtos que contêm o termo (case-insensitive).

4.4 Lógica de Filtragem Combinada

Todas as lógicas de filtragem (categoria, preço e termo de busca) são aplicadas em conjunto dentro de um useEffect no App.jsx. Isso garante que os filteredProducts sejam sempre atualizados de acordo com todas as seleções do usuário.

JavaScript


  useEffect(() => {
    let filtered = products

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtro por preço
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange, searchTerm])


5. Modificação de Valores Específicos (Quantidade no Carrinho)

A modificação de valores específicos no EcoTrend é exemplificada principalmente pela capacidade de alterar a quantidade de itens no carrinho de compras. Embora não haja uma funcionalidade explícita para "mudar valores específicos" de produtos (como preço ou descrição) diretamente na interface do usuário, a manipulação da quantidade no carrinho é um exemplo claro de como valores associados a um item podem ser dinamicamente ajustados.

5.1 Atualização da Quantidade

A função updateQuantity é a responsável por permitir que o usuário altere a quantidade de um produto no carrinho. Esta função recebe o productId e a newQuantity como parâmetros. Se a newQuantity for zero, o item é removido do carrinho, simulando a remoção completa do produto.

JavaScript


  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }


Esta funcionalidade é crucial para a experiência do usuário em um e-commerce, permitindo flexibilidade na gestão do pedido antes da finalização da compra. Embora o projeto não inclua edição de preços de produtos via interface, a lógica de updateQuantity pode ser adaptada para outras modificações de valores se a aplicação fosse expandida para um painel administrativo, por exemplo.

