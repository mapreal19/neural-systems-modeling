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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _chap1HabituationGWRJs = __webpack_require__(1);

	var _chap1HabituationGWRJs2 = _interopRequireDefault(_chap1HabituationGWRJs);

	(0, _chap1HabituationGWRJs2['default'])();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = InitChart;
	function forDisplay(num, index) {
	  return {
	    time: index,
	    value: num
	  };
	}

	function nTimesArray(arr, nTimes) {
	  return [].concat.apply([], Array.apply(null, Array(nTimes)).map(function () {
	    return arr;
	  }));
	}

	function getData() {
	  var weight = 4;
	  var weigthDecrement = 0.7;
	  var pulse = [0, 0, 1, 0, 0];

	  var inputPulses = nTimesArray(pulse, 6);

	  var outputPulses = [];

	  inputPulses.forEach(function (inputPulse, index) {
	    outputPulses[index] = weight * inputPulse;

	    if (inputPulse > 0) weight *= weigthDecrement;
	  });

	  return {
	    inputPulses: inputPulses.map(forDisplay),
	    outputPulses: outputPulses.map(forDisplay)
	  };
	}

	function render(data, selector) {
	  var vis = d3.select(selector),
	      WIDTH = 600,
	      HEIGHT = 200,
	      MARGINS = {
	    top: 20,
	    right: 20,
	    bottom: 20,
	    left: 50
	  },
	      xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 29]),
	      yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 4]),
	      xAxis = d3.svg.axis().scale(xScale),
	      yAxis = d3.svg.axis().scale(yScale).orient("left");

	  vis.append("svg:g").attr("class", "x axis").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);

	  vis.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + MARGINS.left + ",0)").call(yAxis);

	  var lineGen = d3.svg.line().x(function (d) {
	    return xScale(d.time);
	  }).y(function (d) {
	    return yScale(d.value);
	  });

	  vis.append('svg:path').attr('d', lineGen(data)).attr('stroke', 'green').attr('stroke-width', 2).attr('fill', 'none');
	}

	function InitChart() {
	  var _getData = getData();

	  var inputPulses = _getData.inputPulses;
	  var outputPulses = _getData.outputPulses;

	  render(inputPulses, '#visualisation');
	  render(outputPulses, '#visualisation2');
	}

	module.exports = exports["default"];

/***/ }
/******/ ]);