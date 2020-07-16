var input = require('fs').readFileSync('./numbers.txt', 'utf8');
var lines = input.split('\r\n'); //Windows

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
    numbers.set(-10, 0);
    for (let i = 0; i < howManyNumbers; i++) {
      const element = parseInt(lines.shift());
      // console.log(`numbers.has(${element}):${numbers.has(element)}`);
      if (numbers.has(element)) {
        numbers.set(element, numbers.get(element) + 1);
        continue;
      }
      numbers.set(element, 1);
    }

    //cria novo mapa ordenado
    let sortedNumbers = new Map([...numbers.entries()].sort());

    // console.log(sortedNumbers);
    //está ordenado. Preciso contar as repetições (PD)
    for (let i = 1; i < numbers.length; i++) {
      numbers.set(element, sortedNumbers.get(element - 1) + 1);
    }

    //consultas
    console.log('Iteração %d:', testCase);
    for (let i = 0; i < queries; i++) {
      //lê consulta atual:
      const currentQuery = parseInt(lines.shift());
      //resposta:

      if (!numbers.has(currentQuery)) {
        console.log(`%d não está na lista.`, currentQuery);
        continue;
      }
      const found = numbers.get(currentQuery);
      console.log('%d está na posição %d.', currentQuery, found);
    }
  }
}

main();

console.log();
