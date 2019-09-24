const {bracketSequence} = require('../src/index.js');
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

describe('We should firstly test our function for edge cases', () => {
    it('When empty string given: expecting empty string', () => {
        expect(bracketSequence('')).to.be.equal('');
    });
    it('When not a string given: expecting TypeError', () => {
        expect(bracketSequence).to.throw(TypeError);
        expect(() => bracketSequence(123)).to.throw(TypeError);
    });
    it('If the string contains non-brackets chars, expecting TypeError', () => {
        expect(() => bracketSequence('[1]')).to.throw(TypeError);
    });
});

describe('Testing common functionality', () => {
    it('Should give expected results for each of mock cases', () => {
        mocks.map(mock => {
            expect(bracketSequence(mock.sample)).to.be.equal(mock.expect);
        });
    });
});
