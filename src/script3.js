var input = require('fs').readFileSync('./numbers.txt', 'utf8');
var lines = input.split('\r\n'); //Windows

//criando método de busca binária (com repetição)
Array.prototype.buscaBinaria = function (procurado) {
  let de = 0,
    ate = this.length - 1;

  while (de <= ate) {
    let meio = Math.ceil((de + ate) / 2);

    if (this[meio].number === procurado) {
      //encontrou! OBS: meio -1, PQ NESTE PROBLEMA É A CONTAGEM DO ANTERIOR
      return this[meio - 1].count + 1;
      return this[meio].count; //em uma busca binaria normal
    }
    if (procurado < this[meio].number) {
      ate = meio - 1;
    } else {
      de = meio + 1;
    }
  }

  return -1; //se nao achou
};

function insertOriginalFunction(element, array) {
  array.splice(locationOf(element, array) + 1, 0, element);
  return array;
}

function locationOfOriginalFunction(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (end - start <= 1 || array[pivot] === element) return pivot;
  if (array[pivot] < element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

//insere se nao existe no array, incrementa contagem se existe
function insert(element, array) {
  const whereInsert = locationOf(element, array);
  if (array[whereInsert].number === element) {
    array[whereInsert].count++;
    return array;
  }
  array.splice(whereInsert + 1, 0, { number: element, count: 1 });
  return array;
}

function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (end - start <= 1 || array[pivot].number === element) return pivot;
  if (array[pivot].number < element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

function main() {
  let testCase = 0;
  while (true) {
    testCase++;

    const l = lines.shift();
    if (l[0] === '0') return;

    let [number, queries] = l.split(' ');
    number = parseInt(number);
    queries = parseInt(queries);

    //lê e insere
    vector = [{ number: -5, count: 0 }]; //inicializo com um valor inexistente
    for (let i = 0; i < number; i++) {
      const element = parseInt(lines.shift());
      // if (vector[element] > 0) {
      //   repeticoes[element]++;
      //   continue;
      // }
      insert(element, vector);
      // vector.push({ number: element, occurrences: 1 });
    }

    //ordena
    // vector.sort((a, b) => a - b);

    // console.log(vector);
    //já está ordenado. Preciso contar as repetições (PD)
    for (let i = 2; i < vector.length; i++) {
      vector[i].count += vector[i - 1].count;
    }
    //Assim, a posição de um número é vector[i-1].count + 1
    // console.log(vector);

    //consultas
    console.log('Iteração %d:', testCase);
    for (let i = 0; i < queries; i++) {
      //lê consulta atual:
      const currentQuery = parseInt(lines.shift());
      //resposta:
      const found = vector.buscaBinaria(currentQuery);
      if (found === -1) {
        console.log(`%d não está na lista.`, currentQuery);
        continue;
      }
      console.log('%d está na posição %d.', currentQuery, found);
    }
  }
}

main();

console.log();
