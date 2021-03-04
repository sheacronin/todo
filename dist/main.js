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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n/* harmony import */ var _dom_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-tasks */ \"./src/dom-tasks.js\");\n/* harmony import */ var _task_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-form */ \"./src/task-form.js\");\n\n\n\n\n(0,_dom_tasks__WEBPACK_IMPORTED_MODULE_1__.addNewTask)(_tasks__WEBPACK_IMPORTED_MODULE_0__.cleanRoom);\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/task-form.js":
/*!**************************!*\
  !*** ./src/task-form.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskForm\": () => (/* binding */ taskForm)\n/* harmony export */ });\n// import {Task} from './tasks';\n\n// Make form an object?\nconst taskForm = {\n    // Set form element and visibility as props.\n    formEl: document.querySelector('.task-form'),\n    isHidden: true,\n    // Set form inputs as properties.\n    titleInput: document.querySelector('#title'),\n    descInput: document.querySelector('#description'),\n    dueDateInput: document.querySelector('#due-date'),\n    priorityInput: document.querySelector('#priority'),\n    submitBtn: document.querySelector('#submit-form-btn'),\n    // Button to display form.\n    displayBtn: document.querySelector('#display-form-btn'),\n    // Method to toggle display.\n    toggleDisplay() {\n        if (this.isHidden) {\n            this.formEl.classList.remove('hidden');\n        } else {\n            this.formEl.classList.add('hidden');\n        }\n        // Update isHidden boolean to reflect change.\n        this.isHidden = !this.isHidden;\n    }\n    // Method to create new task obj.\n    // Should this go in tasks module instead?\n    // createNewTask() {\n    //     return new Task(this.titleInput, this.descInput, this.dueDateInput, this.priorityInput);\n    // }\n}\n\ntaskForm.displayBtn.addEventListener('click', () => taskForm.toggleDisplay());\n\n\n\n//# sourceURL=webpack://todo/./src/task-form.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cleanRoom\": () => (/* binding */ cleanRoom)\n/* harmony export */ });\nclass Task {\n    constructor(title, desc, dueDate, priority) {\n        this.title = title;\n        this.desc = desc;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.isComplete = false;\n    }\n    toggleComplete() {\n        this.isComplete = !this.isComplete;\n    }\n}\n\nconst cleanRoom = new Task('Clean room', 'I need to clean my room', 'tomorrow', 2);\n\n\n\n//# sourceURL=webpack://todo/./src/tasks.js?");

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