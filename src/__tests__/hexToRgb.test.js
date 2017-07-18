import { hexToRgb } from '../chromaLibs';

test('expects that 0f0 is green', () => {
  expect(hexToRgb('#0f0')).toMatchObject({r:0,g:255,b:0});
});

test('expects that f00 is red', () => {
    expect(hexToRgb('#f00')).toMatchObject({r:255,g:0,b:0});
});

test('expects that 00f is blue', () => {
  expect(hexToRgb('#00f')).toMatchObject({r:0,g:0,b:255});
});

test('expects that fff is white', () => {
    expect(hexToRgb('#fff')).toMatchObject({r:255,g:255,b:255});
});

test('testing long hex colors', () => {
    expect(hexToRgb('#c105ed')).toMatchObject({r:193,g:5,b:237});
});

test('testing long hex colors', () => {
    expect(hexToRgb('#c0ffee')).toMatchObject({r:192,g:255,b:238});
});

test('testing long hex colors', () => {
    expect(hexToRgb('#10aded')).toMatchObject({r:16,g:173,b:237});
});

test('testing long hex colors', () => {
    expect(hexToRgb('#zzz')).toBeNull();
});