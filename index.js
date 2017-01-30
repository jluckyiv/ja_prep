var extractHearingType = function(hearingRow) {
  return hearingRow.querySelectorAll('td')[4].textContent.trim();
};
var isPrelim = function(hearingRow) {
  return extractHearingType(hearingRow) == "PRELIMINARY HEARING";
};
var extractHearings = function() {
  var hearings = [];
  var hearingNodes = document.querySelectorAll('tr[id^="tr_row"]');
  for (var i = 0, l = hearingNodes.length; i < l; i += 1) {
    hearings[hearings.length] = hearingNodes[i];
  };
};
var hearings = extractHearings();
var prelims = hearings.filter(isPrelim);
console.log("There are " + hearings.length + " hearings.");
console.log("There are " + prelims.length + " prelims.");
