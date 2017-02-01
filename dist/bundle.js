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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_urls__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseHearings; });
/*jshint esversion: 6 */




const hearingNodes = node  => document.querySelectorAll('tr[id^="tr_row"]');

const hearingNodeToObject = node => {
  let hearing = {};
  hearing.heard = node.children[0].querySelector('input').checked;
  hearing.time = node.children[1].textContent.trim();
  hearing.casenumber = node.children[2].textContent.trim();
  hearing.name = node.children[3].textContent.trim();
  hearing.defnbr = node.children[2].querySelector('a').href.match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[4].textContent.trim();
  hearing.charges = node.children[5].textContent.trim();
  hearing.urls = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pages_urls__["a" /* urls */])(hearing);
  return hearing;
};

const parseHearings = node => {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__node_list__["a" /* nodeListToArray */])(hearingNodes(node), hearingNodeToObject);
};




/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar__ = __webpack_require__(0);
/*jshint esversion: 6 */



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

window.hearings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* parseHearings */])(document.body);
console.log(`There are ${ window.hearings.length} hearings.`);


/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return urls; });
/*jshint esversion: 6 */

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
 * http://riv-ja1/JA/criminal/judgesnotes.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/minute.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/probation.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/perm.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 */

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
      return 'info';
  }
};

const lastSegment = page => {
  switch (page) {
    case 'actions':
      return '&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y';
    default:
      return '&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0';
  }
};

const url = (page, data) => {
  return 'http://riv-ja1/JA/criminal/' +
    pageSegment(page) + '.asp' +
    '?casenumber=' + data.casenumber +
    '&courtcode=C' +
    '&defnbr=' + data.defnbr +
    lastSegment(page);
};

const urls = (data) => {
  return {
    actions: url('actions', data),
    report: url('report', data),
    charges: url('charges', data),
    info: url('info', data),
    status: url('status', data),
    dmv: url('dmv', data),
    fine: url('fine', data),
    images: url('images', data),
    notes: url('notes', data),
    minutes: url('minutes', data),
    probation: url('probation', data),
    perm: url('perm', data)
  };
};





/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nodeListToArray; });
/*jshint esversion: 6 */

const nodeListToArray = (nodeList, callback) => {
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




/***/ })

/******/ });