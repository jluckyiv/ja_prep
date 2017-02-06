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

const insertAfter = function(newNode, referenceNode) {
  const parent = referenceNode.parentNode;
  const next = referenceNode.nextElementSibling;
  parent.insertBefore(newNode, next);
};

const removeNode = function(node) {
  if (node) { node.parentNode.removeChild(node); }
};

const toArray = function(nodeList, callback) {
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
const hearingNodes = function(node) {
  return document.querySelectorAll(HEARING_NODE_SELECTOR);
};
const hearingRow = function(hearing) {
  return document.getElementById(hearing.nodeId);
};
const infoRow = function(hearing) {
  return document.getElementById(hearing.infoNodeId);
};

const infoButtonCell = function(hearing) {
  return infoRow(hearing).children[0];
};
const infoButton = function(hearing) {
  return infoRow(hearing).children[0].children[0];
};
const infoCell = function(hearing) {
  return infoRow(hearing).children[1];
};

const setButtonText = function(text, hearing) {
  infoButton(hearing).textContent = text;
};
const disableButton = function(hearing) {
  infoButton(hearing).disabled = true;
};
const enableButton = function(hearing) {
  infoButton(hearing).disabled = false;
};
const setInfoText = function(text, hearing) {
  infoCell(hearing).textContent = text;
};

const deleteInfoRow = function(hearing) {
  return __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].removeNode(infoRow(hearing));
};
const createInfoRow = function(hearing) {
  let row = document.createElement('tr');
  row.id = hearing.infoNodeId;
  row.setAttribute('class', 'hearing-info');
  return row;
};

const createInfoButtonCell = function(hearing) {
  let buttonCell = document.createElement('td');
  buttonCell.setAttribute('class', 'info-button-cell');
  buttonCell.setAttribute('valign', 'top');
  return buttonCell;
};

const createInfoButton = function(hearing) {
  let button = document.createElement('button');
  button.textContent = 'Info';
  button.setAttribute('class', 'info-button');
  button.addEventListener('click', function() { getInfo(hearing); }, false);
  return button;
};

const createInfoCell = function(hearing) {
  let infoCell = document.createElement('td');
  infoCell.setAttribute('class', 'info-cell');
  infoCell.colSpan = '6';
  return infoCell;
};

const appendInfoRow = function(hearing) {
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

const createInfoRows = function(hearings, callback) {
  hearings.forEach(function(hearing)  {
    appendInfoRow(hearing);
    if (callback) {
      callback(hearing);
    }
  });
};

const parseHearing = function(node) {
  let timeIndex = 0;
  if (document.querySelector('.table-results tr th').textContent.trim() === "Heard") {
    timeIndex = 1;
  }
  let hearing = {};
  hearing.nodeId = node.id;
  hearing.infoNodeId = 'info_' + node.id;
  hearing.time = node.children[timeIndex].textContent.trim();
  hearing.casenumber = node.children[timeIndex + 1].textContent.trim();
  hearing.name = node.children[timeIndex + 2].textContent.trim();
  hearing.defnbr = node.children[timeIndex + 1].querySelector('a').href
    .match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[timeIndex + 3].textContent.trim();
  hearing.charges = node.children[timeIndex + 4].textContent.trim();
  hearing.urls = __WEBPACK_IMPORTED_MODULE_3__urls__["a" /* Urls */].urls(hearing);
  return hearing;
};

const parseHearings = function(node) {
  return __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].toArray(hearingNodes(node), parseHearing);
};

const updateInfoText = function(hearing) {
  const info = hearing.info;
  setInfoText('', hearing);
  if (info) {
    __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].removeNode(infoCell(hearing).querySelector('div'));

    let infoDiv = document.createElement('div');
    const needsDisclosure = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].needsDisclosure(info);

    let disclosureEl = document.createElement('p');
    disclosureEl.textContent = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].needsDisclosure(info) ? 'Needs disclosure.' : 'Disclosure given';
    infoDiv.appendChild(disclosureEl);

    const terminations = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].terminations(info);
    if(terminations) {
      let terminationsEl = document.createElement('ul');
      terminations.forEach(function(termination) {
        let li = document.createElement('li');
        li.textContent = `${termination.date} `;
        let a = document.createElement('a');
        a.href = termination.imageUrl;
        a.textContent = `${termination.description}`;
        a.target = `_blank`;
        li.appendChild(a);
        terminationsEl.appendChild(li);
      });
      infoDiv.appendChild(terminationsEl);
    }

    const proofs = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].proofs(info);
    if(proofs) {
      let proofsEl = document.createElement('ul');
      proofs.forEach(function(proof) {
        let li = document.createElement('li');
        li.textContent = `${proof.date} `;
        let a = document.createElement('a');
        a.href = proof.imageUrl;
        a.textContent = `${proof.description}`;
        a.target = `_blank`;
        li.appendChild(a);
        proofsEl.appendChild(li);
      });
      infoDiv.appendChild(proofsEl);
    }

    const deadlines = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].deadlines(info);
    if(deadlines) {
      let deadlinesEl = document.createElement('ul');
      deadlines.forEach(function(deadline) {
        let li = document.createElement('li');
        li.textContent = deadline.description;
        deadlinesEl.appendChild(li);
      });
      infoDiv.appendChild(deadlinesEl);
    }
    infoCell(hearing).appendChild(infoDiv);
  }
};

const setCachedValue = function(hearing) {
  const key = hearing.casenumber + hearing.defnbr;
  localStorage.setItem(key, JSON.stringify(hearing.info));
};

const getCachedValue = function(hearing) {
  const key = hearing.casenumber + hearing.defnbr;
  hearing.info = JSON.parse(localStorage.getItem(key));
};

const toggleInfo = function(hearing) {
  let infoDiv = infoCell(hearing).querySelector('div');
  if (infoDiv.style.display === '') {
    infoButton(hearing).textContent = 'Show';
    infoDiv.style.display = 'none';
  } else {
    infoButton(hearing).textContent = 'Hide';
    infoDiv.style.display = '';
  }
};

const createToggleButton = function(hearing) {
  let button = document.createElement('button');
  button.textContent = 'Hide';
  button.addEventListener('click', function() { toggleInfo(hearing); }, false);
  infoButtonCell(hearing).appendChild(button);
};

const getInfo = function(hearing) {
  setButtonText('Updating', hearing);
  setInfoText('Loading info for ' + hearing.casenumber, hearing);
  disableButton(hearing);
  getCachedValue(hearing);
  updateInfoText(hearing);
  __WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* Ajax */].get(hearing.urls.report, function() {
    // setButtonText('Updated', hearing);
    __WEBPACK_IMPORTED_MODULE_2__node_helpers__["a" /* NodeHelpers */].removeNode(infoButton(hearing));
    createToggleButton(hearing);
    hearing.info = __WEBPACK_IMPORTED_MODULE_1__casereport__["a" /* CaseReport */].create(this.responseXML, hearing);
    setCachedValue(hearing);
    updateInfoText(hearing);
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

const parseProbationInfo = function(node) {
  let result = {};
  const nodes = node.querySelectorAll(PROBATION_SUMMARY_SELECTOR);
  if (nodes && nodes.length) {
    result.type = nodes[0].textContent.trim();
    result.granted = nodes[1].textContent.trim();
    result.expires = nodes[2].textContent.trim();
  }
  return result;
};

const parseProbationTerms = function(node) {
  let result = [];
  const nodes = node.querySelectorAll(PROBATION_TERMS_SELECTOR);
  if (nodes && nodes.length) {
    for (let i = 1, l = nodes.length; i < l; i += 1) {
      const number = parseInt(nodes[i].children[1].textContent.trim());
      const description = nodes[i].children[3].textContent.trim();
      result.push({number: number, description: description});
    }
  }
  return result;
};

const parseAction = function(node) {
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

const parseActions = function(html) {
  let result = [];
  const nodes = html.querySelectorAll(ACTION_NODE_SELECTOR);
  if (nodes && nodes.length) {
    result = result.concat(__WEBPACK_IMPORTED_MODULE_0__node_helpers__["a" /* NodeHelpers */].toArray(nodes, parseAction));
  }
  return result;
};

const parseActionCode = function(value) {
  const segments = value.split(',');
  const result = segments[9];
  return result;
};

const hasDisclosure = function(html) {
  const text = html.body.textContent;
  const result = text.includes("DISCLOSURE FILED") || 
    text.includes("COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
  return result;
};
const needsDisclosure = function(caseReport) {
  return caseReport.needsDisclosure;
};

const isProof = function(action) {
  const result = (action.description.includes('PROOF OF') ||
    action.description.includes('PROGRESS REPORT')) && 
    action.imageUrl && action.imageUrl.length;
  return result;
};

const isTermination = function(action) {
  const result = action.description.includes('PROGRAM TERMINATION') &&
    action.imageUrl && action.imageUrl.length;
  return result;
};

const isDeadline = probationTerm => {
  const result = probationTerm.description.search(/(BY|BEFORE) \d\d\/\d\d\/\d\d\d\d/) > -1;
  return result;
};

const create = function(html, action) {
  let result = {};
  result.needsDisclosure = !hasDisclosure(html);
  result.actions = parseActions(html);
  result.probationTerms = parseProbationTerms(html); 
  result.probationInfo = parseProbationInfo(html);
  return result;
};

const actions = function(caseReport) { return  caseReport.actions; };
const deadlines = function(caseReport) { return  caseReport.probationTerms.filter(isDeadline); };
const probationInfo = function(caseReport) { return  caseReport.probationInfo; };
const probationTerms = function(caseReport) { return  caseReport.probationTerms; };
const proofs = function(caseReport) { return  caseReport.actions.filter(isProof);  };
const terminations = function(caseReport) { return  caseReport.actions.filter(isTermination); };

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

const pageSegment = function(page) {
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

const lastSegment = function(page) {
  const segment = '&defseq=1&otnmseq=0&fmt=auto';
  if (page === 'actions') {
    return segment + '&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y';
  } else {
    return segment;
  }
};

const url = function(page, casenumber, defnbr) {
  return 'http://riv-ja1/JA/criminal/' +
    pageSegment(page) + '.asp' +
    '?casenumber=' + casenumber +
    '&courtcode=C' +
    '&defnbr=' + defnbr +
    lastSegment(page);
};

const urls = function(data) {
  const casenumber = data.casenumber;
  const defnbr = data.defnbr;
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