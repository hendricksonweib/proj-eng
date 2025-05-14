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

    // ===== Funcionalidades do Chat =====
    
    // Referências aos elementos do DOM
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatButtons = document.querySelectorAll('.chat-button');
    const btnInfo = document.getElementById('btnInfo');
    const chatInfoPanel = document.getElementById('chatInfoPanel');
    const closeChatInfo = document.getElementById('closeChatInfo');
    const btnChatMenu = document.getElementById('btnChatMenu');
    const chatMenu = document.getElementById('chatMenu');
    const newChatBtn = document.getElementById('newChatBtn');
    const newChatModal = document.getElementById('newChatModal');
    const closeNewChat = document.getElementById('closeNewChat');
    const cancelNewChat = document.getElementById('cancelNewChat');
    const newChatForm = document.getElementById('newChatForm');
    const chatType = document.getElementById('chatType');
    const obraSelectContainer = document.getElementById('obraSelectContainer');
    
    // Dados simulados de conversas
    const chats = {
        'obra1': {
            name: 'Residencial Flores',
            type: 'obra',
            participants: [
                { id: 1, name: 'João Silva', role: 'Gerente de Projeto', initial: 'J', color: 'blue-600', online: true },
                { id: 2, name: 'Roberto Alves', role: 'Engenheiro Civil', initial: 'R', color: 'red-500', online: true },
                { id: 3, name: 'Maria Santos', role: 'Cliente', initial: 'M', color: 'blue-500', online: false },
                { id: 4, name: 'Carlos Ferreira', role: 'Arquiteto', initial: 'C', color: 'green-500', online: true }
            ],
            messages: [
                { id: 1, sender: 2, text: 'Bom dia equipe! Preciso que alguém verifique o andamento da fundação do bloco B. Há algum relatório disponível?', time: '09:30' },
                { id: 2, sender: 3, text: 'Estive lá ontem, a concretagem foi finalizada e já estão preparando para iniciar a impermeabilização na quinta-feira.', time: '09:45' },
                { id: 3, sender: 1, text: 'Vou preparar um relatório com fotos hoje à tarde e compartilhar com todos. Preciso verificar também a qualidade da concretagem.', time: '10:15' },
                { id: 4, sender: 4, text: 'Ótimo João! Aguardo esse relatório para atualizar o cliente sobre o progresso.', time: '10:30' }
            ]
        },
        'obra2': {
            name: 'Edifício Comercial Centro',
            type: 'obra',
            participants: [
                { id: 1, name: 'João Silva', role: 'Gerente de Projeto', initial: 'J', color: 'blue-600', online: true },
                { id: 5, name: 'Ana Oliveira', role: 'Engenheira', initial: 'A', color: 'purple-500', online: false },
                { id: 4, name: 'Carlos Ferreira', role: 'Arquiteto', initial: 'C', color: 'green-500', online: true }
            ],
            messages: [
                { id: 1, sender: 4, text: 'As medições da estrutura do 3º andar estão prontas. Podemos avançar para a próxima fase.', time: '14:20' },
                { id: 2, sender: 1, text: 'Perfeito! Quando teremos a reunião para discutir o cronograma atualizado?', time: '15:05' },
                { id: 3, sender: 5, text: 'Sugiro quinta-feira às 10h. Todos estão disponíveis?', time: '15:30' },
                { id: 4, sender: 4, text: 'Quinta-feira está ótimo para mim.', time: '15:45' },
                { id: 5, sender: 1, text: 'Confirmado. Vou preparar a pauta e enviar por e-mail.', time: '16:00' }
            ]
        },
        'geral': {
            name: 'Equipe MD Engenharia',
            type: 'team',
            participants: [
                { id: 1, name: 'João Silva', role: 'Gerente de Projeto', initial: 'J', color: 'blue-600', online: true },
                { id: 2, name: 'Roberto Alves', role: 'Engenheiro Civil', initial: 'R', color: 'red-500', online: true },
                { id: 3, name: 'Maria Santos', role: 'Cliente', initial: 'M', color: 'blue-500', online: false },
                { id: 4, name: 'Carlos Ferreira', role: 'Arquiteto', initial: 'C', color: 'green-500', online: true },
                { id: 5, name: 'Ana Oliveira', role: 'Engenheira', initial: 'A', color: 'purple-500', online: false }
            ],
            messages: [
                { id: 1, sender: 5, text: 'Bom dia a todos! Reunião geral segunda-feira às 9h no escritório.', time: '08:30' },
                { id: 2, sender: 1, text: 'Confirmado! Vamos apresentar os novos projetos.', time: '08:45' },
                { id: 3, sender: 2, text: 'Preciso incluir os resultados dos testes de solo?', time: '09:00' },
                { id: 4, sender: 1, text: 'Sim, por favor. Traga também as análises de custo atualizadas.', time: '09:15' }
            ]
        }
    };
    
    // Usuário atual (simulado)
    const currentUser = { id: 1, name: 'João Silva', role: 'Gerente de Projeto', initial: 'J', color: 'blue-600' };
    
    // Chat atualmente ativo
    let currentChat = 'obra1';
    
    // Funções de gerenciamento do chat
    function renderMessages(chatId) {
        if (!chatMessages || !chats[chatId]) return;
        
        // Limpar a área de mensagens
        chatMessages.innerHTML = '';
        
        // Adicionar cabeçalho com data
        const dateHeader = document.createElement('div');
        dateHeader.className = 'text-center my-4';
        dateHeader.innerHTML = '<span class="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Hoje</span>';
        chatMessages.appendChild(dateHeader);
        
        // Renderizar mensagens
        chats[chatId].messages.forEach(message => {
            const sender = chats[chatId].participants.find(p => p.id === message.sender);
            const isCurrentUser = message.sender === currentUser.id;
            
            const messageElement = document.createElement('div');
            messageElement.className = `flex mb-4 ${isCurrentUser ? 'justify-end' : ''}`;
            
            if (isCurrentUser) {
                messageElement.innerHTML = `
                    <div>
                        <div class="flex items-baseline mb-1 justify-end">
                            <span class="text-xs text-gray-500 mr-2">${message.time}</span>
                            <span class="font-medium text-gray-800">Você</span>
                        </div>
                        <div class="chat-message message-out">
                            ${message.text}
                        </div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-${sender.color} flex-shrink-0 flex items-center justify-center text-white ml-2">
                        ${sender.initial}
                    </div>
                `;
            } else {
                messageElement.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-${sender.color} flex-shrink-0 flex items-center justify-center text-white mr-2">
                        ${sender.initial}
                    </div>
                    <div>
                        <div class="flex items-baseline mb-1">
                            <span class="font-medium text-gray-800 mr-2">${sender.name}</span>
                            <span class="text-xs text-gray-500">${message.time}</span>
                        </div>
                        <div class="chat-message message-in">
                            ${message.text}
                        </div>
                    </div>
                `;
            }
            
            chatMessages.appendChild(messageElement);
        });
        
        // Rolar para o fim da conversa
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function updateChatHeader(chatId) {
        const chat = chats[chatId];
        if (!chat) return;
        
        // Atualizar título e informações do chat
        const chatTitle = document.querySelector('.chat-container h3');
        if (chatTitle) {
            chatTitle.textContent = chat.name;
        }
        
        // Atualizar contagem de participantes e online
        const participantsInfo = document.querySelector('.chat-container .text-sm');
        if (participantsInfo) {
            const totalParticipants = chat.participants.length;
            const onlineParticipants = chat.participants.filter(p => p.online).length;
            
            participantsInfo.innerHTML = `
                <span>${totalParticipants} participantes</span>
                <span class="mx-2">•</span>
                <span class="flex items-center">
                    <span class="user-status status-online"></span>
                    ${onlineParticipants} online
                </span>
            `;
        }
    }
    
    function switchChat(chatId) {
        if (!chats[chatId]) return;
        
        // Atualizar chat ativo
        currentChat = chatId;
        
        // Atualizar seleção visual do chat
        chatButtons.forEach(button => {
            const buttonChatId = button.getAttribute('data-chat');
            if (buttonChatId === chatId) {
                button.closest('li').classList.add('bg-blue-50', 'border-l-4', 'border-blue-500');
            } else {
                button.closest('li').classList.remove('bg-blue-50', 'border-l-4', 'border-blue-500');
            }
        });
        
        // Renderizar mensagens e atualizar cabeçalho
        renderMessages(chatId);
        updateChatHeader(chatId);
        
        // Atualizar painel de informações do chat
        updateInfoPanel(chatId);
    }
    
    function sendMessage(text) {
        if (!text.trim() || !chats[currentChat]) return;
        
        // Criar nova mensagem
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + 
                    now.getMinutes().toString().padStart(2, '0');
        
        const newMessage = {
            id: chats[currentChat].messages.length + 1,
            sender: currentUser.id,
            text: text.trim(),
            time: time
        };
        
        // Adicionar ao chat atual
        chats[currentChat].messages.push(newMessage);
        
        // Atualizar visualização
        renderMessages(currentChat);
        
        // Limpar campo de entrada
        messageInput.value = '';
    }
    
    function updateInfoPanel(chatId) {
        const chat = chats[chatId];
        if (!chat) return;
        
        // Atualizar lista de participantes
        const participantsList = document.querySelector('#chatInfoPanel ul');
        if (participantsList) {
            participantsList.innerHTML = '';
            
            chat.participants.forEach(participant => {
                const li = document.createElement('li');
                li.className = 'flex items-center justify-between';
                li.innerHTML = `
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-${participant.color} flex-shrink-0 flex items-center justify-center text-white mr-3">
                            ${participant.initial}
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">${participant.name}${participant.id === currentUser.id ? ' (Você)' : ''}</p>
                            <p class="text-xs text-gray-500">${participant.role}</p>
                        </div>
                    </div>
                    <span class="user-status ${participant.online ? 'status-online' : 'status-offline'}"></span>
                `;
                participantsList.appendChild(li);
            });
        }
    }
    
    // Event Listeners
    
    // Enviar mensagem ao clicar no botão
    if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener('click', function() {
            sendMessage(messageInput.value);
        });
    }
    
    // Enviar mensagem ao pressionar Enter
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(messageInput.value);
            }
        });
    }
    
    // Trocar de chat ao clicar nos botões da lista
    chatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chatId = this.getAttribute('data-chat');
            switchChat(chatId);
        });
    });
    
    // Abrir/fechar painel de informações do chat
    if (btnInfo && chatInfoPanel) {
        btnInfo.addEventListener('click', function() {
            chatInfoPanel.classList.remove('hidden');
        });
    }
    
    if (closeChatInfo && chatInfoPanel) {
        closeChatInfo.addEventListener('click', function() {
            chatInfoPanel.classList.add('hidden');
        });
    }
    
    // Fechar painel ao clicar fora dele
    if (chatInfoPanel) {
        chatInfoPanel.addEventListener('click', function(e) {
            if (e.target === chatInfoPanel) {
                chatInfoPanel.classList.add('hidden');
            }
        });
    }
    
    // Toggle do menu do chat
    if (btnChatMenu && chatMenu) {
        btnChatMenu.addEventListener('click', function() {
            chatMenu.classList.toggle('hidden');
        });
        
        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            const container = document.getElementById('chatMenuContainer');
            if (container && !container.contains(event.target)) {
                chatMenu.classList.add('hidden');
            }
        });
    }
    
    // Modal de novo chat
    if (newChatBtn && newChatModal) {
        newChatBtn.addEventListener('click', function() {
            newChatModal.classList.remove('hidden');
        });
    }
    
    if (closeNewChat && newChatModal) {
        closeNewChat.addEventListener('click', function() {
            newChatModal.classList.add('hidden');
        });
    }
    
    if (cancelNewChat && newChatModal) {
        cancelNewChat.addEventListener('click', function() {
            newChatModal.classList.add('hidden');
        });
    }
    
    // Fechar modal ao clicar fora dele
    if (newChatModal) {
        newChatModal.addEventListener('click', function(e) {
            if (e.target === newChatModal) {
                newChatModal.classList.add('hidden');
            }
        });
    }
    
    // Mostrar/esconder campo de seleção de obra com base no tipo de chat
    if (chatType && obraSelectContainer) {
        chatType.addEventListener('change', function() {
            if (this.value === 'obra') {
                obraSelectContainer.classList.remove('hidden');
            } else {
                obraSelectContainer.classList.add('hidden');
            }
        });
    }
    
    // Submeter formulário de novo chat
    if (newChatForm) {
        newChatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Em uma implementação real, aqui enviaríamos os dados para o servidor
            // para criar uma nova conversa
            
            // Simulando a criação de um novo chat
            alert('Nova conversa criada com sucesso!');
            
            // Fechar o modal
            newChatModal.classList.add('hidden');
            
            // Limpar o formulário
            newChatForm.reset();
            obraSelectContainer.classList.remove('hidden');
        });
    }
    
    // Inicialização
    
    // Renderizar o chat inicial
    renderMessages(currentChat);
    updateChatHeader(currentChat);
}); 