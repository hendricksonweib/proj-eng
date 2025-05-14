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
    
    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validação básica
            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simulação de login
            console.log('Login com:', { email, password, remember });
            
            // Em produção, aqui seria feita uma requisição ao servidor
            // para autenticar o usuário e obter um token de acesso
            
            // Simulação de sucesso
            alert('Login realizado com sucesso!');
            
            // Redirecionamento
            window.location.href = 'obras.html';
        });
    }

    // Autenticação com Google
    const googleButton = document.querySelector('button.w-full:nth-child(1)');
    
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // Em produção, aqui seria iniciado o fluxo de autenticação OAuth com o Google
            console.log('Iniciando login com Google');
            
            // Simulação de sucesso
            alert('Login com Google em desenvolvimento. Tente o login tradicional por e-mail e senha.');
        });
    }
    
    // Autenticação com Microsoft
    const microsoftButton = document.querySelector('button.w-full:nth-child(2)');
    
    if (microsoftButton) {
        microsoftButton.addEventListener('click', function() {
            // Em produção, aqui seria iniciado o fluxo de autenticação OAuth com a Microsoft
            console.log('Iniciando login com Microsoft');
            
            // Simulação de sucesso
            alert('Login com Microsoft em desenvolvimento. Tente o login tradicional por e-mail e senha.');
        });
    }

    // Recuperação de senha (redirecionamento para página específica)
    const forgotPasswordLink = document.querySelector('a[href="recuperar-senha.html"]');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Em produção, redirecionaria para a página de recuperação de senha
            console.log('Redirecionando para recuperação de senha');
            
            // Simulação - apenas para demonstração
            alert('Funcionalidade de recuperação de senha em desenvolvimento.');
        });
    }
    
    // Auto-preenchimento de campos (demonstração)
    // Em produção, isso seria feito automaticamente pelo navegador
    // ou recuperado de um localStorage/cookie persistente
    function preencherCamposSalvos() {
        // Verificar se há informações salvas
        const savedEmail = localStorage.getItem('savedEmail');
        
        if (savedEmail && document.getElementById('email')) {
            document.getElementById('email').value = savedEmail;
            if (document.getElementById('remember')) {
                document.getElementById('remember').checked = true;
            }
        }
    }
    
    // Chamar para preencher os campos salvos, se houver
    preencherCamposSalvos();
}); 