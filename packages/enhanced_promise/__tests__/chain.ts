// FILEPATH: /Users/xmly/Documents/shadow/toolbox/packages/enhanced_promise/src/code/chain.test.ts
import { chain } from '@/code/chain';
describe('chain', () => {
  it('should resolve with correct results when all promises resolve', async () => {
    const promiseFns = [
      { fetch: () => Promise.resolve('result1'), assessment: () => true },
      { fetch: () => Promise.resolve('result2'), assessment: () => true },
    ];
    const result = await chain(promiseFns);
    expect(result).toEqual([{ success: 'result1' }, { success: 'result2' }]);
  });

  it('should reject with correct results when a promise rejects', async () => {
    const promiseFns = [
      { fetch: () => Promise.resolve('result1'), assessment: () => true },
      { fetch: () => Promise.reject('error'), assessment: () => true },
    ];
    try {
      await chain(promiseFns);
    } catch (result) {
      expect(result).toEqual([{ success: 'result1' }, { fail: 'error' }]);
    }
  });

  it('should stop chaining when assessment returns false', async () => {
    const promiseFns = [
      { fetch: () => Promise.resolve('result1'), assessment: () => true },
      { fetch: () => Promise.resolve('result2'), assessment: () => false },
      { fetch: () => Promise.resolve('result3'), assessment: () => true },
    ];
    const result = await chain(promiseFns).catch((e) => e);
    expect(result).toEqual([{ success: 'result1' }, { success: 'result2' }]);
  });
});
