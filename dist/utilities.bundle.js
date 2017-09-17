/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJson", function() { return getJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalizeEachWord", function() { return capitalizeEachWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "celciusToFahrenheit", function() { return celciusToFahrenheit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fahrenheitToCelcius", function() { return fahrenheitToCelcius; });
function getJSON(url, _callback) {
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  request.setRequestHeader('Accept', 'application/json');
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      _callback(JSON.parse(request.response));
    }
  }
}

function capitalizeEachWord(string) {
  return _.join(_.map(string.split(' '), (word) => {
    return word.replace(/^./, word[0].toUpperCase());
  }), ' ');
}

function celciusToFahrenheit(temp) {
  return (temp * 1.8 + 32).toFixed(2);
}

function fahrenheitToCelcius(temp) {
  return ((temp - 32) / 1.8).toFixed(2);
}




/***/ })
/******/ ]);