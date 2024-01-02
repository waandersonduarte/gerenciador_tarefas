const nomeForm = document.querySelector('#nome-register');
const emailForm = document.querySelector('#email-register');
const passwordForm = document.querySelector('#password-register');
const buttonSubmit = document.querySelector('#submit-register');

const emailLogin = document.querySelector('#email-login');
const passwordLogin = document.querySelector('#password-login');
const buttonSubmitLogin = document.querySelector('#submit-login');

const nomeUsuario = document.querySelector('#userName');

const salvarUsuario = (nome, email, senha) => {
    const usuario = {
        nome,
        email,
        senha
    };
    const novoUsuario = JSON.parse(localStorage.getItem('usuario')) || [];

    novoUsuario.push(usuario);
    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
}
// Cadastrar
buttonSubmit.addEventListener('click', evento => {
    evento.preventDefault()
    const nomeValor = nomeForm.value;
    const emailValor = emailForm.value;
    const senhaValor = passwordForm.value;

    salvarUsuario(nomeValor, emailValor, senhaValor);
    alert('Usuário cadastrado com sucesso!');

    nomeForm.value = '';
    emailForm.value = '';
    passwordForm.value = '';
});

// Login
buttonSubmitLogin.addEventListener('click', evento => {
    evento.preventDefault();
    const emailValor = emailLogin.value;
    const senhaValor = passwordLogin.value;

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    let usuarioEncontrado = false;
    for(let user = 0; user < usuarioSalvo.length; user++){
        if(usuarioSalvo[user].email === emailValor && usuarioSalvo[user].senha === senhaValor){
            usuarioEncontrado = true;
            const nome = usuarioSalvo[user].nome;
            const email = usuarioSalvo[user].email;
            const senha = usuarioSalvo[user].senha;
            const usuarioLogado = {nome, email, senha};
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            window.location.href = `tarefas.html`;
            break;
        }
    }
    if(!usuarioEncontrado){
        alert('E-mail ou senha incorreto!');
    }
});