const { PerformanceObserver, performance } = require('perf_hooks');

var input = require('fs').readFileSync('./numbers.txt', 'utf8');
var lines = input.split('\r\n'); //windows

//criando método de busca binária (considerando que há números repetidos)
Array.prototype.buscaBinaria = function (procurado) {
  let de = 0,
    ate = this.length - 1;

  while (de <= ate) {
    let meio = Math.ceil((de + ate) / 2);

    if (this[meio] === procurado) {
      // procura a primeira ocorrência desse número:
      while (meio > 0) {
        if (this[meio - 1] !== this[meio]) break;
        meio--;
      }
      return meio;
    }
    if (procurado < this[meio]) {
      ate = meio - 1;
    } else {
      de = meio + 1;
    }
  }

  return -1; //se nao achou
};

function main() {
  let testCase = 0;
  while (true) {
    testCase++;

    const l = lines.shift();
    if (l[0] === '0') return;
    let [number, queries] = l.split(' ');
    number = parseInt(number);
    queries = parseInt(queries);

    //lê e empilha
    let vector = [];
    for (let i = 0; i < number; i++) {
      const element = lines.shift();
      vector.push(parseInt(element));
    }

    //ordena
    vector.sort((a, b) => a - b);

    //consultas
    console.log('Iteração %d:', testCase);
    for (let i = 0; i < queries; i++) {
      //lê consulta atual:
      const currentQuery = parseInt(lines.shift());
      //resposta:
      const answer = 1 + vector.buscaBinaria(currentQuery);
      if (answer === 0) {
        console.log(`%d não está na lista.`, currentQuery);
        continue;
      }
      console.log('%d está na posição %d.', currentQuery, answer);
    }
  }
}

const time0 = performance.now();

main(); // <---- Measuring time of function

const time1 = performance.now();
console.log('\n\t» It took ' + (time1 - time0) + ' ms.');
