import {FlagCultureLangPipe} from './flag-culture-lang.pipe';

describe('FlagCultureLangPipe', () => {
  it('create an instance', () => {
    const pipe = new FlagCultureLangPipe();
    expect(pipe).toBeTruthy();
  });
  it('convert to culture lang', () => {
    const word = 'en-US';
    const expected = 'us';
    expect(new FlagCultureLangPipe().transform(word)).toEqual(expected);
  });
});
