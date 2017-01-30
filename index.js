var extractHearingType = function(hearingRow) {
  return hearingRow.querySelectorAll('td')[4].textContent.trim();
};
var isPrelim = function(hearingRow) {
  return extractHearingType(hearingRow) == "PRELIMINARY HEARING";
};
var hearingNodes = function() {
  return document.querySelectorAll('tr[id^="tr_row"]');
};
var nodeListToArray = function(nodeList) {
  var a = [];
  for (var i = 0, l = nodeList.length; i < l; i += 1) {
    a[a.length] = nodeList[i];
  };
  return a;
};
var extractHearings = function() {
  return nodeListToArray(hearingNodes());
};
var extractPrelims = function(hearings) {
  return hearings.filter(isPrelim);
};
var hearings = extractHearings();
var prelims = extractPrelims;
console.log("There are " + hearings.length + " hearings.");
console.log("There are " + prelims.length + " prelims.");
