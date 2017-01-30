var getUrl = function(url, callback) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
}

var extractHearingType = function(hearingRow) {
  return hearingRow.querySelectorAll('td')[4].textContent.trim();
};
var extractCaseReportLink = function(hearingRow) {
  var link = hearingRow.querySelectorAll('td')[2].querySelector('a').href.replace('criminalcalendar', 'criminalcasereport');
  console.log(link);
  return link;
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
var filterPrelims = function(hearings) {
  return hearings.filter(isPrelim);
};
var hearings = extractHearings();
var prelims = filterPrelims(hearings);
var prelimLinks = prelims.forEach(extractCaseReportLink(element));
console.log("There are " + hearings.length + " hearings.");
console.log("There are " + prelims.length + " prelims.");
console.log(prelimLinks);
