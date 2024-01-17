import { isFunction } from '@marchyang/lib-core';
type PromiseFn = () => Promise<unknown>;
interface ChainItem {
  fetch: PromiseFn;
  assessment: (response: unknown) => boolean;
}
type PromiseItem = PromiseFn | ChainItem;
/**
 * 链式调用
 * @param {PromiseItem[]} promiseFns
 * @param {ContinueCondition} [condition='success']
 * @return {*}  {Promise<unknown>}
 */
const chain = (promiseFns: PromiseItem[]): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const result: { success?: any, fail?: any }[] = [];
    const loopBody = (index: number) => {
      if (promiseFns.length <= index) {
        return;
      }
      const item = promiseFns[index]!;
      const promiseFn = isFunction(item) ? item : item.fetch;
      const assessment = isFunction(item) ? () => true : item.assessment;
      promiseFn()
        .then((response: any) => {
          result[index] = { success: response };
          if (promiseFns.length === index + 1) {
            return resolve(result);
          }
          if (assessment(response)) {
            loopBody(index + 1);
          } else {
            reject(result);
          }
        })
        .catch((error: any) => {
          result[index] = { fail: error };
          reject(result);
        });
    };
    loopBody(0);
  });
};
export { chain };
