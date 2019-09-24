module.exports = {
    bracketSequence,
    bracketSubst,
};

function bracketSequence(data) {
    if (typeof data !== 'string') throw new TypeError('Not a string');
    return '';
}

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
