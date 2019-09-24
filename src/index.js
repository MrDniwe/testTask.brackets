module.exports = {
  bracketSequence,
};

function bracketSequence(data) {
  if (typeof data !== 'string') throw new TypeError('Not a string');
  if (!data) return '';
  const openingBrackets = '({[';
  const closingBrackets = {
    ']': '[',
    ')': '(',
    '}': '{',
  };
  let stack = [];
  const sequences = [];
  let currentSequence = [];
  let ss = '';
  console.log('data: ', data);
  for (let i = 1; i <= data.length - 1; i++) {
    // Если это открывающая скобка - добавляем ее в стек и в текущую последовательность
    if (openingBrackets.includes(data.charAt(i))) {
      stack.push(data.charAt(i));
      if (ss) {
        currentSequence.push(ss);
        ss = '';
      }
      continue;
    }

    // Если это вообще не скобка - выбрасываем исключение
    if (!closingBrackets[data.charAt(i)]) {
      throw new TypeError('String includes non-bracket character');
    }

    // Если это закрывающая скобка и на вершине стека находится не соответствующая ей скобка
    if (stack.pop() != closingBrackets[data.charAt(i)]) {
      // обнуляем стек
      stack = [];
      // если есть текущая правильная последовательность - считаем ее законченной
      sequences.push(currentSequence.join(''));
      ss = '';
      continue;
    }

    // Если это закрывающая скобка и на вершине стека есть соответствующая ей
    ss = closingBrackets[data.charAt(i)] + ss + data.charAt(i);
    // Если стек опустел, запишем последовательность
    if (!stack.length) currentSequence.push(ss);
  }
  sequences.push(currentSequence.join(''));
  console.log(sequences);
  const maxlen = Math.max.apply(
    null,
    sequences.map(sequence => sequence.length),
  );
  return sequences.find(sequence => sequence.length === maxlen);
}
