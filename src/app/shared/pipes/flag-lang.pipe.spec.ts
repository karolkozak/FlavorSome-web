import {FlagLangPipe} from './flag-lang.pipe';

describe('FlagLangPipe', () => {
  it('create an instance', () => {
    const pipe = new FlagLangPipe();
    expect(pipe).toBeTruthy();
  });
  it('convert to lang from en-US', () => {
    const word = 'en-US';
    const expected = 'en';
    expect(new FlagLangPipe().transform(word)).toEqual(expected);
  });
  it('convert to lang from pl', () => {
    const word = 'pl';
    expect(new FlagLangPipe().transform(word)).toEqual(word);
  });
});
