import {UpperCasePipe} from './upper-case.pipe';

describe('UpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new UpperCasePipe();
    expect(pipe).toBeTruthy();
  });
  it('do word upper case', () => {
    const word = 'ToUpperCase';
    const expected = 'TOUPPERCASE';
    expect(new UpperCasePipe().transform(word)).toEqual(expected);
  });
  it('do sentence upper case', () => {
    const word = 'To upper case.';
    const expected = 'TO UPPER CASE.';
    expect(new UpperCasePipe().transform(word)).toEqual(expected);
  });
});
