        // Função para embaralhar os produtos
        function shuffleProducts() {
            const sections = ['destaquesProdutos', 'produtosContainer', 'produtosParceirosContainer', 'produtosshopee']; // Adicione o ID da seção de produtos parceiros
            sections.forEach(sectionId => {
                const container = document.getElementById(sectionId);
                const products = Array.from(container.children);
                const shuffled = products.sort(() => Math.random() - 0.5);
                container.innerHTML = ''; // Limpa o container
                shuffled.forEach(product => container.appendChild(product)); // Adiciona os produtos embaralhados
            });
        }


        function searchProducts() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const produtos = document.querySelectorAll('#produtos .produto, #produtosparceiros .produto, #shopee .produto'); // Ignora a seção de destaque
            const searchResultsContainer = document.getElementById('searchResultsContainer') || createSearchResultsContainer();

            // Limpa o contêiner de resultados da pesquisa
            searchResultsContainer.innerHTML = '';

            let encontrou = false;

            produtos.forEach(produto => {
                const titulo = produto.querySelector('h3').textContent.toLowerCase();
                // Verifica se a palavra buscada está no título do produto
                if (titulo.includes(input)) {
                    searchResultsContainer.appendChild(produto.cloneNode(true)); // Adiciona ao contêiner de resultados
                    encontrou = true;
                }
            });

            // Exibe a seção de resultados apenas se houver pesquisa
            if (input !== '') {
                searchResultsContainer.style.display = 'grid'; // Mostra a seção de resultados com estilo de grid
            } else {
                searchResultsContainer.style.display = 'none'; // Esconde a seção de resultados se a pesquisa estiver vazia
            }

            // Se não encontrou resultados, exibe uma mensagem de "Nenhum resultado encontrado"
            if (!encontrou && input !== '') {
                searchResultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            }
        }

        function createSearchResultsContainer() {
            const searchResultsContainer = document.createElement('section');
            searchResultsContainer.id = 'searchResultsContainer';
            searchResultsContainer.classList.add('produtos-container'); // Aplicando a mesma classe de estilo
            document.body.appendChild(searchResultsContainer); // Adiciona no final do corpo
            return searchResultsContainer;
        }


        function filterProducts(categoria) {
            const produtos = document.querySelectorAll('#produtos .produto, #produtosparceiros .produto, #shopee .produto'); // Ignora a seção de destaque
            const searchResultsContainer = document.getElementById('searchResultsContainer');

            // Limpa o contêiner de resultados da pesquisa
            if (searchResultsContainer) {
                searchResultsContainer.innerHTML = '';
            }

            produtos.forEach(produto => {
                // Verifica a categoria do produto e exibe ou esconde
                if (produto.getAttribute('data-categoria') === categoria || categoria === '') {
                    produto.classList.remove('hidden');

                    // Se houver uma pesquisa ativa, adiciona o produto ao contêiner de resultados
                    if (searchResultsContainer) {
                        searchResultsContainer.appendChild(produto.cloneNode(true)); // Adiciona ao contêiner de resultados
                    }
                } else {
                    produto.classList.add('hidden');
                }
            });

            // Exibe a seção de resultados apenas se houver produtos filtrados
            if (searchResultsContainer && searchResultsContainer.childElementCount > 0) {
                searchResultsContainer.style.display = 'grid'; // Mostra a seção de resultados com estilo de grid
            } else if (searchResultsContainer) {
                searchResultsContainer.style.display = 'none'; // Esconde a seção de resultados se não houver produtos
            }

            // Esconde a seção de pesquisa se a categoria "Todos" for selecionada
            if (categoria === '') {
                if (searchResultsContainer) {
                    searchResultsContainer.style.display = 'none'; // Esconde a seção de resultados
                }
            }
        }
        // Chamar a função de embaralhamento ao carregar a página
        window.onload = shuffleProducts;