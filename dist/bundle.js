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
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractHearings; });
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




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar__ = __webpack_require__(0);


var reqListener = function () {
  console.log(this.responseText);
}

var getUrl = function(url, callback) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
}

var needsDisclosure = function(text) {
  return !hasDisclosure(text);
};
var hasDisclosure = function(text) {
  // var text = document.body.textContent;
  return text.includes("DISCLOSURE FILED") 
    || text.includes("COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
};

var extractHearingType = function(hearingRow) {
  return hearingRow
    .querySelectorAll('td')[4]
    .textContent
    .trim();
};

var extractName = function(hearingRow) {
  return hearingRow
    .querySelectorAll('td')[3]
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

var extractCaseNumber = function(hearingRow) {
  return hearingRow
    .querySelectorAll('td')[2]
    .textContent
    .trim();
};

var isPrelim = function(hearingRow) {
  return extractHearingType(hearingRow) == "PRELIMINARY HEARING";
};

var isArraignment = function(hearingRow) {
  return extractHearingType(hearingRow).includes("ARRAIGNMENT");
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

var filterPrelims = function(hearings) {
  return hearings.filter(isPrelim);
};

var filterArraignments = function(hearings) {
  return hearings.filter(isArraignment);
};

var hearings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* extractHearings */])(document.body);

var prelims = filterPrelims(hearings);
prelims.forEach(function(prelim) {
  var caseNumber = extractCaseNumber(prelim);
  var name = extractName(prelim);
  var link = extractCaseReportLink(prelim);
  getUrl(link, function() {
    console.log(caseNumber + " " + name + " disclosure = " + hasDisclosure(this.responseText));
  });
});

var arraignments = filterArraignments(hearings);
arraignments.forEach(function(arraignment) {
  var caseNumber = extractCaseNumber(arraignment);
  var name = extractName(arraignment);
  var link = extractCaseReportLink(arraignment);
  getUrl(link, function() {
    console.log(caseNumber + " " + name + " disclosure = " + hasDisclosure(this.responseText));
  });
});

console.log("There are " + hearings.length + " hearings.");
console.log("There are " + prelims.length + " prelims.");


/***/ })
/******/ ]);