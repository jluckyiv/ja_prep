/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*jshint esversion: 6 */

var insertAfter = function insertAfter(newNode, referenceNode) {
  var parent = referenceNode.parentNode;
  var next = referenceNode.nextElementSibling;
  parent.insertBefore(newNode, next);
};

var removeNode = function removeNode(node) {
  if (node) {
    node.parentNode.removeChild(node);
  }
};

var toArray = function toArray(nodeList, callback) {
  var a = [];
  for (var i = 0, l = nodeList.length; i < l; i += 1) {
    if (callback) {
      a[a.length] = callback(nodeList[i]);
    } else {
      a[a.length] = nodeList[i];
    }
  }
  return a;
};

var NodeHelpers = {};
NodeHelpers.insertAfter = insertAfter;
NodeHelpers.removeNode = removeNode;
NodeHelpers.toArray = toArray;

exports.NodeHelpers = NodeHelpers;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = undefined;

var _ajax = __webpack_require__(2);

var _casereport = __webpack_require__(3);

var _nodeHelpers = __webpack_require__(0);

var _urls = __webpack_require__(4);

/*jshint esversion: 6 */

var HEARING_NODE_SELECTOR = 'tr[id^="tr_row"]';
var hearingNodes = function hearingNodes(node) {
  return document.querySelectorAll(HEARING_NODE_SELECTOR);
};
var hearingRow = function hearingRow(hearing) {
  return document.getElementById(hearing.nodeId);
};
var infoRow = function infoRow(hearing) {
  return document.getElementById(hearing.infoNodeId);
};

var infoButtonCell = function infoButtonCell(hearing) {
  return infoRow(hearing).children[0];
};
var infoButton = function infoButton(hearing) {
  return infoRow(hearing).children[0].children[0];
};
var infoCell = function infoCell(hearing) {
  return infoRow(hearing).children[1];
};

var setButtonText = function setButtonText(text, hearing) {
  infoButton(hearing).textContent = text;
};
var disableButton = function disableButton(hearing) {
  infoButton(hearing).disabled = true;
};
var enableButton = function enableButton(hearing) {
  infoButton(hearing).disabled = false;
};
var setInfoText = function setInfoText(text, hearing) {
  infoCell(hearing).textContent = text;
};

var deleteInfoRow = function deleteInfoRow(hearing) {
  return _nodeHelpers.NodeHelpers.removeNode(infoRow(hearing));
};
var createInfoRow = function createInfoRow(hearing) {
  var row = document.createElement('tr');
  row.id = hearing.infoNodeId;
  row.setAttribute('class', 'hearing-info');
  return row;
};

var createInfoButtonCell = function createInfoButtonCell(hearing) {
  var buttonCell = document.createElement('td');
  buttonCell.setAttribute('class', 'info-button-cell');
  buttonCell.setAttribute('valign', 'top');
  return buttonCell;
};

var createInfoButton = function createInfoButton(hearing) {
  var button = document.createElement('button');
  button.textContent = 'Info';
  button.setAttribute('class', 'info-button');
  button.addEventListener('click', function () {
    getInfo(hearing);
  }, false);
  return button;
};

var createInfoCell = function createInfoCell(hearing) {
  var infoCell = document.createElement('td');
  infoCell.setAttribute('class', 'info-cell');
  infoCell.colSpan = '6';
  return infoCell;
};

var appendInfoRow = function appendInfoRow(hearing) {
  deleteInfoRow(hearing);

  var hearingNode = hearingRow(hearing);
  var row = createInfoRow(hearing);
  var buttonCell = createInfoButtonCell(hearing);
  var button = createInfoButton(hearing);
  var infoCell = createInfoCell(hearing);

  buttonCell.appendChild(button);
  row.appendChild(buttonCell);
  row.appendChild(infoCell);
  row.style.display = hearingNode.style.display;
  _nodeHelpers.NodeHelpers.insertAfter(row, hearingNode);
};

var createInfoRows = function createInfoRows(hearings, callback) {
  hearings.forEach(function (hearing) {
    appendInfoRow(hearing);
    if (callback) {
      callback(hearing);
    }
  });
};

var parseHearing = function parseHearing(node) {
  var timeIndex = 0;
  if (document.querySelector('.table-results tr th').textContent.trim() === "Heard") {
    timeIndex = 1;
  }
  var hearing = {};
  hearing.nodeId = node.id;
  hearing.infoNodeId = 'info_' + node.id;
  hearing.time = node.children[timeIndex].textContent.trim();
  hearing.casenumber = node.children[timeIndex + 1].textContent.trim();
  hearing.name = node.children[timeIndex + 2].textContent.trim();
  hearing.defnbr = node.children[timeIndex + 1].querySelector('a').href.match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[timeIndex + 3].textContent.trim();
  hearing.charges = node.children[timeIndex + 4].textContent.trim();
  hearing.urls = _urls.Urls.urls(hearing);
  return hearing;
};

var parseHearings = function parseHearings(node) {
  return _nodeHelpers.NodeHelpers.toArray(hearingNodes(node), parseHearing);
};

var updateInfoText = function updateInfoText(hearing) {
  var info = hearing.info;
  setInfoText('', hearing);
  if (info) {
    _nodeHelpers.NodeHelpers.removeNode(infoCell(hearing).querySelector('div'));

    var infoDiv = document.createElement('div');
    var needsDisclosure = _casereport.CaseReport.needsDisclosure(info);

    var disclosureEl = document.createElement('p');
    disclosureEl.textContent = _casereport.CaseReport.needsDisclosure(info) ? 'Needs disclosure.' : 'Disclosure given';
    infoDiv.appendChild(disclosureEl);

    var terminations = _casereport.CaseReport.terminations(info);
    if (terminations) {
      (function () {
        var terminationsEl = document.createElement('ul');
        terminations.forEach(function (termination) {
          var li = document.createElement('li');
          li.textContent = termination.date + ' ';
          var a = document.createElement('a');
          a.href = termination.imageUrl;
          a.textContent = termination.description;
          a.target = '_blank';
          li.appendChild(a);
          terminationsEl.appendChild(li);
        });
        infoDiv.appendChild(terminationsEl);
      })();
    }

    var proofs = _casereport.CaseReport.proofs(info);
    if (proofs) {
      (function () {
        var proofsEl = document.createElement('ul');
        proofs.forEach(function (proof) {
          var li = document.createElement('li');
          li.textContent = proof.date + ' ';
          var a = document.createElement('a');
          a.href = proof.imageUrl;
          a.textContent = proof.description;
          a.target = '_blank';
          li.appendChild(a);
          proofsEl.appendChild(li);
        });
        infoDiv.appendChild(proofsEl);
      })();
    }

    var deadlines = _casereport.CaseReport.deadlines(info);
    if (deadlines) {
      (function () {
        var deadlinesEl = document.createElement('ul');
        deadlinesEl.style.listStyle = 'none';
        deadlines.forEach(function (deadline) {
          var li = document.createElement('li');
          var number = document.createElement('span');
          li.appendChild(number);
          var description = document.createElement('span');
          li.appendChild(description);
          li.textContent = deadline.number + '. ' + deadline.description;
          li.style.textIndent = '-2em';
          deadlinesEl.appendChild(li);
        });
        infoDiv.appendChild(deadlinesEl);
      })();
    }
    infoCell(hearing).appendChild(infoDiv);
  }
};

var setCachedValue = function setCachedValue(hearing) {
  var key = hearing.casenumber + hearing.defnbr;
  localStorage.setItem(key, JSON.stringify(hearing.info));
};

var getCachedValue = function getCachedValue(hearing) {
  var key = hearing.casenumber + hearing.defnbr;
  hearing.info = JSON.parse(localStorage.getItem(key));
};

var toggleInfo = function toggleInfo(hearing) {
  var infoDiv = infoCell(hearing).querySelector('div');
  if (infoDiv.style.display === '') {
    infoButton(hearing).textContent = 'Show';
    infoDiv.style.display = 'none';
  } else {
    infoButton(hearing).textContent = 'Hide';
    infoDiv.style.display = '';
  }
};

var createToggleButton = function createToggleButton(hearing) {
  var button = document.createElement('button');
  button.textContent = 'Hide';
  button.addEventListener('click', function () {
    toggleInfo(hearing);
  }, false);
  infoButtonCell(hearing).appendChild(button);
};

var getInfo = function getInfo(hearing) {
  setButtonText('Updating', hearing);
  setInfoText('Loading info for ' + hearing.casenumber, hearing);
  disableButton(hearing);
  getCachedValue(hearing);
  updateInfoText(hearing);
  _ajax.Ajax.get(hearing.urls.report, function () {
    // setButtonText('Updated', hearing);
    _nodeHelpers.NodeHelpers.removeNode(infoButton(hearing));
    createToggleButton(hearing);
    hearing.info = _casereport.CaseReport.create(this.responseXML, hearing);
    setCachedValue(hearing);
    updateInfoText(hearing);
  });
};

var Calendar = {};
Calendar.createInfoRows = createInfoRows;
Calendar.parseHearings = parseHearings;

exports.Calendar = Calendar;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*jshint esversion: 6 */

var logResponse = function logResponse() {
  console.log(this.responseText);
};

var get = function get(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', callback);
  xhr.open('GET', url);
  xhr.send();
  xhr.responseType = 'document';
};

var Ajax = {};
Ajax.get = get;

exports.Ajax = Ajax;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseReport = undefined;

var _nodeHelpers = __webpack_require__(0);

var ACTION_NODE_SELECTOR = 'tr > input[id^="hidKey"]'; /*jshint esversion: 6 */

var PROBATION_TERMS_SELECTOR = '#divProbationBody > #table-box3 > tbody > tr';
var PROBATION_SUMMARY_SELECTOR = '#divProbationBody > #table-title-left td';

var includes = function includes(text, searchTerm) {
  return text.indexOf(searchTerm) > -1;
};

var parseProbationInfo = function parseProbationInfo(node) {
  var result = {};
  var nodes = node.querySelectorAll(PROBATION_SUMMARY_SELECTOR);
  if (nodes && nodes.length) {
    result.type = nodes[0].textContent.trim();
    result.granted = nodes[1].textContent.trim();
    result.expires = nodes[2].textContent.trim();
  }
  return result;
};

var parseProbationTerms = function parseProbationTerms(node) {
  var result = [];
  var nodes = node.querySelectorAll(PROBATION_TERMS_SELECTOR);
  if (nodes && nodes.length) {
    for (var i = 1, l = nodes.length; i < l; i += 1) {
      var number = parseInt(nodes[i].children[1].textContent.trim());
      var description = nodes[i].children[3].textContent.trim();
      result.push({ number: number, description: description });
    }
  }
  return result;
};

var parseAction = function parseAction(node) {
  var result = {};
  var parent = node.parentNode;
  var cells = parent.querySelectorAll('td');

  result.code = parseActionCode(node.value).trim();
  result.date = cells[0].textContent.trim().substr(0, 10);
  result.description = cells[1].textContent.trim();
  var disposition = cells[2].textContent.trim();
  if (disposition) {
    result.disposition = disposition;
  }
  var actionType = cells[3].textContent.trim();
  if (actionType) {
    result.actionType = actionType;
  }
  var imageLink = cells[5].querySelector('a');
  if (imageLink) {
    result.imageUrl = imageLink.href.replace('..', 'http://riv-ja1/JA');
  }
  return result;
};

var parseActions = function parseActions(html) {
  var result = [];
  var nodes = html.querySelectorAll(ACTION_NODE_SELECTOR);
  if (nodes && nodes.length) {
    result = result.concat(_nodeHelpers.NodeHelpers.toArray(nodes, parseAction));
  }
  return result;
};

var parseActionCode = function parseActionCode(value) {
  var segments = value.split(',');
  var result = segments[9];
  return result;
};

var hasDisclosure = function hasDisclosure(html) {
  var text = html.body.textContent;
  var result = includes(text, "DISCLOSURE FILED") || includes(text, "COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
  return result;
};
var isProof = function isProof(action) {
  var result = (includes(action.description, 'PROOF OF') || includes(action.description, 'PROGRESS REPORT')) && action.imageUrl && action.imageUrl.length;
  return result;
};

var isTermination = function isTermination(action) {
  var result = includes(action.description, 'PROGRAM TERMINATION') && action.imageUrl && action.imageUrl.length;
  return result;
};

var isDeadline = function isDeadline(probationTerm) {
  var result = probationTerm.description.search(/(BY|BEFORE) \d\d\/\d\d\/\d\d\d\d/) > -1;
  return result;
};

var isSentencingMemorandum = function isSentencingMemorandum(action) {
  if (action.description && action.description.length) {
    return action.description.search(/SENTENCING MEMORANDUM/) != -1;
  } else {
    return false;
  }
};

var create = function create(html, action) {
  var result = {};
  var needsDisclosure = !hasDisclosure(html);
  var actions = parseActions(html);
  result.needsDisclosure = needsDisclosure;
  result.actions = actions;
  result.probationTerms = parseProbationTerms(html);
  result.probationInfo = parseProbationInfo(html);
  return result;
};

var actions = function actions(caseReport) {
  return caseReport.actions;
};
var deadlines = function deadlines(caseReport) {
  return caseReport.probationTerms.filter(isDeadline);
};
var needsDisclosure = function needsDisclosure(caseReport) {
  return caseReport.needsDisclosure;
};
var probationInfo = function probationInfo(caseReport) {
  return caseReport.probationInfo;
};
var probationTerms = function probationTerms(caseReport) {
  return caseReport.probationTerms;
};
var proofs = function proofs(caseReport) {
  return caseReport.actions.filter(isProof);
};
var sentencingMemoranda = function sentencingMemoranda(caseReport) {
  return caseReport.actions.filter(isSentencingMemorandum);
};
var terminations = function terminations(caseReport) {
  return caseReport.actions.filter(isTermination);
};

var CaseReport = {};
CaseReport.create = create;
CaseReport.parseActionCode = parseActionCode;

CaseReport.actions = actions;
CaseReport.deadlines = deadlines;
CaseReport.needsDisclosure = needsDisclosure;
CaseReport.probationInfo = probationInfo;
CaseReport.probationTerms = probationTerms;
CaseReport.proofs = proofs;
CaseReport.sentencingMemoranda = sentencingMemoranda;
CaseReport.terminations = terminations;

exports.CaseReport = CaseReport;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*jshint esversion: 6 */

var pageSegment = function pageSegment(page) {
  switch (page) {
    case 'actions':
      return 'actionlist';
    case 'report':
      return 'criminalcasereport';
    case 'charges':
      return 'defendantcharges';
    case 'info':
      return 'defendantinfo';
    case 'status':
      return 'defendantstatus';
    case 'dmv':
      return 'dmv';
    case 'fine':
      return 'fine';
    case 'images':
      return 'criminalimages';
    case 'notes':
      return 'judgesnotes';
    case 'minutes':
      return 'minute';
    case 'probation':
      return 'probation';
    case 'perm':
      return 'perm';
    default:
      return 'defendantinfo';
  }
};

var lastSegment = function lastSegment(page) {
  var segment = '&defseq=1&otnmseq=0&fmt=auto';
  if (page === 'actions') {
    return segment + '&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y';
  } else {
    return segment;
  }
};

var url = function url(page, casenumber, defnbr) {
  return 'http://riv-ja1/JA/criminal/' + pageSegment(page) + '.asp' + '?casenumber=' + casenumber + '&courtcode=C' + '&defnbr=' + defnbr + lastSegment(page);
};

var urls = function urls(data) {
  var casenumber = data.casenumber;
  var defnbr = data.defnbr;
  return {
    actions: url('actions', casenumber, defnbr),
    report: url('report', casenumber, defnbr),
    charges: url('charges', casenumber, defnbr),
    info: url('info', casenumber, defnbr),
    status: url('status', casenumber, defnbr),
    dmv: url('dmv', casenumber, defnbr),
    fine: url('fine', casenumber, defnbr),
    images: url('images', casenumber, defnbr),
    notes: url('notes', casenumber, defnbr),
    minutes: url('minutes', casenumber, defnbr),
    probation: url('probation', casenumber, defnbr),
    perm: url('perm', casenumber, defnbr)
  };
};

var Urls = {};
Urls.urls = urls;

exports.Urls = Urls;

/* 
 * http://riv-ja1/JA/criminal/actionlist.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y
 * http://riv-ja1/JA/criminal/actionlist.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/criminalcasereport.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/defendantcharges.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/defendantinfo.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0<Paste>
 * http://riv-ja1/JA/criminal/defendantstatus.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/dmv.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/fine.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0

 * http://riv-ja1/JA/criminal/criminalimages.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/criminalimages.asp?courtcode=C&defnbr=1198453&casenumber=RIF1604943&defseq=1&otnmseq=0&fmt=auto

 * http://riv-ja1/JA/criminal/judgesnotes.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/minute.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/probation.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/perm.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(1);

var hearings = _calendar.Calendar.parseHearings(document.body); /*jshint esversion: 6 */

window.hearings = hearings;
_calendar.Calendar.createInfoRows(hearings);
console.log('There are ' + hearings.length + ' hearings.');

/***/ })
/******/ ]);