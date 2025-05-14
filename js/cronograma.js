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

    // Toggle do menu de exportação
    const exportBtn = document.getElementById('exportBtn');
    const exportMenu = document.getElementById('exportMenu');

    if (exportBtn && exportMenu) {
        exportBtn.addEventListener('click', function() {
            exportMenu.classList.toggle('hidden');
        });

        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!exportBtn.contains(event.target) && !exportMenu.contains(event.target)) {
                exportMenu.classList.add('hidden');
            }
        });
    }

    // Inicialização do Gantt Chart
    console.log("Verificando se o elemento gantt_here existe:", document.getElementById('gantt_here'));
    console.log("Verificando se a biblioteca gantt está disponível:", typeof gantt);
    
    try {
        if (typeof gantt !== 'undefined' && document.getElementById('gantt_here')) {
            // Configurações gerais do Gantt
            gantt.config.date_format = "%Y-%m-%d %H:%i";
            gantt.config.duration_unit = "day";
            gantt.config.work_time = true;
            gantt.config.correct_work_time = true;
            gantt.config.skip_off_time = true;
            
            // Configurar escalas de tempo com opções mais detalhadas
            gantt.config.scales = [
                {unit: "month", step: 1, format: "%F, %Y"},
                {unit: "week", step: 1, format: function (date) {
                    return "Semana #" + gantt.date.getWeek(date);
                }},
                {unit: "day", step: 1, format: "%d %M", css: function(date) {
                    if(date.getDay() === 0 || date.getDay() === 6) {
                        return "weekend";
                    }
                }}
            ];
            
            // Configurar colunas da tabela à esquerda do Gantt
            gantt.config.columns = [
                {name: "text", label: "Atividade", tree: true, width: 200, resize: true},
                {name: "start_date", label: "Início", align: "center", width: 80, resize: true},
                {name: "duration", label: "Duração", align: "center", width: 60, resize: true},
                {name: "add", width: 40}
            ];
            
            // Configurações simplificadas para garantir que o gráfico seja exibido
            gantt.config.show_progress = true;
            gantt.config.drag_progress = true;
            gantt.config.drag_links = true;
            gantt.config.drag_resize = true;
            gantt.config.drag_move = true;
            
            // Inicializar o gráfico Gantt
            console.log("Inicializando o gantt...");
            gantt.init("gantt_here");
            console.log("Gantt inicializado");
            
            // Dados de exemplo para o gráfico de Gantt (simplificados para teste)
            var tasks = {
                data: [
                    {id: 1, text: "Projeto: Residencial Flores", start_date: "2023-01-01", duration: 180, progress: 0.4, open: true},
                    {id: 2, text: "Fundação", start_date: "2023-01-10", duration: 45, progress: 1, parent: 1},
                    {id: 3, text: "Estrutura", start_date: "2023-03-01", duration: 90, progress: 0.6, parent: 1},
                    {id: 4, text: "Alvenaria", start_date: "2023-05-15", duration: 75, progress: 0.1, parent: 1},
                    {id: 5, text: "Instalações", start_date: "2023-06-01", duration: 60, progress: 0, parent: 1},
                    {id: 6, text: "Acabamento", start_date: "2023-07-15", duration: 45, progress: 0, parent: 1}
                ],
                links: [
                    {id: 1, source: 2, target: 3, type: "0"},
                    {id: 2, source: 3, target: 4, type: "0"},
                    {id: 3, source: 4, target: 5, type: "0"},
                    {id: 4, source: 5, target: 6, type: "0"}
                ]
            };
            
            console.log("Carregando dados no gantt...");
            gantt.parse(tasks);
            console.log("Dados carregados");
            
            // Forçar redesenho após um pequeno atraso
            setTimeout(function() {
                console.log("Redesenhando o gantt...");
                gantt.render();
            }, 100);
        } else {
            console.error("Biblioteca gantt não disponível ou elemento gantt_here não encontrado");
        }
    } catch (e) {
        console.error("Erro ao inicializar o gantt:", e);
    }

    // Modal Nova Atividade
    const novaAtividadeBtn = document.getElementById('novaAtividadeBtn');
    const modalNovaAtividade = document.getElementById('modalNovaAtividade');
    const fecharModalBtn = document.getElementById('fecharModalBtn');
    const cancelarNovaAtividade = document.getElementById('cancelarNovaAtividade');

    if (novaAtividadeBtn && modalNovaAtividade) {
        novaAtividadeBtn.addEventListener('click', function() {
            modalNovaAtividade.classList.remove('hidden');
        });
    }

    if (fecharModalBtn && modalNovaAtividade) {
        fecharModalBtn.addEventListener('click', function() {
            modalNovaAtividade.classList.add('hidden');
        });
    }

    if (cancelarNovaAtividade && modalNovaAtividade) {
        cancelarNovaAtividade.addEventListener('click', function() {
            modalNovaAtividade.classList.add('hidden');
        });
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modalNovaAtividade) {
            modalNovaAtividade.classList.add('hidden');
        }
    });

    // Formulário de Nova Atividade
    const novaAtividadeForm = document.getElementById('novaAtividadeForm');
    if (novaAtividadeForm) {
        novaAtividadeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const nomeAtividade = document.getElementById('nomeAtividade').value;
            const tipoAtividade = document.getElementById('tipoAtividade').value;
            const dataInicio = document.getElementById('dataInicio').value;
            const dataFim = document.getElementById('dataFim').value;
            const duracao = parseInt(document.getElementById('duracao').value);
            const responsavel = document.getElementById('responsavel').value;
            const progresso = document.getElementById('progresso').value / 100 || 0;
            const dependencias = Array.from(document.getElementById('dependencias').selectedOptions).map(opt => parseInt(opt.value));
            
            // Adicionar ao gráfico de Gantt
            if (typeof gantt !== 'undefined') {
                const newId = gantt.getTaskByTime().length > 0 ? 
                    Math.max(...gantt.getTaskByTime().map(task => task.id)) + 1 : 1;
                
                // Criar a nova tarefa
                const newTask = {
                    id: newId,
                    text: nomeAtividade,
                    start_date: new Date(dataInicio),
                    duration: duracao,
                    progress: progresso,
                    parent: 1
                };
                
                // Se for marco, definir duração como 0 e tipo como milestone
                if (tipoAtividade === 'milestone') {
                    newTask.duration = 0;
                    newTask.type = "milestone";
                }
                
                // Adicionar a tarefa ao Gantt
                gantt.addTask(newTask);
                
                // Adicionar dependências
                dependencias.forEach(depId => {
                    gantt.addLink({
                        id: Date.now() + Math.floor(Math.random() * 1000),
                        source: depId,
                        target: newId,
                        type: "0" // Finish to Start
                    });
                });
            }
            
            // Fechar o modal
            modalNovaAtividade.classList.add('hidden');
            
            // Limpar o formulário
            novaAtividadeForm.reset();
        });
    }

    // Alteração da visualização do Gantt
    const viewMode = document.getElementById('viewMode');
    if (viewMode && typeof gantt !== 'undefined') {
        viewMode.addEventListener('change', function() {
            const mode = this.value;
            
            switch(mode) {
                case 'day':
                    gantt.config.scales = [
                        {unit: "day", step: 1, format: "%d %M"}
                    ];
                    break;
                case 'week':
                    gantt.config.scales = [
                        {unit: "week", step: 1, format: "Semana #%W"},
                        {unit: "day", step: 1, format: "%d %M", css: function(date) {
                            if(date.getDay() === 0 || date.getDay() === 6) {
                                return "weekend";
                            }
                        }}
                    ];
                    break;
                case 'month':
                    gantt.config.scales = [
                        {unit: "month", step: 1, format: "%F, %Y"},
                        {unit: "week", step: 1, format: "Semana #%W"}
                    ];
                    break;
                case 'quarter':
                    gantt.config.scales = [
                        {unit: "month", step: 3, format: function(date) {
                            var month = date.getMonth();
                            var quarter = Math.floor(month / 3) + 1;
                            return quarter + "º Trimestre " + date.getFullYear();
                        }},
                        {unit: "month", step: 1, format: "%F"}
                    ];
                    break;
            }
            
            gantt.render();
        });
    }

    // Filtros do cronograma
    const obraCronograma = document.getElementById('obraCronograma');
    const filterStatus = document.getElementById('filterStatus');
    
    function aplicarFiltros() {
        gantt.clearAll();
        
        const obraId = obraCronograma ? obraCronograma.value : '1';
        const statusFilter = filterStatus ? filterStatus.value : 'all';
        
        // Em um cenário real, aqui faria-se uma requisição para obter os dados da obra selecionada
        // e aplicar filtros. Neste exemplo, apenas recarregamos os mesmos dados.
        
        // Filtrar por status se necessário
        if (statusFilter !== 'all' && typeof gantt !== 'undefined') {
            gantt.attachEvent("onBeforeTaskDisplay", function(id, task) {
                if (statusFilter === 'progress' && task.progress > 0 && task.progress < 1) {
                    return true;
                }
                if (statusFilter === 'planned' && task.progress === 0) {
                    return true;
                }
                if (statusFilter === 'completed' && task.progress === 1) {
                    return true;
                }
                if (statusFilter === 'delayed') {
                    // Em um caso real, verificaria se a tarefa está atrasada comparando a data atual com a data de fim
                    const hoje = new Date();
                    const fimPrevisto = gantt.calculateEndDate({
                        start_date: task.start_date,
                        duration: task.duration,
                        task: task
                    });
                    return (hoje > fimPrevisto && task.progress < 1);
                }
                return statusFilter === 'all';
            });
        }
        
        // Recarregar dados (em um caso real, carregaria dados diferentes baseados na obra selecionada)
        gantt.parse({
            data: [
                {id: 1, text: "Projeto: Residencial Flores", start_date: "2023-01-01", duration: 180, progress: 0.4, open: true},
                
                // Fase de Fundação
                {id: 2, text: "Fundação", start_date: "2023-01-10", duration: 45, progress: 1, parent: 1, open: true},
                {id: 21, text: "Limpeza do terreno", start_date: "2023-01-10", duration: 5, progress: 1, parent: 2},
                {id: 22, text: "Escavação", start_date: "2023-01-15", duration: 7, progress: 1, parent: 2},
                {id: 23, text: "Concretagem do radier/sapatas", start_date: "2023-01-25", duration: 10, progress: 1, parent: 2},
                {id: 24, text: "Impermeabilização", start_date: "2023-02-05", duration: 5, progress: 1, parent: 2},
                {id: 25, text: "Conclusão da fundação", start_date: "2023-02-25", duration: 1, progress: 1, parent: 2, type: "milestone"},
                
                // Fase de Estrutura
                {id: 3, text: "Estrutura", start_date: "2023-03-01", duration: 90, progress: 0.6, parent: 1, open: true},
                {id: 31, text: "Pilares térreo", start_date: "2023-03-01", duration: 15, progress: 1, parent: 3},
                {id: 32, text: "Laje térreo/1° pavimento", start_date: "2023-03-16", duration: 20, progress: 1, parent: 3},
                {id: 33, text: "Pilares 1° pavimento", start_date: "2023-04-06", duration: 15, progress: 0.8, parent: 3},
                {id: 34, text: "Laje 1°/2° pavimento", start_date: "2023-04-22", duration: 20, progress: 0.5, parent: 3},
                {id: 35, text: "Pilares 2° pavimento", start_date: "2023-05-13", duration: 15, progress: 0.3, parent: 3},
                {id: 36, text: "Laje cobertura", start_date: "2023-05-29", duration: 15, progress: 0, parent: 3},
                
                // Fase de Alvenaria
                {id: 4, text: "Alvenaria", start_date: "2023-05-15", duration: 75, progress: 0.1, parent: 1, open: true},
                {id: 41, text: "Alvenaria térreo", start_date: "2023-05-15", duration: 25, progress: 0.3, parent: 4},
                {id: 42, text: "Alvenaria 1° pavimento", start_date: "2023-06-10", duration: 25, progress: 0, parent: 4},
                {id: 43, text: "Alvenaria 2° pavimento", start_date: "2023-07-05", duration: 25, progress: 0, parent: 4},
                
                // Fase de Instalações
                {id: 5, text: "Instalações", start_date: "2023-06-01", duration: 60, progress: 0, parent: 1, open: true},
                {id: 51, text: "Instalações elétricas", start_date: "2023-06-01", duration: 60, progress: 0, parent: 5},
                {id: 52, text: "Instalações hidráulicas", start_date: "2023-06-01", duration: 60, progress: 0, parent: 5},
                
                // Fase de Acabamento
                {id: 6, text: "Acabamento", start_date: "2023-07-15", duration: 45, progress: 0, parent: 1, open: true},
                {id: 61, text: "Acabamento interno", start_date: "2023-07-15", duration: 30, progress: 0, parent: 6},
                {id: 62, text: "Acabamento externo", start_date: "2023-07-25", duration: 25, progress: 0, parent: 6},
                {id: 63, text: "Pintura", start_date: "2023-08-15", duration: 20, progress: 0, parent: 6},
                
                // Marcos importantes
                {id: 7, text: "Entrega da obra", start_date: "2023-09-01", duration: 0, parent: 1, type: "milestone", progress: 0}
            ],
            links: [
                // Links de Fundação
                {id: 1, source: 21, target: 22, type: "0"},
                {id: 2, source: 22, target: 23, type: "0"},
                {id: 3, source: 23, target: 24, type: "0"},
                {id: 4, source: 24, target: 25, type: "0"},
                
                // Links de Estrutura
                {id: 5, source: 25, target: 31, type: "0"},
                {id: 6, source: 31, target: 32, type: "0"},
                {id: 7, source: 32, target: 33, type: "0"},
                {id: 8, source: 33, target: 34, type: "0"},
                {id: 9, source: 34, target: 35, type: "0"},
                {id: 10, source: 35, target: 36, type: "0"},
                
                // Links de Alvenaria
                {id: 11, source: 32, target: 41, type: "0"},
                {id: 12, source: 41, target: 42, type: "0"},
                {id: 13, source: 42, target: 43, type: "0"},
                
                // Links de Instalações
                {id: 14, source: 41, target: 51, type: "1"}, // Start to Start
                {id: 15, source: 41, target: 52, type: "1"}, // Start to Start
                
                // Links de Acabamento
                {id: 16, source: 43, target: 61, type: "0"},
                {id: 17, source: 43, target: 62, type: "0"},
                {id: 18, source: 61, target: 63, type: "0"},
                {id: 19, source: 62, target: 63, type: "0"},
                
                // Link para entrega da obra
                {id: 20, source: 63, target: 7, type: "0"}
            ]
        });
    }
    
    if (obraCronograma) {
        obraCronograma.addEventListener('change', aplicarFiltros);
    }
    
    if (filterStatus) {
        filterStatus.addEventListener('change', aplicarFiltros);
    }

    // Mostrar caminho crítico
    const showCriticalPathBtn = document.getElementById('showCriticalPathBtn');
    if (showCriticalPathBtn && typeof gantt !== 'undefined') {
        let criticalPathMode = false;
        
        showCriticalPathBtn.addEventListener('click', function() {
            criticalPathMode = !criticalPathMode;
            
            if (criticalPathMode) {
                gantt.config.highlight_critical_path = true;
                this.classList.add('bg-red-100');
                this.classList.add('text-red-700');
                this.querySelector('i').classList.add('text-red-700');
            } else {
                gantt.config.highlight_critical_path = false;
                this.classList.remove('bg-red-100');
                this.classList.remove('text-red-700');
                this.querySelector('i').classList.remove('text-red-700');
            }
            
            gantt.render();
        });
    }

    // Cálculo automático da duração a partir da data de início e fim
    const dataInicio = document.getElementById('dataInicio');
    const dataFim = document.getElementById('dataFim');
    const duracao = document.getElementById('duracao');

    function calcularDuracao() {
        if (dataInicio.value && dataFim.value) {
            const inicio = new Date(dataInicio.value);
            const fim = new Date(dataFim.value);
            
            // Calcular a diferença em dias
            const diffTime = Math.abs(fim - inicio);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia final
            
            duracao.value = diffDays;
        }
    }

    if (dataInicio && dataFim && duracao) {
        dataInicio.addEventListener('change', calcularDuracao);
        dataFim.addEventListener('change', calcularDuracao);
        
        // Atualizar a data de fim ao mudar a duração
        duracao.addEventListener('change', function() {
            if (dataInicio.value && duracao.value) {
                const inicio = new Date(dataInicio.value);
                const dias = parseInt(duracao.value) - 1; // -1 porque queremos contar a partir do dia inicial
                
                // Calcular a nova data de fim
                const fim = new Date(inicio);
                fim.setDate(inicio.getDate() + dias);
                
                // Formatar a data para o formato YYYY-MM-DD
                const formattedDate = fim.toISOString().split('T')[0];
                dataFim.value = formattedDate;
            }
        });
    }

    // Funcionalidades Premium - Abas de conteúdo
    const tabGantt = document.getElementById('tabGantt');
    const tabFinanceiro = document.getElementById('tabFinanceiro');
    const tabRecursos = document.getElementById('tabRecursos');
    const tabRelatorios = document.getElementById('tabRelatorios');

    const ganttContent = document.getElementById('ganttContent');
    const financeiroContent = document.getElementById('financeiroContent');
    const recursosContent = document.getElementById('recursosContent');
    const relatoriosContent = document.getElementById('relatoriosContent');

    function showTab(tabBtn, contentElement) {
        // Remover classes ativas de todos os botões de abas
        [tabGantt, tabFinanceiro, tabRecursos, tabRelatorios].forEach(tab => {
            if (tab) {
                tab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-600', 'bg-gray-50');
                tab.classList.add('text-gray-600', 'hover:text-gray-800');
            }
        });
        
        // Esconder todos os conteúdos
        [ganttContent, financeiroContent, recursosContent, relatoriosContent].forEach(content => {
            if (content) {
                content.classList.add('hidden');
            }
        });
        
        // Ativar a aba e conteúdo selecionados
        if (tabBtn && contentElement) {
            tabBtn.classList.remove('text-gray-600', 'hover:text-gray-800');
            tabBtn.classList.add('border-b-2', 'border-blue-500', 'text-blue-600', 'bg-gray-50');
            contentElement.classList.remove('hidden');
            
            // Se for o gráfico Gantt, precisamos redesenhar para garantir que seja exibido corretamente
            if (contentElement === ganttContent && typeof gantt !== 'undefined') {
                gantt.render();
            }
            
            // Se for a aba financeira, inicializar os gráficos
            if (contentElement === financeiroContent) {
                inicializarGraficosFinanceiros();
            }
        }
    }

    // Adicionar listeners de evento para as abas
    if (tabGantt) {
        tabGantt.addEventListener('click', function() {
            showTab(tabGantt, ganttContent);
        });
    }

    if (tabFinanceiro) {
        tabFinanceiro.addEventListener('click', function() {
            showTab(tabFinanceiro, financeiroContent);
        });
    }

    if (tabRecursos) {
        tabRecursos.addEventListener('click', function() {
            showTab(tabRecursos, recursosContent);
        });
    }

    if (tabRelatorios) {
        tabRelatorios.addEventListener('click', function() {
            showTab(tabRelatorios, relatoriosContent);
        });
    }

    // Inicializar gráficos financeiros usando Chart.js
    function inicializarGraficosFinanceiros() {
        if (typeof Chart === 'undefined') {
            // Carregar Chart.js dinamicamente se não estiver disponível
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = criarGraficos;
            document.head.appendChild(script);
        } else {
            criarGraficos();
        }
    }

    function criarGraficos() {
        // Gráfico de custos por etapa
        const ctxCustosEtapa = document.getElementById('custosEtapaChart');
        if (ctxCustosEtapa) {
            const custosEtapaChart = new Chart(ctxCustosEtapa, {
                type: 'bar',
                data: {
                    labels: ['Fundação', 'Estrutura', 'Alvenaria', 'Instalações', 'Acabamento'],
                    datasets: [
                        {
                            label: 'Orçado',
                            data: [200000, 350000, 200000, 300000, 200000],
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Realizado',
                            data: [200000, 250000, 0, 0, 0],
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString('pt-BR');
                                }
                            }
                        }
                    }
                }
            });
        }

        // Gráfico de evolução de custos
        const ctxEvolucaoCustos = document.getElementById('evolucaoCustosChart');
        if (ctxEvolucaoCustos) {
            const evolucaoCustosChart = new Chart(ctxEvolucaoCustos, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
                    datasets: [
                        {
                            label: 'Previsto',
                            data: [50000, 150000, 300000, 500000, 700000, 900000, 1100000],
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Realizado',
                            data: [45000, 170000, 280000, 450000, null, null, null],
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString('pt-BR');
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Funções de suporte
    
    // Adicionar estilos personalizados para o Gantt
    function addGanttStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .gantt_task_progress {
                background-color: #4CAF50;
                opacity: 0.6;
            }
            
            .gantt_task_line.task-completed {
                background-color: #4CAF50;
            }
            
            .gantt_task_line.task-in-progress {
                background-color: #2196F3;
            }
            
            .gantt_task_line.task-not-started {
                background-color: #9E9E9E;
            }
            
            .weekend {
                background-color: rgba(245, 245, 245, 0.5);
            }
            
            .gantt_task_line.gantt_critical_task {
                background-color: #FF5252;
                border-color: #FF1744;
            }
            
            .gantt_task_line.gantt_milestone {
                background-color: #9C27B0;
                border-color: #7B1FA2;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Configurar eventos de exportação
    function setupExportEvents() {
        const exportPDF = document.getElementById('exportPDF');
        const exportExcel = document.getElementById('exportExcel');
        const exportPNG = document.getElementById('exportPNG');
        
        if (exportPDF) {
            exportPDF.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Exportando cronograma para PDF...');
                
                // Em uma implementação real, isso geraria o PDF
                // gantt.exportToPDF();
            });
        }
        
        if (exportExcel) {
            exportExcel.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Exportando cronograma para Excel...');
                
                // Em uma implementação real, isso geraria o Excel
                // gantt.exportToExcel();
            });
        }
        
        if (exportPNG) {
            exportPNG.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Exportando cronograma como imagem...');
                
                // Em uma implementação real, isso geraria a imagem
                // gantt.exportToPNG();
            });
        }
    }
}); 