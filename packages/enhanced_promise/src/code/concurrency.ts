interface Options {
  limit: number;
}
/**
 * pomise并发器
 * 在Concurrency程序中加上debug顺序就变了，是因为debug的时间内异步任务也还在执行，这个时候可能已经执行好了，后面的异步任务还没执行，自然后面的任务就排在后面执行好了进入等待被调用状态
 * @class Concurrency
 */
class Concurrency {
  protected options: Options;
  protected ongoingStack: Promise<unknown>[] = [];
  protected prepareStock: Function[] = [];
  protected all: any[] = [];
  constructor(options?: Options) {
    const defaultOptions = {
      limit: 5,
    };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }
  monitoringFn<T extends (...args: any[]) => Promise<unknown>>(fn: T): T {
    const _this = this;
    return function (...args: Parameters<T>): ReturnType<T> {
      return new Promise((resolve, reject) => {
        const { limit } = _this.options;
        if (_this.ongoingStack.length < limit) {
          const p = fn(...args);
          p.then(
            (res) => {
              resolve(res);
            },
            (error) => {
              reject(error);
            },
          ).finally(() => {
            _this.polling(p);
          });
          _this.ongoingStack.push(p);
          _this.all.push(p);
        } else {
          const wrapFn = () => {
            const p = fn(...args);
            p.then(
              (res) => {
                resolve(res);
              },
              (error) => {
                reject(error);
              },
            ).finally(() => {
              _this.polling(p);
            });
            _this.all.push(p);
            return p;
          };
          _this.prepareStock.push(wrapFn);
        }
      }) as unknown as ReturnType<T>; // 貌似typescript 不识别
    } as unknown as T; // 貌似typescript 不识别
  }
  polling(p: Promise<unknown>) {
    const index = this.ongoingStack.findIndex((item) => p === item);
    this.ongoingStack.splice(index, 1);
    const { limit } = this.options;
    if (this.ongoingStack.length < limit && this.prepareStock.length) {
      const wrapFn = this.prepareStock.shift();
      this.ongoingStack.push(wrapFn!());
    }
  }
}


export default Concurrency;
