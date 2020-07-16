const { PerformanceObserver, performance } = require('perf_hooks');

var input = require('fs').readFileSync('./numbers.txt', 'utf8');
var lines = input.split('\r\n'); //windows

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
      const answer = 1 + vector.indexOf(currentQuery);
      if (answer === 0) {
        console.log(`%d não está na lista.`, currentQuery);
        continue;
      }
      console.log('%d está na posição %d.', currentQuery, answer);
    }
  }
}

let t0 = performance.now();

main(); // <---- Measuring time of function

let t1 = performance.now();
console.log('\n\t» It took ' + (t1 - t0) + ' ms.');
