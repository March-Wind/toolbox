import { calculateLCS } from '../src/code/longest_common_substring';

describe('calculateLCS', () => {
  // 测试字符串输入
  describe('with string inputs', () => {
    it('should handle empty strings', () => {
      const result = calculateLCS('', '');
      expect(result).toEqual({ length: 0, sequence: [] });
    });

    it('should handle strings with no common subsequence', () => {
      const result = calculateLCS('abc', 'def');
      expect(result).toEqual({ length: 0, sequence: [] });
    });

    it('should find longest common subsequence in strings', () => {
      const result = calculateLCS('abcde', 'ace');
      expect(result).toEqual({ length: 3, sequence: ['a', 'c', 'e'] });
    });

    it('should handle identical strings', () => {
      const result = calculateLCS('hello', 'hello');
      expect(result).toEqual({
        length: 5,
        sequence: ['h', 'e', 'l', 'l', 'o'],
      });
    });
  });

  // 测试字符串数组输入
  describe('with string array inputs', () => {
    it('should handle empty arrays', () => {
      const result = calculateLCS([], []);
      expect(result).toEqual({ length: 0, sequence: [] });
    });

    it('should handle arrays with no common subsequence', () => {
      const result = calculateLCS(['a', 'b', 'c'], ['d', 'e', 'f']);
      expect(result).toEqual({ length: 0, sequence: [] });
    });

    it('should find longest common subsequence in string arrays', () => {
      const result = calculateLCS(['a', 'b', 'c', 'd', 'e'], ['a', 'c', 'e']);
      expect(result).toEqual({
        length: 3,
        sequence: ['a', 'c', 'e'],
      });
    });
  });

  // 测试对象数组输入
  describe('with object array inputs', () => {
    it('should handle empty object arrays', () => {
      const result = calculateLCS([], []);
      expect(result).toEqual({ length: 0, sequence: [] });
    });

    it('should compare objects by id when available', () => {
      const arr1 = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' },
      ];
      const arr2 = [
        { id: 1, name: 'Johnny' }, // Different name but same id
        { id: 4, name: 'Alice' },
        { id: 3, name: 'Bobby' }, // Different name but same id
      ];
      const result = calculateLCS(arr1, arr2);
      expect(result).toEqual({
        length: 2,
        sequence: [
          { id: 1, name: 'John' },
          { id: 3, name: 'Bob' },
        ],
      });
    });

    it('should compare full objects when id is not available', () => {
      const arr1 = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];
      const arr2 = [
        { name: 'John', age: 30 },
        { name: 'Bob', age: 35 },
      ];
      const result = calculateLCS(arr1, arr2);
      expect(result).toEqual({
        length: 1,
        sequence: [{ name: 'John', age: 30 }],
      });
    });
  });

  // 测试错误情况
  describe('error cases', () => {
    it('should throw error for mismatched input types', () => {
      expect(() => {
        calculateLCS('abc' as any, ['a', 'b', 'c'] as any);
      }).toThrow('Invalid input types or mismatched input types');
    });
  });
});
