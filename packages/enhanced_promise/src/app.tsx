// import React from 'react';
// import ReactDOM from 'react-dom';
// import { RouterProvider } from 'react-router-dom';
// import router from './routes';
// import { Provider } from 'react-redux';
// import store from './store';
// // import App from './page/home/index';

// ReactDOM.render(
//   <Provider store={store}>
//     {/* <Routes /> */}
//     <RouterProvider router={router} />
//   </Provider>,
//   document.getElementById('root'),
// );

import { retry } from './code/retry';

const p1 = () => Promise.reject('error');

retry(p1, { times: 2 })
  .then((res) => {
    console.log(res);
    debugger;
  })
  .catch((err) => {
    console.log(err);
    debugger;
  });
