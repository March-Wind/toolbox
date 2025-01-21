// 添加类型定义和类型守卫
type ValidInput = string | string[] | Record<string, any>[];

function isString(value: ValidInput): value is string {
  return typeof value === 'string';
}

function isStringArray(value: ValidInput): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isObjectArray(value: ValidInput): value is Record<string, any>[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null);
}

function areItemsEqual(item1: any, item2: any): boolean {
  if (typeof item1 !== typeof item2) return false;

  if (typeof item1 === 'object' && item1 !== null && item2 !== null) {
    if ('id' in item1 && 'id' in item2) {
      return item1.id === item2.id;
    }
    // 使用更高效的对象比较方法
    return (
      Object.keys(item1).length === Object.keys(item2).length &&
      Object.keys(item1).every((key) => item1[key] === item2[key])
    );
  }

  return item1 === item2;
}

interface LCSResult<T> {
  length: number;
  sequence: T[];
}

interface DPCell {
  length: number;
  sequence: any[];
}

/**
 * Calculates the longest common substring between two inputs of the same type.
 * For object arrays with 'id' field, comparison is done based on id equality.
 * The returned sequence contains objects from the first input array.
 * @throws {Error} If inputs are of different types or null/undefined
 */
export function calculateLCS<T extends ValidInput>(
  input1: T,
  input2: T,
): LCSResult<T extends (infer U)[] ? U : string> {
  if (input1 === null || input2 === null || input1 === undefined || input2 === undefined) {
    throw new Error('Inputs cannot be null or undefined');
  }

  // 如果是字符串，直接使用字符串比较
  if (isString(input1) && isString(input2)) {
    const m = input1.length;
    const n = input2.length;
    const dp: DPCell[][] = Array(m + 1)
      .fill(0)
      .map(() =>
        Array(n + 1)
          .fill(0)
          .map(() => ({ length: 0, sequence: [] })),
      );

    let maxLength = 0;
    let maxCell: DPCell = { length: 0, sequence: [] };

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (input1[i - 1] === input2[j - 1]) {
          dp[i][j] = {
            length: dp[i - 1][j - 1].length + 1,
            sequence: [...dp[i - 1][j - 1].sequence, input1[i - 1]],
          };
          if (dp[i][j].length > maxLength) {
            maxLength = dp[i][j].length;
            maxCell = dp[i][j];
          }
        } else {
          dp[i][j] = { length: 0, sequence: [] };
        }
      }
    }

    return {
      length: maxCell.length,
      sequence: maxCell.sequence,
    } as LCSResult<any>;
  }

  // 如果是数组（字符串数组或对象数组），逐项比较
  if ((isStringArray(input1) && isStringArray(input2)) || (isObjectArray(input1) && isObjectArray(input2))) {
    const m = input1.length;
    const n = input2.length;
    const dp: DPCell[][] = Array(m + 1)
      .fill(0)
      .map(() =>
        Array(n + 1)
          .fill(0)
          .map(() => ({ length: 0, sequence: [] })),
      );

    let maxLength = 0;
    let maxCell: DPCell = { length: 0, sequence: [] };

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (areItemsEqual(input1[i - 1], input2[j - 1])) {
          dp[i][j] = {
            length: dp[i - 1][j - 1].length + 1,
            sequence: [...dp[i - 1][j - 1].sequence, input1[i - 1]],
          };
          if (dp[i][j].length > maxLength) {
            maxLength = dp[i][j].length;
            maxCell = dp[i][j];
          }
        } else {
          dp[i][j] = { length: 0, sequence: [] };
        }
      }
    }

    return {
      length: maxCell.length,
      sequence: maxCell.sequence,
    } as LCSResult<any>;
  }

  throw new Error('Invalid input types or mismatched input types');
}
