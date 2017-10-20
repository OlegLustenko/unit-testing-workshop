import { add } from './add';

xdescribe('test add function', () => {
  describe('second module', () => {
    it('should add two numbers', () => {
      // expect
      expect(add(10, 20)).toEqual(30);
    });
    it('should add number plus string', () => {
      // expect
      const expected =
        'hello easy code10';
      expect(
        add(10, 'hello easy code')
      ).toEqual(expected);
    });

    it('TODO add coverage for add NaN values', () => {
      expect(true).toBe(false);
    });
  });
});
