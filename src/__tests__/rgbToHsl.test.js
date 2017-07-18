import { rgbToHsl } from '../chromaLibs';

test('expects that 0f0 is green', () => {
  expect(rgbToHsl(255,0,0)).toEqual(expect.arrayContaining([0,1,0.5]));
});
test('expects that 0f0 is green', () => {
  expect(rgbToHsl(255,255,0)).toEqual(expect.arrayContaining([0.16666666666666666,1,0.5]));
});
test('expects that 0f0 is green', () => {
  expect(rgbToHsl(0,0,0)).toEqual(expect.arrayContaining([0,0,0]));
});
test('expects that 0f0 is green', () => {
  expect(rgbToHsl(10,20,30)).toEqual(expect.arrayContaining([0.5833333333333334,0.5,0.0784313725490196]));
});
test('expects that 0f0 is green', () => {
  expect(rgbToHsl(255,255,255)).toEqual(expect.arrayContaining([0,0,1]));
});
test('expects that 0f0 is green', () => {
  expect(rgbToHsl(40,255,200)).toEqual(expect.arrayContaining([0.4573643410852713,1,0.5784313725490196]));
});
