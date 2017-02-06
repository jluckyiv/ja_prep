/*jshint esversion: 6 */

const logResponse = function () {
  console.log(this.responseText);
};

const get = function(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', callback);
  xhr.open('GET', url);
  xhr.send();
  xhr.responseType = 'document';
};

let Ajax = {};
Ajax.get = get;

export { Ajax };
