// FILEPATH: /Users/xmly/Documents/shadow/toolbox/packages/enhanced_promise/src/code/get_promise_state.test.ts
import { getPromiseState } from '@/code/get_promise_state';

describe('getPromiseState', () => {
  it('should return "fulfilled" for a resolved promise', async () => {
    const resolvedPromise = Promise.resolve();
    const state = await getPromiseState(resolvedPromise);
    expect(state).toBe('fulfilled');
  });

  it('should return "rejected" for a rejected promise', async () => {
    const rejectedPromise = Promise.reject();
    try {
      await getPromiseState(rejectedPromise);
    } catch (error) {
      expect(error).toBe('rejected');
    }
  });

  it('should return "pending" for a pending promise', async () => {
    const pendingPromise = new Promise(() => { });
    const state = await getPromiseState(pendingPromise);
    expect(state).toBe('pending');
  });
});
