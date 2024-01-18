type PromiseState = 'pending' | 'fulfilled' | 'rejected'
/**
 * 获取Promise状态
 * @param {Promise<unknown>} p
 * @return {*}  {Promise<PromiseState>}
 */
const getPromiseState = function (p: Promise<unknown>): Promise<PromiseState> {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t) ? "pending" : "fulfilled", () => "rejected");
}
export { getPromiseState };
// const a = Promise.resolve();
// const b = Promise.reject();
// const c = new Promise(() => { });

// promiseState(a).then(state => console.log(state)); // fulfilled
// promiseState(b).then(state => console.log(state)); // rejected
// promiseState(c).then(state => console.log(state)); // pending
