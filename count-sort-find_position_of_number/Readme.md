Criando e comparando diferentes scripts que realizam a mesma tarefa:
- Leitura de diversos números inteiros, ordenando-os em uma lista;
- Leitura diversos números, consultando se existem na lista e, se existem, informar qual a posição de sua primeira ocorrência;

Para realizar essas tarefas, os scripts criados seguem o seguinte protocolo:
- Lêem 2 números (separados por um espaço):
  - O primeiro indica a quantidade de números a serem inseridos na lista.
  - O segundo indica a quantidade de consultas a essa lista;
- Lêem os números a serem inseridos na lista, um por linha
- Lêem os números a serem consultados na lista, um por linha
- Retornam ao primeiro passo, porém para quando for digitado 0 nesse passo

O script1.js seguiu a seguinte estratégia:
1) Empilha todos os números em um vetor;
2) Ordena o vetor;
3) Faz as consultas de posição usando uma busca linear no vetor;

O script2.js seguiu a seguinte estratégia:
1) Insere um par no vetor, já na posição correta, em que a chave é o número, o valor é a sua quantidade de ocorrências:
   - Não precisa de um passo para ordenar o vetor, pois já insere cada número na posição correta;
   - Usa uma estratégia de divisão e conquista na busca pela posição de um número a ser inserido;
2) Percorre o vetor para calcular a posição de cada número;
3) Faz as consultas de posição utilizando uma busca binária no vetor;

O script3.js seguiu a seguinte estratégia:
1) Utiliza a estrutura de dados Map para inserir o número como chave, e suas ocorrências como valor;
2) Cria um novo Map ordenado a partir do primeiro;
3) Percorre o Map para calcular a posição de cada número;
4) Faz as consultas de posição utilizando funções nativas do Map.