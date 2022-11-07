const { greet, double } = require('./util');

describe('#greet', () => {
    test('should return a string', () => {
        const now = new Date();
        const result = greet(now);
        expect(result).toMatch('Good');
    });

    test('should return a morning greeting for a morning date', () => {
        const date = new Date('2022-01-01 03:21:00');
        const result = greet(date);
        expect(result).toBe('Good morning');
    });

    test('should return an afternoon greeting for an afternoon date', () => {
        const date = new Date('2022-01-01 13:21:00');
        const result = greet(date);
        expect(result).toBe('Good afternoon');
    });

    test('should return a night greeting for a night date', () => {
        const date = new Date('2022-01-01 19:25:09');
        const result = greet(date);
        expect(result).toBe('Good night');
    });

    test('should throw an error when given no argument', () => {
        expect(() => {
            greet();
        }).toThrow('Not a valid date');
    });

    test('should throw an error when not given a valid date', () => {
        expect(() => {
            greet(['hello']);
        }).toThrow('Not a valid date');
    });
});

describe('#double', () => {
    it('should return the number doubled', () => {
        return double(6).then((result) => {
            expect(result).toBe(12);
        });
    });

    it('should throw an error when passed a non-number', () => {
        expect.assertions(1);

        return double('hello').catch((error) => {
            expect(error).toBe('Not a valid number');
        });
    });
});
