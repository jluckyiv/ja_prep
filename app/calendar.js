var nodeListToArray = function(nodeList) {
  var a = [];
  for (var i = 0, l = nodeList.length; i < l; i += 1) {
    a[a.length] = nodeList[i];
  };
  return a;
};

var hearingNodes = function(node) {
  return document.querySelectorAll('tr[id^="tr_row"]');
};

var extractHearings = function(node) {
  return nodeListToArray(hearingNodes(node));
};

export { extractHearings };
