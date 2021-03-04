/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-tasks.js":
/*!**************************!*\
  !*** ./src/dom-tasks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addNewTask\": () => (/* binding */ addNewTask)\n/* harmony export */ });\n// Module purpose: Manage tasks in the DOM.\n// Store tasks container div in a vairable.\nconst tasksContainer = document.querySelector('#tasks-container');\n\n// Fn to add a new task to the DOM.\nfunction addNewTask(task) {\n    // Create task element and add class.\n    const taskEl = document.createElement('div');\n    taskEl.classList.add('task');\n    // Create and append checkbox to div element.\n    const checkbox = document.createElement('input');\n    checkbox.setAttribute('type', 'checkbox');\n    taskEl.appendChild(checkbox);\n    // Create and append p element with task title.\n    const title = document.createElement('p');\n    title.textContent = task.title;\n    taskEl.appendChild(title);\n    // Append task el to container.\n    tasksContainer.appendChild(taskEl);\n}\n\n\n\n//# sourceURL=webpack://todo/./src/dom-tasks.js?");

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"events\": () => (/* binding */ events)\n/* harmony export */ });\n// Module to help all modules communicate.\nconst events = {\n    events: {},\n    on: function(eventName, fn) {\n        this.events[eventName] = this.events[eventName] || [];\n        this.events[eventName].push(fn);\n    },\n    off: function(eventName, fn) {\n        if (this.events[eventName]) {\n            for (let i = 0; i < this.events[eventName].length; i++) {\n                if (this.events[eventName][i] === fn) {\n                    this.events[eventName].splice(i, 1);\n                    break;\n                }\n            }\n        }\n    },\n    emit: function(eventName, data){\n        if (this.events[eventName]) {\n            this.events[eventName].forEach(fn => fn(data));\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo/./src/events.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n/* harmony import */ var _dom_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-tasks */ \"./src/dom-tasks.js\");\n/* harmony import */ var _task_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-form */ \"./src/task-form.js\");\n\n\n\n\n\n(0,_dom_tasks__WEBPACK_IMPORTED_MODULE_1__.addNewTask)(_tasks__WEBPACK_IMPORTED_MODULE_0__.cleanRoom);\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/task-form.js":
/*!**************************!*\
  !*** ./src/task-form.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskForm\": () => (/* binding */ taskForm)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\n// Make form an object?\nconst taskForm = {\n    // Set form element and visibility as props.\n    formEl: document.querySelector('.task-form'),\n    isHidden: true,\n    // Set form inputs as inner obj properties.\n    inputs: {\n        title: document.querySelector('#title'),\n        desc: document.querySelector('#description'),\n        dueDate: document.querySelector('#due-date'),\n        priority: document.querySelector('#priority')\n    },\n    // Form submit button.\n    submitBtn: document.querySelector('#submit-form-btn'),\n    // Button to display form.\n    displayBtn: document.querySelector('#display-form-btn'),\n    // Method to toggle display.\n    toggleDisplay() {\n        if (this.isHidden) {\n            this.formEl.classList.remove('hidden');\n        } else {\n            this.formEl.classList.add('hidden');\n        }\n        // Update isHidden boolean to reflect change.\n        this.isHidden = !this.isHidden;\n    },\n    submit() {\n        // Create empty args array.\n        const inputValues = [];\n        // Loop through inputs properties.\n        for (let key in this.inputs) {\n            // Store each input value in the args array.\n            inputValues.push(this.inputs[key].value)\n        }\n        // Emit event with array of input values.\n        _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('formSubmitted', inputValues);\n    }\n}\n\ntaskForm.displayBtn.addEventListener('click', () => taskForm.toggleDisplay());\ntaskForm.submitBtn.addEventListener('click', () => taskForm.submit());\n\n\n\n//# sourceURL=webpack://todo/./src/task-form.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cleanRoom\": () => (/* binding */ cleanRoom),\n/* harmony export */   \"Task\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\nclass Task {\n    constructor(title, desc, dueDate, priority) {\n        this.title = title;\n        this.desc = desc;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.isComplete = false;\n    }\n    toggleComplete() {\n        this.isComplete = !this.isComplete;\n    }\n}\n\nconst cleanRoom = new Task('Clean room', 'I need to clean my room', 'tomorrow', 2);\n\nfunction createTask(args) {\n    const task = new Task(...args);\n    console.log(task);\n}\n\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('formSubmitted', createTask);\n\n\n\n//# sourceURL=webpack://todo/./src/tasks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;