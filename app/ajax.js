/*jshint esversion: 6 */

const logResponse = function () {
  console.log(this.responseText);
};

const get = function(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'document';
  xhr.addEventListener('load', callback);
  xhr.open('GET', url);
  xhr.send();
};

let Ajax = {};
Ajax.get = get;

export { Ajax };
