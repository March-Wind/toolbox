import { retry } from "@/code/retry";
// Add these tests to your existing test file

describe('retry function', () => {
  let mockFn: jest.Mock;

  beforeEach(() => {
    mockFn = jest.fn();
  });

  test('should retry the specified number of times', async () => {
    mockFn.mockRejectedValue(new Error('Error'));
    try {
      await retry(mockFn, { times: 3 })
    } catch (error) {
      expect(mockFn).toHaveBeenCalledTimes(3);
    }
  });

  test('should stop retrying if the promise is resolved', async () => {
    mockFn.mockRejectedValueOnce(new Error('Error')).mockResolvedValueOnce('Success');
    const result = await retry(mockFn, { times: 3 });
    expect(result).toBe('Success');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test('should delay the specified amount of time between retries', async () => {
    mockFn.mockRejectedValue(new Error('Error'));
    const startTime = Date.now();
    try {
      await retry(mockFn, { times: 3, delay: 1000 });
    } catch (error) {
      const endTime = Date.now();
      expect(endTime - startTime).toBeGreaterThanOrEqual(2000);
    }
  });

  test('should use the assessment function to decide whether to retry', async () => {
    const assessment = jest.fn().mockReturnValue(false);
    mockFn.mockRejectedValue(new Error('Error'));
    try {
      await retry(mockFn, { times: 3, assessment });
    } catch (error) {
      expect(assessment).toHaveBeenCalledTimes(1);
    }
  });
});
