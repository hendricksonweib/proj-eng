document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu mobile
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Toggle do menu do usuário
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', function() {
            userMenu.classList.toggle('hidden');
        });

        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add('hidden');
            }
        });
    }

    // Modal Nova Obra
    const novaObraBtn = document.getElementById('novaObraBtn');
    const cardNovaObraBtn = document.getElementById('cardNovaObraBtn');
    const modalNovaObra = document.getElementById('modalNovaObra');
    const fecharModalBtn = document.getElementById('fecharModalBtn');
    const cancelarNovaObra = document.getElementById('cancelarNovaObra');

    // Funções para abrir e fechar o modal
    function abrirModal() {
        modalNovaObra.classList.remove('hidden');
    }

    function fecharModal() {
        modalNovaObra.classList.add('hidden');
    }

    // Adicionar event listeners para os botões
    if (novaObraBtn && modalNovaObra) {
        novaObraBtn.addEventListener('click', abrirModal);
    }

    if (cardNovaObraBtn && modalNovaObra) {
        cardNovaObraBtn.addEventListener('click', abrirModal);
    }

    if (fecharModalBtn && modalNovaObra) {
        fecharModalBtn.addEventListener('click', fecharModal);
    }

    if (cancelarNovaObra && modalNovaObra) {
        cancelarNovaObra.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modalNovaObra) {
            fecharModal();
        }
    });

    // Formulário de Nova Obra
    const novaObraForm = document.getElementById('novaObraForm');
    
    if (novaObraForm) {
        novaObraForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Versão Premium - Sem limites de obras
            const isPremiumVersion = true; // Simulando que o usuário tem a versão premium
            
            // Processar o formulário - aqui apenas simulamos o sucesso
            console.log('Obra cadastrada com sucesso!');
            
            // Em produção, enviaria os dados para o servidor e atualizaria a UI
            
            // Fechar o modal
            fecharModal();
            
            // Limpar o formulário
            novaObraForm.reset();
            
            // Simulação de adição de uma nova obra à lista
            alert('Obra cadastrada com sucesso!');
            window.location.reload();
        });
    }

    // Upload de imagem da obra
    const imagemObra = document.getElementById('imagemObra');
    
    if (imagemObra) {
        imagemObra.addEventListener('change', function(e) {
            // Pegar o arquivo selecionado
            const file = e.target.files[0];
            
            if (file) {
                // Verificar se é uma imagem
                if (!file.type.match('image.*')) {
                    alert('Por favor, selecione uma imagem.');
                    return;
                }
                
                // Verificar o tamanho do arquivo (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
                    return;
                }
                
                // Mostrar preview da imagem (opcional)
                // ...
                
                // Em produção, poderia mostrar um preview da imagem aqui
                console.log('Imagem selecionada:', file.name);
            }
        });
    }

    // Funcionalidades de filtro
    const statusFilter = document.getElementById('statusFilter');
    const clienteFilter = document.getElementById('clienteFilter');
    const tipoFilter = document.getElementById('tipoFilter');
    const searchInput = document.querySelector('input[placeholder="Buscar obra..."]');
    
    // Função para filtrar as obras
    function filtrarObras() {
        const statusValue = statusFilter ? statusFilter.value : 'todos';
        const clienteValue = clienteFilter ? clienteFilter.value : 'todos';
        const tipoValue = tipoFilter ? tipoFilter.value : 'todos';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        // Obter todos os cards de obra
        const obraCards = document.querySelectorAll('.obra-card');
        
        // Para cada card, verificar se deve ser mostrado ou escondido
        obraCards.forEach(card => {
            // Em um cenário real, esses atributos viriam do backend
            // Aqui estamos apenas simulando
            const status = card.getAttribute('data-status') || '';
            const cliente = card.getAttribute('data-cliente') || '';
            const tipo = card.getAttribute('data-tipo') || '';
            const nome = card.querySelector('h3').textContent.toLowerCase();
            
            // Verificar se o card atende a todos os filtros
            const matchStatus = statusValue === 'todos' || status === statusValue;
            const matchCliente = clienteValue === 'todos' || cliente === clienteValue;
            const matchTipo = tipoValue === 'todos' || tipo === tipoValue;
            const matchSearch = searchValue === '' || nome.includes(searchValue);
            
            // Mostrar ou esconder o card com base nos filtros
            if (matchStatus && matchCliente && matchTipo && matchSearch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Adicionar event listeners para os filtros
    if (statusFilter) {
        statusFilter.addEventListener('change', filtrarObras);
    }
    
    if (clienteFilter) {
        clienteFilter.addEventListener('change', filtrarObras);
    }
    
    if (tipoFilter) {
        tipoFilter.addEventListener('change', filtrarObras);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filtrarObras);
    }

    // Alternar visualização entre grid e lista
    const viewButtons = document.querySelectorAll('.view-btn');
    const obrasList = document.querySelector('.obras-container');
    
    if (viewButtons.length > 0 && obrasList) {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover classe ativa de todos os botões
                viewButtons.forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white');
                    b.classList.add('bg-white', 'text-gray-600');
                });
                
                // Adicionar classe ativa ao botão clicado
                this.classList.remove('bg-white', 'text-gray-600');
                this.classList.add('bg-blue-600', 'text-white');
                
                // Alternar visualização
                if (this.id === 'gridView') {
                    obrasList.classList.remove('flex-col');
                    obrasList.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
                } else {
                    obrasList.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
                    obrasList.classList.add('flex-col', 'space-y-4');
                }
            });
        });
    }

    // Máscara para o campo de CEP
    const cepObra = document.getElementById('cepObra');
    
    if (cepObra) {
        cepObra.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // Remover todos os caracteres que não são números
            value = value.replace(/\D/g, '');
            
            // Aplicar a máscara (formato: 12345-678)
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            
            // Limitar o tamanho
            if (value.length > 9) {
                value = value.substring(0, 9);
            }
            
            // Atualizar o valor do campo
            e.target.value = value;
        });
    }
}); 