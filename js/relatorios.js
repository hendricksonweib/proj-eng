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

    // Mostrar campos de data personalizada
    const periodoFilter = document.getElementById('periodoFilter');
    const periodoPersonalizado = document.getElementById('periodoPersonalizado');
    const periodoPersonalizadoFim = document.getElementById('periodoPersonalizadoFim');

    if (periodoFilter && periodoPersonalizado && periodoPersonalizadoFim) {
        periodoFilter.addEventListener('change', function() {
            if (this.value === 'personalizado') {
                periodoPersonalizado.classList.remove('hidden');
                periodoPersonalizadoFim.classList.remove('hidden');
            } else {
                periodoPersonalizado.classList.add('hidden');
                periodoPersonalizadoFim.classList.add('hidden');
            }
        });
    }

    // Funcionalidades Premium para relatórios avançados
    const tipoRelatorio = document.getElementById('tipoRelatorio');
    const formatoExportacao = document.getElementById('formatoExportacao');
    const includeGraficos = document.getElementById('includeGraficos');
    const usarLogo = document.getElementById('usarLogo');

    // Função para aplicar filtros avançados aos relatórios
    function aplicarFiltrosAvancados() {
        const tipoValue = tipoRelatorio ? tipoRelatorio.value : 'todos';
        
        // Obter todos os cards de relatório
        const relatorioCards = document.querySelectorAll('.relatorio-card');
        
        // Aplicar filtro por tipo de relatório
        if (tipoValue !== 'todos') {
            relatorioCards.forEach(card => {
                const tipoRelatorio = card.getAttribute('data-tipo') || '';
                const isVisible = card.style.display !== 'none';
                
                if (isVisible && tipoValue !== tipoRelatorio) {
                    card.style.display = 'none';
                }
            });
        }
    }

    // Adicionar event listeners para os filtros avançados
    if (tipoRelatorio) {
        tipoRelatorio.addEventListener('change', function() {
            filtrarRelatorios();
            aplicarFiltrosAvancados();
        });
    }

    // Permitir exportação em diferentes formatos (funcionalidade premium)
    const exportarRelatorioBtn = document.querySelectorAll('.exportar-relatorio');
    
    exportarRelatorioBtn.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const relatorioId = this.getAttribute('data-relatorio-id');
            const formato = formatoExportacao ? formatoExportacao.value : 'pdf';
            const incluirGraficos = includeGraficos ? includeGraficos.checked : false;
            const incluirLogo = usarLogo ? usarLogo.checked : true;
            
            console.log(`Exportando relatório #${relatorioId} em formato ${formato}`);
            console.log(`Opções: incluir gráficos: ${incluirGraficos}, incluir logo: ${incluirLogo}`);
            
            // Simular download do arquivo
            const formatos = {
                'pdf': 'application/pdf',
                'excel': 'application/vnd.ms-excel',
                'word': 'application/msword',
                'powerpoint': 'application/vnd.ms-powerpoint',
                'jpg': 'image/jpeg'
            };
            
            const extensoes = {
                'pdf': '.pdf',
                'excel': '.xlsx',
                'word': '.docx',
                'powerpoint': '.pptx',
                'jpg': '.zip' // Supondo que sejam múltiplas imagens em um ZIP
            };
            
            // Em um ambiente real, aqui faria uma requisição ao servidor para gerar o arquivo
            // Neste exemplo, apenas simulamos um alerta
            alert(`Relatório exportado com sucesso em formato ${formato.toUpperCase()}!`);
        });
    });

    // Implementar funcionalidade para gerar gráficos de progresso (premium)
    function gerarGraficosDeProgresso(obraId) {
        // Esta função seria chamada ao visualizar um relatório com gráficos
        console.log(`Gerando gráficos de progresso para a obra #${obraId}`);
        
        // Exemplo de implementação com Chart.js (que seria carregado dinamicamente)
        if (typeof Chart === 'undefined' && includeGraficos && includeGraficos.checked) {
            // Carregar Chart.js dinamicamente
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = function() {
                // Criar gráficos após carregar a biblioteca
                criarGraficos(obraId);
            };
            document.head.appendChild(script);
        } else if (typeof Chart !== 'undefined' && includeGraficos && includeGraficos.checked) {
            criarGraficos(obraId);
        }
    }
    
    function criarGraficos(obraId) {
        // Exemplo de criação de um gráfico de progresso
        const ctx = document.getElementById('graficoProgresso');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Fundação', 'Estrutura', 'Alvenaria', 'Instalações', 'Acabamento'],
                    datasets: [{
                        label: 'Progresso (%)',
                        data: [100, 60, 10, 0, 0],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Progresso da Obra por Etapa'
                        }
                    }
                }
            });
        }
    }

    // Adicionar mais observações
    const adicionarObservacaoBtn = document.getElementById('adicionarObservacao');
    const observacoesContainer = document.getElementById('observacoesContainer');
    
    if (adicionarObservacaoBtn && observacoesContainer) {
        adicionarObservacaoBtn.addEventListener('click', function() {
            const observacaoDiv = document.createElement('div');
            observacaoDiv.className = 'border border-gray-300 rounded-lg p-4 mb-2 relative';
            
            observacaoDiv.innerHTML = `
                <button type="button" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
                <input type="text" placeholder="Título da observação" class="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <textarea placeholder="Detalhes da observação" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            `;
            
            observacoesContainer.appendChild(observacaoDiv);
            
            // Adicionar evento para remover a observação
            const removeBtn = observacaoDiv.querySelector('button');
            removeBtn.addEventListener('click', function() {
                observacaoDiv.remove();
            });

            // Rolar para a nova observação adicionada
            observacaoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Adicionar funcionalidade para campos personalizáveis nos relatórios (premium)
    const adicionarCampoBtn = document.getElementById('adicionarCampoPersonalizado');
    const camposPersonalizadosContainer = document.getElementById('camposPersonalizadosContainer');
    
    if (adicionarCampoBtn && camposPersonalizadosContainer) {
        adicionarCampoBtn.addEventListener('click', function() {
            const novoCampoDiv = document.createElement('div');
            novoCampoDiv.className = 'border border-gray-300 rounded-lg p-4 mb-2 relative';
            
            novoCampoDiv.innerHTML = `
                <button type="button" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Nome do Campo</label>
                        <input type="text" placeholder="Ex: Temperatura, Clima, etc." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Tipo de Campo</label>
                        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="texto">Texto</option>
                            <option value="numero">Número</option>
                            <option value="data">Data</option>
                            <option value="selecao">Seleção</option>
                            <option value="checkboxes">Múltipla Escolha</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-1">Valor do Campo</label>
                    <input type="text" placeholder="Valor do campo personalizado" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            `;
            
            camposPersonalizadosContainer.appendChild(novoCampoDiv);
            
            // Adicionar evento para remover o campo
            const removeBtn = novoCampoDiv.querySelector('button');
            removeBtn.addEventListener('click', function() {
                novoCampoDiv.remove();
            });

            // Rolar para o novo campo adicionado
            novoCampoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Funcionalidades de filtro para relatórios
    const obraFilter = document.getElementById('obraFilter');
    const sortFilter = document.getElementById('sortFilter');
    const dataInicio = document.getElementById('dataInicio');
    const dataFim = document.getElementById('dataFim');
    const searchInput = document.querySelector('input[placeholder="Buscar relatório..."]');
    
    // Função para filtrar os relatórios
    function filtrarRelatorios() {
        const obraValue = obraFilter ? obraFilter.value : 'todas';
        const periodoValue = periodoFilter ? periodoFilter.value : 'todos';
        const sortValue = sortFilter ? sortFilter.value : 'recentes';
        const dataInicioValue = dataInicio ? dataInicio.value : '';
        const dataFimValue = dataFim ? dataFim.value : '';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        // Obter todos os cards de relatório
        const relatorioCards = document.querySelectorAll('.relatorio-card');
        
        // Para cada card, verificar se deve ser mostrado ou escondido
        relatorioCards.forEach(card => {
            // Em um cenário real, esses atributos viriam do backend
            // Aqui estamos apenas simulando
            const obra = card.getAttribute('data-obra') || '';
            const dataRelatorio = card.getAttribute('data-data') || '';
            const titulo = card.querySelector('h3').textContent.toLowerCase();
            
            // Verificar se o card atende a todos os filtros
            const matchObra = obraValue === 'todas' || obra === obraValue;
            
            // Verificar o período
            let matchPeriodo = true;
            
            if (periodoValue === 'personalizado') {
                if (dataInicioValue && dataFimValue) {
                    const dataRel = new Date(dataRelatorio);
                    const inicio = new Date(dataInicioValue);
                    const fim = new Date(dataFimValue);
                    matchPeriodo = dataRel >= inicio && dataRel <= fim;
                }
            } else if (periodoValue !== 'todos') {
                // Implementar lógica para os outros períodos (últimos 7 dias, etc)
                const dataRel = new Date(dataRelatorio);
                const hoje = new Date();
                
                let diasAtras = 0;
                
                switch(periodoValue) {
                    case 'ultimos7':
                        diasAtras = 7;
                        break;
                    case 'ultimos30':
                        diasAtras = 30;
                        break;
                    case 'ultimos90':
                        diasAtras = 90;
                        break;
                }
                
                const dataLimite = new Date();
                dataLimite.setDate(hoje.getDate() - diasAtras);
                
                matchPeriodo = dataRel >= dataLimite;
            }
            
            const matchSearch = searchValue === '' || titulo.includes(searchValue);
            
            // Mostrar ou esconder o card com base nos filtros
            if (matchObra && matchPeriodo && matchSearch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Ordenar os cards visíveis
        const container = document.querySelector('.grid');
        
        if (container) {
            const visibleCards = Array.from(relatorioCards).filter(card => 
                card.style.display !== 'none'
            );
            
            visibleCards.sort((a, b) => {
                if (sortValue === 'recentes') {
                    return new Date(b.getAttribute('data-data')) - new Date(a.getAttribute('data-data'));
                } else if (sortValue === 'antigos') {
                    return new Date(a.getAttribute('data-data')) - new Date(b.getAttribute('data-data'));
                } else if (sortValue === 'obra') {
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                }
                return 0;
            });
            
            // Remover todos os cards e adicionar na nova ordem
            visibleCards.forEach(card => container.appendChild(card));
        }
    }
    
    // Adicionar event listeners para os filtros
    if (obraFilter) {
        obraFilter.addEventListener('change', filtrarRelatorios);
    }
    
    if (periodoFilter) {
        periodoFilter.addEventListener('change', filtrarRelatorios);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filtrarRelatorios);
    }
    
    if (dataInicio) {
        dataInicio.addEventListener('change', filtrarRelatorios);
    }
    
    if (dataFim) {
        dataFim.addEventListener('change', filtrarRelatorios);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filtrarRelatorios);
    }

    // Modal Novo Relatório
    const novoRelatorioBtn = document.getElementById('novoRelatorioBtn');
    const cardNovoRelatorioBtn = document.getElementById('cardNovoRelatorioBtn');
    const modalNovoRelatorio = document.getElementById('modalNovoRelatorio');
    const fecharModalBtn = document.getElementById('fecharModalBtn');
    const cancelarNovoRelatorio = document.getElementById('cancelarNovoRelatorio');

    // Funções para abrir e fechar o modal
    function abrirModal() {
        modalNovoRelatorio.classList.remove('hidden');
        // Impedir o scroll no body quando o modal estiver aberto
        document.body.style.overflow = 'hidden';
        
        // Definir a data atual como padrão
        const dataRelatorioField = document.getElementById('dataRelatorio');
        if (dataRelatorioField) {
            const today = new Date().toISOString().split('T')[0];
            dataRelatorioField.value = today;
        }
        
        // Reset da posição de scroll do modal
        const modalContent = modalNovoRelatorio.querySelector('.max-h-\\[70vh\\]');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }

    function fecharModal() {
        modalNovoRelatorio.classList.add('hidden');
        // Restaurar o scroll no body
        document.body.style.overflow = '';
    }

    // Adicionar event listeners para os botões
    if (novoRelatorioBtn && modalNovoRelatorio) {
        novoRelatorioBtn.addEventListener('click', abrirModal);
    }

    if (cardNovoRelatorioBtn && modalNovoRelatorio) {
        cardNovoRelatorioBtn.addEventListener('click', abrirModal);
    }

    if (fecharModalBtn && modalNovoRelatorio) {
        fecharModalBtn.addEventListener('click', fecharModal);
    }

    if (cancelarNovoRelatorio && modalNovoRelatorio) {
        cancelarNovoRelatorio.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modalNovoRelatorio) {
            fecharModal();
        }
    });

    // Preview de fotos selecionadas
    const fotosRelatorio = document.getElementById('fotosRelatorio');
    const fotosPreview = document.getElementById('fotosPreview');
    
    if (fotosRelatorio && fotosPreview) {
        fotosRelatorio.addEventListener('change', function() {
            const files = Array.from(this.files);
            
            if (files.length > 0) {
                fotosPreview.classList.remove('hidden');
                const previewContainer = fotosPreview.querySelector('.grid');
                previewContainer.innerHTML = ''; // Limpar previews anteriores
                
                files.forEach(file => {
                    if (file.type.match('image.*')) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            const preview = document.createElement('div');
                            preview.className = 'relative';
                            
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.className = 'w-full h-24 object-cover rounded-lg';
                            preview.appendChild(img);
                            
                            const removeBtn = document.createElement('button');
                            removeBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center';
                            removeBtn.innerHTML = '&times;';
                            removeBtn.addEventListener('click', function() {
                                preview.remove();
                                if (previewContainer.children.length === 0) {
                                    fotosPreview.classList.add('hidden');
                                }
                            });
                            preview.appendChild(removeBtn);
                            
                            previewContainer.appendChild(preview);
                        };
                        
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    }

    // Formulário de Novo Relatório
    const novoRelatorioForm = document.getElementById('novoRelatorioForm');
    
    if (novoRelatorioForm) {
        novoRelatorioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar se foram selecionadas fotos
            const fotosInput = document.getElementById('fotosRelatorio');
            if (fotosInput && fotosInput.files.length === 0) {
                alert('Por favor, selecione pelo menos uma foto para o relatório.');
                return;
            }
            
            // Processar o formulário - aqui apenas simulamos o sucesso
            console.log('Relatório criado com sucesso!');
            
            // Em produção, enviaria os dados para o servidor e atualizaria a UI
            
            // Fechar o modal
            fecharModal();
            
            // Limpar o formulário
            novoRelatorioForm.reset();
            
            // Limpar o preview de fotos
            if (fotosPreview) {
                fotosPreview.classList.add('hidden');
                const previewContainer = fotosPreview.querySelector('.grid');
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
            }
            
            // Simulação de adição de um novo relatório à lista
            alert('Relatório criado com sucesso!');
            window.location.reload();
        });
    }
}); 