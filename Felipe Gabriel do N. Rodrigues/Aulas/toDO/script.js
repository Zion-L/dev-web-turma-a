window.onload = function () {

    const input = this.document.getElementById("tarefaInput");
    const btnAdicionar = this.document.getElementById("btnAdicionar");
    const lista = this.document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", () => {

        //recupera o valor do campo input text!
        const texto = input.value.trim();

        //Criar um elemento da minha lista (constante = não pretendo variar!)
        const li = this.document.createElement("li");

        //Adicionar o valor do input no meu item da lista.
        li.textContent = texto;

        //Adicionando click para riscar a tarefa!
        li.addEventListener("click", () => {
            li.classList.toggle("concluida");
        });

        //Criando Botão para remover as li!
        const btnRemover = this.document.createElement("Button");
        btnRemover.textContent = "x";

        //adicionando a classe de estilo do botão fechar!
        btnRemover.classList.add("fechar");
        btnRemover.addEventListener("click", () => {
            li.remove();
        });

        //adicionando botão "X" na li!
        li.appendChild(btnRemover);

        //Adiciona o item na lista para ser apresentado.
        lista.appendChild(li);

        //limpa valor após adição.
        input.value = "";

    });
};