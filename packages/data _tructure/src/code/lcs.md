## 最长公共子序列

    > 不同于最长公共子串。子序列不要求连续，只要保持相对顺序即可。比如 "ABC" 的子序列可以是 "AC"，而 "AC" 不是 "ABC" 的子串。

### 最优子结构

    1. 如果最后一个字符相同，那这个字符一定在最长公共子序列中
      - 因为加入这个字符一定能让序列更长

    2. 如果最后一个字符不同，那最长公共子序列一定是：
      - 要么不包含 str1 的最后一个字符
      - 要么不包含 str2 的最后一个字符
      - 取这两种情况的最大值

    3. 每个子问题的解都基于更小规模的子问题：
      - dp[i][j] 只依赖于 dp[i-1][j-1], dp[i-1][j], dp[i][j-1]
      - 这保证了我们可以自底向上构建解

### 假设求取“AEBD”和“ABCD”的最长公共子序列，使用动态规划表来解决这个问题，步骤就是如下

#### 创建一个 (m+1) × (n+1) 的表格，初始值都是0；dp[i][j] 表示 str1 的前 i 个字符和 str2 的前 j 个字符的最长公共子序列长度

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 0   | 0   |
| 0   | 0   | 0   | 0   | 0   |
| 0   | 0   | 0   | 0   | 0   |
| 0   | 0   | 0   | 0   | 0   |
| 0   | 0   | 0   | 0   | 0   |

#### 思维模型对应如下。逻辑：如果当前字符相同 (`str1[i-1] === str2[j-1]`),那么前一个对比状态上`dp[i][j] = dp[i-1][j-1] + 1`;如果当前字符不同，那么`dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`

```
        i0  i1  i2  i3  i4
             A   E   B   D
j0       0   0   0   0   0
j1    A  0   1   1   1   1
j2    B  0   1   1   2   2
j3    C  0   1   1   2   2
j4    D  0   1   1   2   3


```

### 问答：

- 为什么当前字符不同，要执行`dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`

  假设我们在比较字符串 "ABC" 和 "ADB"：

  1.  当我们发现两个字符不相同时（比如 'C' 和 'B'），我们有两个选择：

  - 要么放弃 str1 的当前字符（'C'），使用 str1 的前一个状态和 str2 的当前状态 (dp[i-1][j])
  - 要么放弃 str2 的当前字符（'B'），使用 str2 的前一个状态和 str1 的当前状态 (dp[i][j-1])

  2.  举个具体例子：

  ```
    ''  A  D  B
  '' 0  0  0  0
  A  0  1  1  1
  B  0  1  1  2
  C  0  1  1  2
  ```

  当我们处理到 C 和 B 时（不相等）：

  - dp[i-1][j] 代表 "AB" 和 "ADB" 的 LCS 长度 = 2
  - dp[i][j-1] 代表 "ABC" 和 "AD" 的 LCS 长度 = 1

  我们取较大值 2，因为：

  - 这意味着我们选择了保留已经找到的更长的公共子序列（"AB"）
  - 而不是选择一个更短的结果

  3.  这样做的本质是：

  - 当前字符不匹配时，我们需要找到已经计算出的最优解
  - 通过选择较大的值，我们确保保留了已找到的最长公共子序列
  - 这就是为什么要取 Math.max(dp[i-1][j], dp[i][j-1])

  这是动态规划的核心思想之一：利用已经计算出的最优子结构来构建当前状态的最优解。

### 实践&总结

实践：ABED 和 EABD

```
        i0  i1  i2  i3  i4
             A   B   E   D
j0       0   0   0   0   0
j1    E  0   0   0   1   1
j2    A  0   1   1   1   2
j3    B  0   1   2   2   2
j4    D  0   1   2   2   3


```

总结：双层循环模拟了逐个增加字符的过程，模拟了最优子结构的过程，矩阵记录下了增长之前的最长子序列的长度。
