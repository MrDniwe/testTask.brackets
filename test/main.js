const {
    bracketSequence,
    bracketSubst,
    bracketSplit,
} = require('../src/index.js');
const expect = require('chai').expect;

const mocks = [
    {
        sample: '((}{))()[()]',
        expect: '()[()]',
    },
    {
        sample: '(())()[{[[]]}]',
        expect: '[{[[]]}]',
    },
];

describe('Протестируем пограничные случаи', () => {
    it('Когда дана пустая строка - возвращаем пустую строку', () => {
        expect(bracketSequence('')).to.be.equal('');
    });
    it('Когда дана не строка - ожидаем TypeError', () => {
        expect(bracketSequence).to.throw(TypeError);
        expect(() => bracketSequence(123)).to.throw(TypeError);
    });
    it('Когда в строке есть что-то кроме скобок - ожидаем TypeError', () => {
        expect(() => bracketSequence('[1]')).to.throw(TypeError);
    });
});

describe('Тестирование вспомогательного функционала', () => {
    it('Для пустой строки возвращает пустую строку', () => {
        expect(bracketSubst('')).to.be.equal('');
    });
    it('Для строки, начинающейся с закрывающей скобки возвращает пустую строку', () => {
        expect(bracketSubst('}')).to.be.equal('');
        expect(bracketSubst(')}')).to.be.equal('');
    });
    it('Для строки с только открывающими скобками возвращает эту строку', () => {
        expect(bracketSubst('(({[')).to.be.equal('(({[');
    });
    it('Для строки с только открывающими скобками и корректными сочетаниями, возвращает всю строку', () => {
        expect(bracketSubst('(({[]}')).to.be.equal('(({[]}');
    });
    it('Для строки с открывающими скобками и корректными сочетаниями, возвращает строку до первой некорректной скобки', () => {
        expect(bracketSubst('(({[]}]]])))}')).to.be.equal('(({[]}');
    });
    it('Для строки с открывающими скобками и несколькими корректными сочетаниями, разделенными некорректными, возвращает подстроку до первой некорректной скобки', () => {
        expect(bracketSubst('{[()]]()}')).to.be.equal('{[()]');
    });
    it('Для строки с несколькими корректными последовательностями, разделенными некорректными, возвращает массив корректных последовательностей', () => {
        expect(bracketSplit('((()][]}{}))')).to.be.have.members([
            '((()',
            '[]',
            '{}',
        ]);
    });
});

describe('Тестирование основного функционала', () => {
    it('Ожидаем корректные результаты для каждого тест-кейса', () => {
        mocks.map(mock => {
            expect(bracketSequence(mock.sample)).to.be.equal(mock.expect);
        });
    });
});
