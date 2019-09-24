const _ = require('lodash');
module.exports = {
  bracketSequence,
  bracketSubst,
  bracketSplit,
  bracketReverse,
};

function bracketSequence(data) {
  if (typeof data !== 'string') throw new TypeError('Not a string');
  if (!data) return '';
  let resversedSub = _.compact(
    bracketSplit(data).map(item =>
      bracketReverse(bracketSubst(bracketReverse(item))),
    ),
  );
  const maxlen = Math.max.apply(null, resversedSub.map(item => item.length));
  return resversedSub.find(item => item.length == maxlen);
}

// принимает строку, возвращает последовательность открывающих и корректно закрывающих скобок, до первой некорректной закрывающей скобки
function bracketSubst(data) {
  if (!data) return '';
  const openingBrackets = '({[';
  const closingBrackets = {
    ']': '[',
    ')': '(',
    '}': '{',
  };
  let stack = [];
  let ss = '';
  for (let i = 0; i <= data.length - 1; i++) {
    // Если это открывающая скобка - добавляем ее в стек и в текущую последовательность
    if (openingBrackets.includes(data.charAt(i))) {
      stack.push(data.charAt(i));
      ss += data.charAt(i);
      continue;
    }
    // Если это вообще не скобка - выбрасываем исключение
    if (!closingBrackets[data.charAt(i)]) {
      throw new TypeError('String includes non-bracket character');
    }
    // Если это закрывающая скобка и на вершине стека находится не соответствующая ей скобка
    if (stack.pop() != closingBrackets[data.charAt(i)]) {
      return ss;
    }
    // Если это закрывающая скобка и на вершине стека есть соответствующая ей
    ss += data.charAt(i);
  }
  return ss;
}

// принимает строку, возвращает массив, из последовательностей bracketSubst
function bracketSplit(data) {
  if (!data) return [];
  let currentSegment = bracketSubst(data);
  if (!currentSegment) return bracketSplit(data.substr(1));
  return _.compact([
    currentSegment,
    ...bracketSplit(data.substr(currentSegment.length)),
  ]);
}

// Обращает заданную строку со скобками задом наперед
function bracketReverse(data) {
  const dict = {'(': ')', '[': ']', '{': '}', ')': '(', ']': '[', '}': '{'};
  return data
    .split('')
    .reverse()
    .map(s => dict[s])
    .join('');
}
