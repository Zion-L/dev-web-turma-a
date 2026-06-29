window.onload = function () {

    const input = this.document.getElementById("tarefaInput");
    const btnAdicionar = this.document.getElementById("btnAdicionar");
    const lista = this.document.getElementById("ListaTarefas")

    btnAdicionar.addEventListener("click", () => {

        const texto = input.value.trim();

        //Criar um elemento da minha lista de tarefas
        const li = this.document.createElement("Li");

        //Adicionar o valor do input no meu item da lista
        li.textContent = texto;

        //Criação do botao remover
        const btnRemover = this.document.createElement("button");
        btnRemover.textContent = "x";
        btnRemover.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(btnRemover);


        //Adiciona o item na lista para ser apresentado
        lista.appendChild(li);
l
        input.value = "";

        
    });
};