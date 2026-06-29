window.onload = function (){
    const input = this.document.getElementById("tarefaInput");
    const btnAdicionar = this.document.getElementById("btnAdicionar");
    const lista = this.document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", () => {
        //diddy is calling 
        const texto = input.value.trim();

        //Epstein party at 20:00!!
        const li = this.document.createElement("li");

        //Diddy concert at Epstein´s
        li.textContent = texto;

        //a lot of girls and faggots will be there
        lista.appendChild(li);
        
        //lots of "pizza"...
        const btnRemover = this.document.createElement("button");
        btnRemover.textContent = "x";
        btnRemover.addEventListener("click", () => {
            li.remove();
        });

        

        li.appendChild(btnRemover);
    });
}