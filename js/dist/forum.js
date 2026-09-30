/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forum/handlePaste.ts"
/*!**********************************!*\
  !*** ./src/forum/handlePaste.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handlePaste: () => (/* binding */ handlePaste)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/forum/utils.ts");

function handlePaste(event, editor) {
  // console.log('[event]', event);

  if (event.defaultPrevented) {
    return;
  }

  // not selected
  const [start, end] = editor.getSelectionRange();
  // console.log('[start, end]', start, end);
  if (start === end) {
    return;
  }
  const value = editor.el.value;
  const selected = value.slice(start, end);
  if (!selected || selected.includes('\n')) {
    return;
  }
  const pasted = event.clipboardData?.getData('text/plain');
  if (!pasted) return;
  const url = pasted.trim();
  // console.log('[url]', url);
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isLinkTarget)(url)) {
    return;
  }

  // no wrap again
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.selectionIntersectsLink)(value, start, end)) {
    return;
  }
  event.preventDefault();
  const label = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.escapeLinkLabel)(selected);
  // console.log('[label]', label);

  editor.insertBetween(start, end, `[${label}](${url})`);
}

/***/ },

/***/ "./src/forum/index.ts"
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/components/TextEditor */ "flarum/common/components/TextEditor");
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_BasicEditorDriver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/BasicEditorDriver */ "flarum/common/utils/BasicEditorDriver");
/* harmony import */ var flarum_common_utils_BasicEditorDriver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_BasicEditorDriver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _handlePaste__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlePaste */ "./src/forum/handlePaste.ts");





flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().initializers.add('ffans-paste-link', () => {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_0___default().prototype), 'buildEditor', function (driver) {
    if (!(driver instanceof (flarum_common_utils_BasicEditorDriver__WEBPACK_IMPORTED_MODULE_2___default()))) {
      return;
    }
    driver.el.addEventListener('paste', event => {
      ;(0,_handlePaste__WEBPACK_IMPORTED_MODULE_4__.handlePaste)(event, driver);
    });
  });
});

/***/ },

/***/ "./src/forum/utils.ts"
/*!****************************!*\
  !*** ./src/forum/utils.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeLinkLabel: () => (/* binding */ escapeLinkLabel),
/* harmony export */   isLinkTarget: () => (/* binding */ isLinkTarget),
/* harmony export */   selectionIntersectsLink: () => (/* binding */ selectionIntersectsLink)
/* harmony export */ });
// oxfmt-ignore
function escapeLinkLabel(text) {
  return text.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
}
const blockedSchemes = new Set(['javascript', 'data', 'vbscript']);
function isLinkTarget(value) {
  const text = value.trim();
  const match = text.match(/^([a-z][a-z0-9+.-]*):/i);
  if (!match) {
    return false;
  }
  const scheme = match[1].toLowerCase();
  return !blockedSchemes.has(scheme);
}
function selectionIntersectsLink(text, selectionStart, selectionEnd) {
  if (selectionIntersectsPlainLink(text, selectionStart, selectionEnd)) return true;
  for (const link of iterateInlineLinks(text)) {
    if (link.start >= selectionEnd) return false;
    if (selectionStart < link.end) return true;
  }
  return false;
}
function selectionIntersectsPlainLink(text, selectionStart, selectionEnd) {
  const pattern = /(^|[^\w@./-])((?:https?:\/\/|www\.)[^\s<>"'`\[\]{}，。！？；：]+)/gi;
  let match;
  while (match = pattern.exec(text)) {
    const start = match.index + match[1].length;
    if (start >= selectionEnd) return false;

    // Keep balanced parentheses in URL paths, but leave surrounding punctuation outside.
    const candidate = match[2];
    let parentheses = 0;
    for (const character of candidate) {
      if (character === '(') parentheses++;else if (character === ')') parentheses--;
    }
    let end = candidate.length;
    while (end > 0) {
      const character = candidate[end - 1];
      if (/[.,!?;:]/.test(character)) end--;else if (character === ')' && parentheses < 0) {
        parentheses++;
        end--;
      } else break;
    }
    if (selectionStart >= start + end) continue;
    const target = candidate.slice(0, end);
    const hasWwwPrefix = /^www\./i.test(target);
    try {
      const url = new URL(hasWwwPrefix ? 'https://' + target : target);
      if (url.hostname && (!hasWwwPrefix || url.hostname.length > 4)) return true;
    } catch {
      // Incomplete or invalid URLs do not protect ordinary selected text.
    }
  }
  return false;
}
function isEscaped(text, index) {
  let backslashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === '\\'; i--) {
    backslashes++;
  }
  return backslashes % 2 === 1;
}
function* iterateInlineLinks(text) {
  if (!text.includes('[')) return;
  const closingDelimiters = new Map();
  const brackets = [];
  const parentheses = [];

  // Pair each delimiter once, including those inside incomplete link candidates.
  // Skipping escaped characters also avoids rescanning long backslash runs.
  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    if (character === '\\') {
      i++;
      continue;
    }
    if (character === '[') brackets.push(i);else if (character === '(') parentheses.push(i);else if (character === ']' || character === ')') {
      const start = (character === ']' ? brackets : parentheses).pop();
      if (start !== undefined) closingDelimiters.set(start, i);
    }
  }
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\\') {
      i++;
      continue;
    }
    if (text[i] !== '[') continue;
    const labelEnd = closingDelimiters.get(i);
    if (labelEnd === undefined || text[labelEnd + 1] !== '(') continue;
    const targetEnd = closingDelimiters.get(labelEnd + 1);
    if (targetEnd === undefined) continue;
    const start = i > 0 && text[i - 1] === '!' && !isEscaped(text, i - 1) ? i - 1 : i;
    yield {
      start,
      end: targetEnd + 1
    };

    // Preserve the first complete outer link and skip any links inside it.
    i = targetEnd;
  }
}

/***/ },

/***/ "flarum/common/components/TextEditor"
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/TextEditor')" ***!
  \*************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/TextEditor');

/***/ },

/***/ "flarum/common/extend"
/*!**********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extend')" ***!
  \**********************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extend');

/***/ },

/***/ "flarum/common/utils/BasicEditorDriver"
/*!***************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/BasicEditorDriver')" ***!
  \***************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/BasicEditorDriver');

/***/ },

/***/ "flarum/forum/app"
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/app')" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/app');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		flarum.reg._webpack_runtimes["ffans-paste-link"] ||= __webpack_require__;// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map