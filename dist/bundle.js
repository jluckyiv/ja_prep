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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeHelpers; });
/*jshint esversion: 6 */

const insertAfter = (newNode, referenceNode) => {
  const parent = referenceNode.parentNode;
  const next = referenceNode.nextElementSibling;
  parent.insertBefore(newNode, next);
};

const removeNode = node => {
  if (node) { node.parentNode.removeChild(node); }
};

const toArray = (nodeList, callback) => {
  let a = [];
  for (let i = 0, l = nodeList.length; i < l; i += 1) {
    if (callback) {
      a[a.length] = callback(nodeList[i]);
    } else {
      a[a.length] = nodeList[i];
    }
  }
  return a;
};

let NodeHelpers = {};
NodeHelpers.insertAfter = insertAfter;
NodeHelpers.removeNode = removeNode;
NodeHelpers.toArray = toArray;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__casereport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__urls__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Calendar; });
/*jshint esversion: 6 */






const HEARING_NODE_SELECTOR = 'tr[id^="tr_row"]';
const hearingNodes = node  => document.querySelectorAll(HEARING_NODE_SELECTOR);
const hearingRow = hearing => document.getElementById(hearing.nodeId);
const infoRow = hearing => document.getElementById(hearing.infoNodeId);

const infoButton = hearing => infoRow(hearing).children[0].children[0];
const infoCell = hearing => infoRow(hearing).children[1];

const setButtonText = (text, hearing) => infoButton(hearing).textContent = text; 
const disableButton = (hearing) => infoButton(hearing).disabled = true;
const enableButton = (hearing) => infoButton(hearing).disabled = false;
const setInfoText = (text, hearing) => infoCell(hearing).textContent = text;

const deleteInfoRow = hearing => __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].removeNode(infoRow(hearing));
const createInfoRow = hearing => {
  let row = document.createElement('tr');
  row.id = hearing.infoNodeId;
  row.setAttribute('class', 'hearing-info');
  return row;
};

const createInfoButtonCell = hearing => {
  let buttonCell = document.createElement('td');
  buttonCell.setAttribute('class', 'info-button-cell');
  return buttonCell;
};

const createInfoButton = hearing => {
  let button = document.createElement('button');
  button.textContent = 'Info';
  button.setAttribute('class', 'info-button');
  button.addEventListener('click', () => getInfo(hearing), false);
  return button;
};

const createInfoCell = hearing => {
  let infoCell = document.createElement('td');
  infoCell.setAttribute('class', 'info-cell');
  infoCell.colSpan = '6';
  return infoCell;
};

const appendInfoRow = hearing => {
  deleteInfoRow(hearing);

  const hearingNode = hearingRow(hearing);
  let row = createInfoRow(hearing);
  let buttonCell = createInfoButtonCell(hearing);
  let button = createInfoButton(hearing);
  let infoCell = createInfoCell(hearing);

  buttonCell.appendChild(button);
  row.appendChild(buttonCell);
  row.appendChild(infoCell);
  row.style.display = hearingNode.style.display;
  __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].insertAfter(row, hearingNode);
};

const createInfoRows = (hearings, callback) => {
  hearings.forEach(hearing => {
    appendInfoRow(hearing);
    if (callback) {
      callback(hearing);
    }
  });
};

const parseHearing = node => {
  let hearing = {};
  hearing.nodeId = node.id;
  hearing.infoNodeId = 'info_' + node.id;
  hearing.heard = node.children[0].querySelector('input').checked;
  hearing.time = node.children[1].textContent.trim();
  hearing.casenumber = node.children[2].textContent.trim();
  hearing.name = node.children[3].textContent.trim();
  hearing.defnbr = node.children[2].querySelector('a').href
    .match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[4].textContent.trim();
  hearing.charges = node.children[5].textContent.trim();
  hearing.urls = __WEBPACK_IMPORTED_MODULE_3__urls__["a" /* Urls */].urls(hearing);
  return hearing;
};

const parseHearings = node => {
  return __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].toArray(hearingNodes(node), parseHearing);
};

const updateInfoText = (hearing) => {
  const info = hearing.info;
  if (info) {
    setInfoText(JSON.stringify(info), hearing);
  }
};

const setCachedValue = hearing => {
  const key = hearing.casenumber + hearing.defnbr;
  localStorage.setItem(key, JSON.stringify(hearing.info));
};

const getCachedValue = hearing => {
  const key = hearing.casenumber + hearing.defnbr;
  hearing.info = JSON.parse(localStorage.getItem(key));
};

const getInfo = function(hearing) {
  setButtonText('Updating', hearing);
  setInfoText('Loading info for ' + hearing.casenumber, hearing);
  disableButton(hearing);
  getCachedValue(hearing);
  updateInfoText(hearing);
  __WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* Ajax */].get(hearing.urls.report, function() {
    hearing.info = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].create(this.responseXML, hearing);
    setCachedValue(hearing);
    updateInfoText(hearing);
    setButtonText('Loaded', hearing);
  });
};

let Calendar = {};
Calendar.createInfoRows = createInfoRows;
Calendar.parseHearings = parseHearings;




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ajax; });
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




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_helpers__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaseReport; });
/*jshint esversion: 6 */



const ACTION_NODE_SELECTOR = `tr > input[id^="hidKey"]`;
const PROBATION_DIV_ID = `divProbationBody`;
const PROBATION_TERMS_SELECTOR = `#${PROBATION_DIV_ID} > #table-box3 > tbody > tr`;
const PROBATION_SUMMARY_SELECTOR = `#${PROBATION_DIV_ID} > #table-title-left td`;

const parseProbationInfo = node => {
  let result = {};
  const nodes = node.querySelectorAll(PROBATION_SUMMARY_SELECTOR);
  if (nodes && nodes.length) {
    result.type = nodes[0].textContent.trim();
    result.granted = nodes[1].textContent.trim();
    result.expires = nodes[2].textContent.trim();
  }
  return result;
};

const parseProbationTerms = node => {
  let result = [];
  const nodes = node.querySelectorAll(PROBATION_TERMS_SELECTOR);
  if (nodes && nodes.length) {
    for (let i = 1, l = nodes.length; i < l; i += 1) {
      const number = parseInt(nodes[i].children[1].textContent.trim());
      const term = nodes[i].children[3].textContent.trim();
      result.push({number: number, term: term});
    }
  }
  return result;
};

const parseAction = node => {
  let result = {};
  const parent = node.parentNode;
  const cells = parent.querySelectorAll('td');

  result.code = parseActionCode(node.value).trim();
  result.date = cells[0].textContent.trim().substr(0,10);
  result.description = cells[1].textContent.trim();
  const disposition = cells[2].textContent.trim();
  if (disposition) { result.disposition = disposition; }
  const actionType = cells[3].textContent.trim();
  if (actionType) { result.actionType = actionType; }
  const imageLink = cells[5].querySelector('a');
  if (imageLink) { result.imageUrl = imageLink.href.replace('..', 'http://riv-ja1/JA'); }
  return result;
};

const parseActions = html => {
  let result = [];
  const nodes = html.querySelectorAll(ACTION_NODE_SELECTOR);
  if (nodes && nodes.length) {
    result = result.concat(__WEBPACK_IMPORTED_MODULE_0__node_helpers__["a" /* NodeHelpers */].toArray(nodes, parseAction));
  }
  return result;
};

const parseActionCode = value => {
  const segments = value.split(',');
  const result = segments[9];
  return result;
};

const hasDisclosure = html => {
  const text = html.body.textContent;
  const result = text.includes("DISCLOSURE FILED") || 
    text.includes("COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
  return result;
};
const needsDisclosure = caseReport => caseReport.needsDisclosure;

const isProof = action => {
  const result = action.description.includes('PROOF OF');
  return result;
};

const isTermination = action => {
  const result = action.description.includes('PROGRAM TERMINATION');
  return result;
};

const isDeadline = probationTerm => {
  const result = probationTerm.term.search(/(BY|BEFORE) \d\d\/\d\d\/\d\d\d\d/) > -1;
  return result;
};

const create = (html, action) => {
  let result = {};
  result.needsDisclosure = !hasDisclosure(html);
  result.actions = parseActions(html);
  result.probationTerms = parseProbationTerms(html); 
  result.probationInfo = parseProbationInfo(html);
  return result;
};

const actions = caseReport => caseReport.actions;
const deadlines = caseReport => caseReport.probationTerms.filter(isDeadline);
const probationInfo = caseReport => caseReport.probationInfo;
const probationTerms = caseReport => caseReport.probationTerms;
const proofs = caseReport => caseReport.actions.filter(isProof); 
const terminations = caseReport => caseReport.actions.filter(isTermination);

let CaseReport = {};
CaseReport.create = create;
CaseReport.actions = actions;
CaseReport.needsDisclosure = needsDisclosure;
CaseReport.parseActionCode = parseActionCode;
CaseReport.probationInfo = probationInfo;
CaseReport.probationTerms = probationTerms;
CaseReport.terminations = terminations;
CaseReport.proofs = proofs;
CaseReport.deadlines = deadlines;




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Urls; });
/*jshint esversion: 6 */

const pageSegment = page => {
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

const lastSegment = page => {
  const segment = '&defseq=1&otnmseq=0&fmt=auto';
  if (page === 'actions') {
    return segment + '&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y';
  } else {
    return segment;
  }
};

const url = (page, casenumber, defnbr) => {
  return 'http://riv-ja1/JA/criminal/' +
    pageSegment(page) + '.asp' +
    '?casenumber=' + casenumber +
    '&courtcode=C' +
    '&defnbr=' + defnbr +
    lastSegment(page);
};

const urls = ({casenumber, defnbr} = data) => {
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

let Urls = {};
Urls.urls = urls;



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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar__ = __webpack_require__(1);
/*jshint esversion: 6 */



const hearings = __WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* Calendar */].parseHearings(document.body);
window.hearings = hearings;
__WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* Calendar */].createInfoRows(hearings);
console.log(`There are ${ hearings.length } hearings.`);


/***/ })
/******/ ]);