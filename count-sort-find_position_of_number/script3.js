const { PerformanceObserver, performance } = require('perf_hooks');

var input = require('fs').readFileSync('./numbers.txt', 'utf8');
var lines = input.split('\r\n'); //windows

function main() {
  let testCase = 0;
  while (true) {
    testCase++;

    const l = lines.shift();
    if (l[0] === '0') return;

    let [howManyNumbers, queries] = l.split(' ');
    howManyNumbers = parseInt(howManyNumbers);
    queries = parseInt(queries);

    //lê e insere
    let numbers = new Map();
    numbers.set(-10, 1); //inicializa valor inexistente
    for (let i = 0; i < howManyNumbers; i++) {
      const element = parseInt(lines.shift());
      // console.log(`numbers.has(${element}):${numbers.has(element)}`);
      if (numbers.has(element)) {
        numbers.set(element, numbers.get(element) + 1);
        continue;
      }
      numbers.set(element, 1);
    }

    //cria novo map ordenado
    let sortedNumbers = new Map(
      [...numbers.entries()].sort((a, b) => a[0] - b[0])
    );

    // console.log(sortedNumbers); //teste
    //após ordenado, preciso contar as repetições
    let last = 0;
    // let currentValue = 0;
    for (let [key, value] of sortedNumbers) {
      sortedNumbers.set(key, last);
      // const currentValue = sortedNumbers.get(key); // = value + last + 1
      last = value + last;
    }

    //consultas
    console.log('Iteração %d:', testCase);
    for (let i = 0; i < queries; i++) {
      //lê consulta atual:
      const currentQuery = parseInt(lines.shift());

      //responde às consultas:
      if (!sortedNumbers.has(currentQuery)) {
        console.log(`%d não está na lista.`, currentQuery);
        continue;
      }
      const found = sortedNumbers.get(currentQuery);
      console.log('%d está na posição %d.', currentQuery, found);
    }
  }
}

const time0 = performance.now();

main(); // <---- Measuring time of function

const time1 = performance.now();
console.log('\n\t» It took ' + (time1 - time0) + ' ms.');
