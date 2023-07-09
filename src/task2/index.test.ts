import {defaultArguments} from './index';

function add(a: number, b: number): number {
    return a + b;
}

test('function should return 19 when default b is 9 and a is 10', () => {
    const add2 = defaultArguments(add, {b: 9});
    expect(add2(10)).toBe(19);
});

test('function should return 17 when a is 10 and b is 7', () => {
    const add2 = defaultArguments(add, {b: 9});
    expect(add2(10, 7)).toBe(17);
});

test('function should return NaN when no arguments are provided', () => {
    const add2 = defaultArguments(add, {b: 9});
    expect(add2()).toBe(NaN);
});

test('function should return 13 when default a is 2 and b is 3, and a is 10', () => {
    const add2 = defaultArguments(add, {b: 9});
    const add3 = defaultArguments(add2, {b: 3, a: 2});
    expect(add3(10)).toBe(13);
});

test('function should return 5 when default a is 2 and b is 3', () => {
    const add2 = defaultArguments(add, {b: 9});
    const add3 = defaultArguments(add2, {b: 3, a: 2});
    expect(add3()).toBe(5);
});

test('function should return NaN when default c is 3 and a is 10', () => {
    const add4 = defaultArguments(add, {c: 3});
    expect(add4(10)).toBe(NaN);
});

test('function should return 20 when a is 10 and b is 10', () => {
    const add4 = defaultArguments(add, {c: 3});
    expect(add4(10, 10)).toBe(20);
});

test('function should return 19 when default a is 10 and b is 9', () => {
    const add2 = defaultArguments(add, {b: 9});
    const add5 = defaultArguments(add2, {a: 10});
    expect(add5()).toBe(19);
});
