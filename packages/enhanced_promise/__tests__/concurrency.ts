// FILEPATH: /Users/xmly/Documents/shadow/toolbox/packages/enhanced_promise/src/code/concurrency.test.ts
import { Concurrency } from '@/code/concurrency';
describe('Concurrency', () => {
  it('should respect the concurrency limit', async () => {
    const concurrency = new Concurrency({ limit: 2 });

    const asyncFn = jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve('done'), 1000))
    );

    const monitoredFn = concurrency.monitoringFn(asyncFn);

    const start = Date.now();
    const promises = Array(5).fill(null).map(() => monitoredFn());
    await Promise.all(promises);
    const end = Date.now();

    expect(asyncFn).toHaveBeenCalledTimes(5);
    expect(end - start).toBeGreaterThanOrEqual(3000);
  });
  it('should return correct results', async () => {
    const concurrency = new Concurrency({ limit: 2 });

    const asyncFn = jest.fn().mockImplementation(
      (num) => new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000))
    );

    const monitoredFn = concurrency.monitoringFn(asyncFn);

    const promises = Array(5).fill(null).map((_, index) => monitoredFn(index));
    const results = await Promise.all(promises);

    expect(asyncFn).toHaveBeenCalledTimes(5);
    expect(results).toEqual([0, 2, 4, 6, 8]);
  });
});
