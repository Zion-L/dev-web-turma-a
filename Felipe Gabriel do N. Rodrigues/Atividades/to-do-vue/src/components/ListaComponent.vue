<template>

  <div>

<!--  -->
    <div id="adicionar-tarefa"> <!-- Div onde se encontra o input para adicionar a tarefa e o botão de adicionar! -->

      <input type="text" v-model="input_tarefa" placeholder="Informe a tarefa aqui!">
      <!-- <input type="submit" value="Adicionar Tarefa" @click="submitAdicionar"> -->
      <button id="botaoAdicionarTarefa" type="button" @click="submitAdicionar">Adicionar Tarefa</button>

    </div>

    <div id="lista-vue"> <!-- DIV da lista propriamente dita, usando v-for para poder repetir adição de tarefas, span para marcar conclusão na lista e botão de remover-->
      <ul>
        <li v-for="(Tarefa, index) in Tarefas_lista" v-bind:key="index">

          <span :class="{ tarefaConcluida: Tarefa.concluido }" @click="Tarefa.concluido = !Tarefa.concluido">
            {{ Tarefa.nomeTarefa }}
          </span>
          <button id="botaoRemover" v-on:click="RemoverTarefa(index)">X</button>

        </li>
      </ul>
    </div>

  </div>

</template>

<script> 
export default {
  name: 'ListaComponent',
  components: {

  },
  data() { // Aqui na data(return) adicionei a lista de tarefas como um array para armazenar as tarefas e o input que será utilizado para adicionar a tarefa na lista!
    return {
      Tarefas_lista: [],
      input_tarefa: "",
    }
  },
  methods: { // Aqui nos metodos temos o submit para poder adicionar a lista na tarefa e ver se a tarefa está (conclusa - tracejada ou não) e o remover tarefas com splice para poder escolher qual tarefa remover!
    submitAdicionar(e) {

      e.preventDefault();

      if (this.input_tarefa !== "") {
        this.Tarefas_lista.push({ nomeTarefa: this.input_tarefa, concluido: false });

        this.input_tarefa = "";
      }

    },

    RemoverTarefa(index) {
      this.Tarefas_lista.splice(index, 1)
    },
  }
}

</script>

<!-- Aqui usei 2 styles, o scoped (restrito ao componente e estilizar a maioria das coisas) e o normal para ser global e estilizar o fundo e o título!  -->
<style scoped>  

.tarefaConcluida {
  text-decoration: line-through;
  color: gray
}

#lista-vue {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: cadetblue;
  padding: 16px;
}

#adicionar-tarefa {
  text-align: center;
  margin-bottom: 20px;
}

Input {
  padding: 8px;
  width: 250px;
  border-radius: 2px;
  border: none;
}

#botaoAdicionarTarefa {
  padding: 8px 12px;
  margin-left: 5px;
  background-color: gold;
  color: black;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

#botaoAdicionarTarefa:hover {
  transition: 0.5s;
  background-color: rgb(0, 0, 0);
  color: gold;
}

ul {
  padding: 0px;
}

li {
  background-color: gold;
  margin: 16px 16px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

#botaoRemover {
  background-color: white;
  border-radius: 100px;
  border: none;
}
</style>

<style>

body {

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: cadetblue;
  padding: 16px;
}

h1 {
  color: gold;
  text-align: center;
}

</style>

<!-- Referências -->

<!-- Para realizar a atividade vi vídeos do canal: https://youtu.be/h8Z-pRhe-dw?si=C3vRSmymJFL2Zd1t, arquivos de aulas(pdfs,códigos passados,etc) e o site passado pelo professor, além da IA Gemini! -->

<!-- Também fiz a reutilização de códigos para estilizar igual a atividade to-do sem vue! -->