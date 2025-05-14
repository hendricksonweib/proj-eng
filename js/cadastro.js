document.addEventListener('DOMContentLoaded', function() {
    // Toggle de visibilidade da senha
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Alterar o ícone
            const icon = togglePassword.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    }
    
    // Validação de força da senha
    const password = document.getElementById('password');
    
    if (password) {
        password.addEventListener('input', function() {
            const value = this.value;
            
            // Verificar requisitos
            const hasMinLength = value.length >= 8;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            
            // Exibir feedback (poderia ser visual com cores/barras)
            const feedbackElement = this.parentElement.nextElementSibling;
            
            if (feedbackElement) {
                if (!hasMinLength) {
                    feedbackElement.textContent = 'A senha deve ter pelo menos 8 caracteres';
                    feedbackElement.classList.remove('text-green-500');
                    feedbackElement.classList.add('text-red-500');
                } else if (!hasUpperCase) {
                    feedbackElement.textContent = 'A senha deve incluir pelo menos uma letra maiúscula';
                    feedbackElement.classList.remove('text-green-500');
                    feedbackElement.classList.add('text-red-500');
                } else if (!hasNumber) {
                    feedbackElement.textContent = 'A senha deve incluir pelo menos um número';
                    feedbackElement.classList.remove('text-green-500');
                    feedbackElement.classList.add('text-red-500');
                } else {
                    feedbackElement.textContent = 'Senha forte!';
                    feedbackElement.classList.remove('text-red-500');
                    feedbackElement.classList.add('text-green-500');
                }
            }
        });
    }
    
    // Validação de confirmação de senha
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (password && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (password.value !== this.value) {
                this.setCustomValidity('As senhas não coincidem');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const empresa = document.getElementById('empresa').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termos = document.getElementById('termos').checked;
            
            // Validação adicional
            if (!nome || !sobrenome || !email || !password || !confirmPassword) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem.');
                return;
            }
            
            if (!termos) {
                alert('Você precisa aceitar os Termos de Serviço e Política de Privacidade.');
                return;
            }
            
            // Verificar a força da senha
            const hasMinLength = password.length >= 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            
            if (!hasMinLength || !hasUpperCase || !hasNumber) {
                alert('Sua senha não atende aos requisitos mínimos de segurança.');
                return;
            }
            
            // Simulação de cadastro
            console.log('Cadastro com:', { nome, sobrenome, email, empresa, password, termos });
            
            // Em produção, aqui seria feita uma requisição ao servidor
            // para criar a conta do usuário
            
            // Simulação de sucesso
            alert('Cadastro realizado com sucesso! Você será redirecionado para a área de obras.');
            
            // Redirecionamento
            window.location.href = 'obras.html';
        });
    }

    // Autenticação com Google
    const googleButton = document.querySelector('button.w-full:nth-child(1)');
    
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // Em produção, aqui seria iniciado o fluxo de autenticação OAuth com o Google
            console.log('Iniciando cadastro com Google');
            
            // Simulação de sucesso
            alert('Cadastro com Google em desenvolvimento. Tente o cadastro tradicional.');
        });
    }
    
    // Autenticação com Microsoft
    const microsoftButton = document.querySelector('button.w-full:nth-child(2)');
    
    if (microsoftButton) {
        microsoftButton.addEventListener('click', function() {
            // Em produção, aqui seria iniciado o fluxo de autenticação OAuth com a Microsoft
            console.log('Iniciando cadastro com Microsoft');
            
            // Simulação de sucesso
            alert('Cadastro com Microsoft em desenvolvimento. Tente o cadastro tradicional.');
        });
    }
    
    // Validação de email em tempo real
    const email = document.getElementById('email');
    
    if (email) {
        email.addEventListener('blur', function() {
            if (this.value) {
                // Validar formato do email usando regex
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
                
                if (!isValid) {
                    // Mostrar feedback visual
                    this.classList.add('border-red-500');
                    
                    // Criar mensagem de erro se não existir
                    let errorMessage = this.nextElementSibling;
                    
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'text-red-500 text-xs mt-1 error-message';
                        this.parentNode.appendChild(errorMessage);
                    }
                    
                    errorMessage.textContent = 'Por favor, insira um endereço de e-mail válido.';
                } else {
                    // Remover feedback visual de erro
                    this.classList.remove('border-red-500');
                    
                    // Remover mensagem de erro se existir
                    const errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                    
                    // Em produção, poderia verificar se o email já está cadastrado
                    // através de uma chamada API
                }
            }
        });
    }
}); 