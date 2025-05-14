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

    // Alternar entre cobrança mensal e anual
    const cobrancaMensal = document.getElementById('cobrancaMensal');
    const cobrancaAnual = document.getElementById('cobrancaAnual');
    const precosAnuais = document.querySelectorAll('.pricing-annual');
    const precosMensais = document.querySelectorAll('.pricing-monthly');

    if (cobrancaMensal && cobrancaAnual) {
        cobrancaMensal.addEventListener('click', function() {
            // Atualizar botões
            cobrancaMensal.classList.remove('bg-white', 'text-blue-600');
            cobrancaMensal.classList.add('bg-blue-600', 'text-white');
            
            cobrancaAnual.classList.remove('bg-blue-600', 'text-white');
            cobrancaAnual.classList.add('bg-white', 'text-blue-600');
            
            // Atualizar preços
            precosAnuais.forEach(preco => preco.classList.add('hidden'));
            precosMensais.forEach(preco => preco.classList.remove('hidden'));
        });

        cobrancaAnual.addEventListener('click', function() {
            // Atualizar botões
            cobrancaAnual.classList.remove('bg-white', 'text-blue-600');
            cobrancaAnual.classList.add('bg-blue-600', 'text-white');
            
            cobrancaMensal.classList.remove('bg-blue-600', 'text-white');
            cobrancaMensal.classList.add('bg-white', 'text-blue-600');
            
            // Atualizar preços
            precosMensais.forEach(preco => preco.classList.add('hidden'));
            precosAnuais.forEach(preco => preco.classList.remove('hidden'));
        });
    }

    // Toggle das perguntas frequentes
    const faqButtons = document.querySelectorAll('[id$="Btn"]');
    
    faqButtons.forEach(button => {
        if (button.id.startsWith('faq')) {
            const contentId = button.id.replace('Btn', '');
            const content = document.getElementById(contentId);
            const icon = button.querySelector('i');
            
            if (content && icon) {
                button.addEventListener('click', function() {
                    content.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                });
            }
        }
    });

    // Scroll para a seção de planos ao clicar no botão
    const verPlanosBtn = document.querySelector('a[href="#pricing"]');
    
    if (verPlanosBtn) {
        verPlanosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const planosSection = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
            
            if (planosSection) {
                window.scrollTo({
                    top: planosSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Adicionar IDs para funcionar com ancoragem
    const planosGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
    if (planosGrid) {
        planosGrid.id = 'pricing';
    }

    // Destacar a versão atual do usuário
    function destacarPlanoAtual() {
        // Em um cenário real, essa informação viria do backend
        const planoAtual = 'trial'; // Pode ser 'trial', 'premium-standard' ou 'premium-enterprise'
        
        let planoElement;
        
        switch (planoAtual) {
            case 'trial':
                planoElement = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3 > div:first-child');
                break;
            case 'premium-standard':
                planoElement = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3 > div:nth-child(2)');
                break;
            case 'premium-enterprise':
                planoElement = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3 > div:last-child');
                break;
        }
        
        if (planoElement) {
            // Adicionar badge 'Seu plano atual'
            const badge = document.createElement('div');
            badge.className = 'absolute top-0 left-0 m-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg';
            badge.textContent = 'Seu plano atual';
            
            // Verificar se o elemento já tem posição relativa para o badge funcionar
            if (window.getComputedStyle(planoElement).position !== 'relative') {
                planoElement.classList.add('relative');
            }
            
            planoElement.appendChild(badge);
            
            // Alterar o texto do botão
            const botao = planoElement.querySelector('a.block.w-full');
            
            if (botao) {
                if (planoAtual === 'trial') {
                    botao.textContent = 'Fazer Upgrade';
                } else {
                    botao.textContent = 'Gerenciar Assinatura';
                    botao.href = 'gerenciar-assinatura.html';
                }
            }
        }
    }
    
    // Chamar a função para destacar o plano atual
    // destacarPlanoAtual(); // Comentado para não interferir com o design inicial da página

    // Adicionar comparações personalizadas
    const compareTrigger = document.querySelectorAll('.compare-trigger');
    
    if (compareTrigger.length > 0) {
        compareTrigger.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const feature = this.getAttribute('data-feature');
                const rows = document.querySelectorAll(`tr[data-feature="${feature}"]`);
                
                rows.forEach(row => {
                    row.classList.toggle('bg-blue-50');
                });
            });
        });
    }
}); 