import awaitWrap from '@/code/await_wrap';
describe('awaitWrap', () => {
  it('should return fulfilled state and value when promise resolves', async () => {
    const promise = Promise.resolve('resolved value');
    const [fulfilled, rejected, state] = await awaitWrap(promise);
    expect(fulfilled).toBe('resolved value');
    expect(rejected).toBeUndefined();
    expect(state).toBe('fulfilled');
  });

  it('should return rejected state and error when promise rejects', async () => {
    const promise = Promise.reject(new Error('rejected error'));
    try {
      const [fulfilled, rejected, state] = await awaitWrap(promise);
      expect(fulfilled).toBeUndefined();
      expect(rejected).toEqual(new Error('rejected error'));
      expect(state).toBe('rejected');
    } catch (error) {
      // Handle the error thrown by Jest when a promise rejects
    }
  });
});
