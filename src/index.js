// import _ from "lodash";

// console.log(_.join(["a", "b", "c"], "****"));

// document.addEventListener("click", () => {
//   import(/* webpackPrefetch: true */ "./click.js").then(({ default: func }) => {
//     func();
//   });
// });

// import _ from 'lodash';
// import $ from 'jquery';

// const dom = $('<div>');
// dom.html(_.join(["a", "b", "c"], "****"))
// $('body').append(dom);

// console.log(this);

console.log("this is test");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("serviceWorker success");
      })
      .catch((error) => {
        console.log("serviceWorker error");
      });
  });
}
