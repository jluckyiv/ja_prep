var reqListener = function () {
  console.log(this.responseText);
}

var getUrl = function(url, callback) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
}

var hasDisclosure = function(text) {
  // var text = document.body.textContent;
  return text.includes("DISCLOSURE FILED") || text.includes("COURT DISCLOSES");
};

var extractHearingType = function(hearingRow) {
  return hearingRow
    .querySelectorAll('td')[4]
    .textContent
    .trim();
};

var extractCaseReportLink = function(hearingRow) {
  return hearingRow
    .querySelectorAll('td')[2]
    .querySelector('a')
    .href
    .replace('criminalcalendar', 'criminalcasereport');
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
var prelimLinks = prelims.map(extractCaseReportLink);
prelimLinks.forEach(function(link) {
  getUrl(link, hasDisclosure(this.responseText));
});

console.log("There are " + hearings.length + " hearings.");
console.log("There are " + prelims.length + " prelims.");
