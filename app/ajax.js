/*jshint esversion: 6 */

const logResponse = function () {
  console.log(this.responseText);
};

const get = function(url, callback) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', callback);
  oReq.open('GET', url);
  oReq.send();
};

let Ajax = {};
Ajax.get = get;

export { Ajax };
