var extractHearingType = function(hearingRow) {
  return hearingRow.querySelectorAll('td')[4].textContent.trim();
};
var isPrelim = function(hearingRow) {
  return extractHearingType(hearingRow) == "PRELIMINARY HEARING";
};
var hearings = document.querySelectorAll('tr[id^="tr_row"]');
var prelims = hearings.filter(isPrelim);
console.log("There are " + hearings.length + " hearings.");
console.log("There are " + prelims.length + " prelims.");
