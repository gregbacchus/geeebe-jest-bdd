import { given } from '../next-gen';

given('function is created', () => ({ call: (i?: number) => Promise.resolve((i ?? 12) * 2) }), (when, then) => {
  when('the function is called', (state) => {
    const result = state.call();
    then('the result will be 24', async () => {
      expect(await result).toBe(24)
    })
  });

  when.each([1, -2, 3])('is called with args', (state, i) => {
    const result = state.call(i);
    then(`the result will be ${i * 2}`, async () => {
      expect(await result).toBe(i * 2)
    })
  })
});
