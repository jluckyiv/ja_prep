/*jshint esversion: 6 */

import { parseHearings } from './calendar';

var reqListener = function () {
  console.log(this.responseText);
};

var getUrl = function(url, callback) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
};

var needsDisclosure = function(text) {
  return !hasDisclosure(text);
};
var hasDisclosure = function(text) {
  // var text = document.body.textContent;
  return text.includes("DISCLOSURE FILED") || text.includes("COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
};

window.hearings = parseHearings(document.body);
console.log(`There are ${ window.hearings.length} hearings.`);
