interface RetryOptions {
  times?: number;
  delay?: number;
  assessment?: (type: 'then' | 'catch', data: any) => Promise<boolean>; //会在them和catch的最顶层回调，返回true表示需要重试，如果不传assessment，只有catch才重试
}
const assessmentRetry = 'ASSESSMENT_RETRY';

/**
 * promise 失败重试
 *
 * @param {() => Promise<any>} promiseFn
 * @param {RetryOptions} options
 * @return {*}  {Promise<any>}
 */
const retry = <T>(promiseFn: () => Promise<T>, options: RetryOptions): Promise<T> => {
  const { times = 5, delay = 0, assessment } = options;
  const loopBody = (countDown: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      const actuator = () =>
        promiseFn()
          .then(async (res) => {
            const needRetry =
              assessment &&
              (await assessment('then', res).catch(() => {
                return false;
              }));
            if (needRetry) {
              return Promise.reject({ type: assessmentRetry, data: res });
            }
            return resolve(res);
          })
          .catch(async (error) => {
            if (countDown <= 1) {
              return reject(
                error?.type === assessmentRetry
                  ? { reason: '一直评估失败', data: error.data }
                  : { reason: '尝试次数用尽', error },
              );
            } else {
              const needRetry =
                !assessment ||
                (await assessment('catch', error).catch(() => {
                  return false;
                }));
              if (needRetry) {
                return loopBody(countDown - 1)
                  .then(resolve)
                  .catch(reject);
              } else {
                return reject({ reason: '评估为不用重试，直接返回错误', error });
              }
            }
          });

      // 首次请求或没有延时时间的情况，直接执行
      if (countDown === times || !delay) {
        actuator();
      } else {
        setTimeout(() => actuator(), delay);
      }
    });
  };
  return loopBody(times);
};
export { retry };
