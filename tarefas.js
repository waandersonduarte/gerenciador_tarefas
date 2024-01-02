const tarefaForm = document.querySelector('#tarefa');
const dataInicioForm = document.querySelector('#data-inicio');
const dataTerminoForm = document.querySelector('#data-termino');
const horaInicioForm = document.querySelector('#hora-inicio');
const horaTerminoForm = document.querySelector('#hora-termino');
const descricaoForm = document.querySelector('#descricao');
const buttonSubmit = document.querySelector('#submit-register');
const itemsTable = document.querySelector('.items');
const nomeUsuario = document.querySelector('#userName');
const buttonLogout = document.querySelector('#button-logout');
const buttonModal = document.querySelector('.modal-tarefa')

const exibirNomeUsuario = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(usuarioLogado){
        nomeUsuario.textContent = `Olá, ${usuarioLogado.nome}!`;
    }
}
exibirNomeUsuario()

buttonLogout.addEventListener('click', (evento) => {
    window.location.href = 'index.html'

});


const salvarTarefa = (tarefa, dataInicio, dataTermino, horaInicio, horaTermino, descricao, statusTarefa='') => {
    const tarefas = {
        tarefa,
        dataInicio,
        dataTermino,
        horaInicio,
        horaTermino,
        descricao,
        statusTarefa
    };
    const novaTarefa = JSON.parse(localStorage.getItem('tarefa')) || [];
    novaTarefa.push(tarefas);
    localStorage.setItem('tarefa', JSON.stringify(novaTarefa));
}

// Cadastrar Tarefa
buttonSubmit.addEventListener('click', evento => {
    evento.preventDefault();
    if(buttonSubmit.value == 'Criar tarefa'){
        const tarefaValor = tarefaForm.value;
        const dataInicioValor = dataInicioForm.value;
        const dataTerminoValor = dataTerminoForm.value;
        const horaInicioValor = horaInicioForm.value;
        const horaTerminoValor = horaTerminoForm.value;
        const descricaoValor = descricaoForm.value;
    
        salvarTarefa(tarefaValor, dataInicioValor, dataTerminoValor, horaInicioValor, horaTerminoValor, descricaoValor);
        alert('Tarefa cadastrada com sucesso!');
    }
});


const exibirTarefaTabela = () => {
    const dadosTarefa = JSON.parse(localStorage.getItem('tarefa'));

    for(let t = 0; t < dadosTarefa.length; t++){
        const trTarefa = document.createElement('tr');

        const tdTarefa = document.createElement('td');
        const linkModal = document.createElement('p');
        linkModal.setAttribute('data-bs-toggle', 'modal');
        linkModal.setAttribute('data-bs-target', '#exampleModal');
        linkModal.textContent = dadosTarefa[t].tarefa;
        tdTarefa.appendChild(linkModal);
        trTarefa.appendChild(tdTarefa);

        trTarefa.addEventListener('click', () => {
            const nomeTarefaModal = document.querySelector('#exampleModalLabel');
            const descricaoModal = document.querySelector('.modal-body');

            nomeTarefaModal.textContent = dadosTarefa[t].tarefa;
            descricaoModal.textContent = dadosTarefa[t].descricao;
            
        });

        const tdDataInicio = document.createElement('td');
        const dtInicioString = dadosTarefa[t].dataInicio.split('-');
        const dataInicioF = new Date(Date.UTC(parseInt(dtInicioString[0]), parseInt(dtInicioString[1])-1, parseInt(dtInicioString[2])+1));
        const dataIncioFormatada = new Intl.DateTimeFormat('pt-BR').format(dataInicioF);
        tdDataInicio.textContent = `${dataIncioFormatada} às ${dadosTarefa[t].horaInicio}`;
        trTarefa.appendChild(tdDataInicio);
    
        const tdDataTermino = document.createElement('td');
        const dtTerminoString = dadosTarefa[t].dataTermino.split('-');
        const dataTerminoF = new Date(Date.UTC(parseInt(dtTerminoString[0]), parseInt(dtTerminoString[1])-1, parseInt(dtTerminoString[2])+1));
        const dataTerminoFormatada = new Intl.DateTimeFormat('pt-BR').format(dataTerminoF);
        tdDataTermino.textContent = `${dataTerminoFormatada} às ${dadosTarefa[t].horaTermino}`;
        trTarefa.appendChild(tdDataTermino);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = dadosTarefa[t].statusTarefa;
        trTarefa.appendChild(tdStatus);

        // if(dadosTarefa[t].statusTarefa === 'Pendente'){
        //     tdStatus.style.color = 'orange';
        // }else if(dadosTarefa[t].statusTarefa === 'Realizada'){
        //     tdStatus.style.color = 'green';
        // }else if(dadosTarefa[t].statusTarefa === 'Em atraso'){
        //     tdStatus.style.color = 'red';
        // }else if(dadosTarefa[t].statusTarefa === 'Em andamento'){
        //     tdStatus.style.color = 'blue';
        // }

        const dataAtual = new Date();
        console.log(dataAtual)
    
        if(dataInicioF > dataAtual && dadosTarefa[t].statusTarefa != 'Realizada'){
            dadosTarefa[t].statusTarefa = 'Pendente';
            tdStatus.style.color = 'orange';
            localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
        }else if(dataInicioF <= dataAtual && dataTerminoF >= dataAtual && dadosTarefa[t].statusTarefa != 'Realizada'){
            dadosTarefa[t].statusTarefa = 'Em andamento';
            tdStatus.style.color = 'blue';
            localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
        }else if(dataTerminoF < dataAtual && dadosTarefa[t].statusTarefa != 'Realizada'){
            dadosTarefa[t].statusTarefa = 'Em atraso';
            tdStatus.style.color = 'red';
            localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
        }
        if(dadosTarefa[t].statusTarefa === 'Realizada'){
            tdStatus.style.color = 'green';
        }

    
        const tdButtonAlterar = document.createElement('td');
        const buttonAlterar = document.createElement('button');
        buttonAlterar.setAttribute('class', 'btn btn-warning');
        buttonAlterar.textContent = 'Alterar';
        tdButtonAlterar.appendChild(buttonAlterar);
        trTarefa.appendChild(tdButtonAlterar);

        tdButtonAlterar.addEventListener('click', evento => {
            evento.preventDefault();

            tarefaForm.value = dadosTarefa[t].tarefa;
            dataInicioForm.value = dadosTarefa[t].dataInicio;
            dataTerminoForm.value = dadosTarefa[t].dataTermino;
            horaInicioForm.value = dadosTarefa[t].horaInicio;
            horaTerminoForm.value = dadosTarefa[t].horaTermino;
            descricaoForm.value = dadosTarefa[t].descricao;

            buttonSubmit.setAttribute('value', 'Alterar');
            let buttonAlterarTarefa = buttonSubmit
            
            buttonAlterarTarefa.addEventListener('click', () => {
                dadosTarefa[t].tarefa = tarefaForm.value;
                dadosTarefa[t].dataInicio = dataInicioForm.value;
                dadosTarefa[t].dataTermino = dataTerminoForm.value;
                dadosTarefa[t].horaInicio = horaInicioForm.value;
                dadosTarefa[t].horaTermino = horaTerminoForm.value;
                dadosTarefa[t].descricao = descricaoForm.value;
                localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
                alert('Tarefa atualizada com sucesso!');
            });
            
            const addButtonExcluir = document.createElement('input');
            addButtonExcluir.setAttribute('type', 'submit');
            addButtonExcluir.setAttribute('value', 'Excluir');
            addButtonExcluir.setAttribute('class', 'btn btn-danger');
            
            const addButtonMarcarRealizada = document.createElement('input');
            addButtonMarcarRealizada.setAttribute('type', 'submit');
            addButtonMarcarRealizada.setAttribute('value', 'Marcar como Realizada');
            addButtonMarcarRealizada.setAttribute('class', 'btn btn-success');
            
            const addButtonCancelar = document.createElement('input');
            addButtonCancelar.setAttribute('type', 'submit');
            addButtonCancelar.setAttribute('value', 'Cancelar');
            addButtonCancelar.setAttribute('class', 'btn btn-dark');
            
            const addButtonHtml = document.querySelector('.opcoes-button');
            addButtonHtml.appendChild(addButtonExcluir);
            addButtonHtml.appendChild(document.createTextNode('\u00A0')); // Adicionando espaço
            addButtonHtml.appendChild(addButtonMarcarRealizada);
            addButtonHtml.appendChild(document.createTextNode('\u00A0')); // Adicionando espaço
            addButtonHtml.appendChild(addButtonCancelar);

            addButtonExcluir.addEventListener('click', evento => {
                evento.preventDefault();
                if (t !== -1) {
                    dadosTarefa.splice(t, 1); // Remove o elemento do array
                    localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
                }else{
                    alert("Erro ao tentar excluir!")
                }
            });

            addButtonMarcarRealizada.addEventListener('click', evento => {
                evento.preventDefault();
                dadosTarefa[t].statusTarefa = 'Realizada';
                tdStatus.style.color = 'green';
                localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
                localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
            });
            
            if(dadosTarefa[t].statusTarefa === 'Realizada'){
                addButtonMarcarRealizada.setAttribute('value', 'Marcar como não Realizada');
                const buttonNaoRealizada = addButtonMarcarRealizada;

                buttonNaoRealizada.addEventListener('click', () => {
                    
                    if(dataInicioF > dataAtual && dadosTarefa[t].statusTarefa === 'Realizada'){
                        dadosTarefa[t].statusTarefa = 'Pendente';
                        localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
                    }else if(dataInicioF <= dataAtual && dataTerminoF >= dataAtual && dadosTarefa[t].statusTarefa === 'Realizada'){
                        dadosTarefa[t].statusTarefa = 'Em andamento';
                        localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
                    }else if(dataTerminoF < dataAtual && dadosTarefa[t].statusTarefa === 'Realizada'){
                        dadosTarefa[t].statusTarefa = 'Em atraso';
                        localStorage.setItem('tarefa', JSON.stringify(dadosTarefa)); // Atualiza o localStorage
                    }
                    
                });
            }
        });

        itemsTable.appendChild(trTarefa);
    }
}
exibirTarefaTabela();
