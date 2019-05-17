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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./src/Audio.js":
/*!**********************!*\
  !*** ./src/Audio.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Audio; });
/* harmony import */ var _HTMLAudioElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLAudioElement */ "./src/HTMLAudioElement.js");
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */


var SN_SEED = 1;

var _innerAudioContextMap = {};

var AudioMock = function () {
    function AudioMock() {
        _classCallCheck(this, AudioMock);
    }

    _createClass(AudioMock, [{
        key: 'play',
        value: function play() {}
    }, {
        key: 'pause',
        value: function pause() {}
    }, {
        key: 'stop',
        value: function stop() {}
    }, {
        key: 'seek',
        value: function seek() {}
    }, {
        key: 'destroy',
        value: function destroy() {}
    }, {
        key: 'onCanplay',
        value: function onCanplay() {}
    }, {
        key: 'offCanplay',
        value: function offCanplay() {}
    }, {
        key: 'onEnded',
        value: function onEnded() {}
    }, {
        key: 'offEnded',
        value: function offEnded() {}
    }, {
        key: 'onError',
        value: function onError() {}
    }, {
        key: 'offError',
        value: function offError() {}
    }, {
        key: 'onPause',
        value: function onPause() {}
    }, {
        key: 'offPause',
        value: function offPause() {}
    }, {
        key: 'onPlay',
        value: function onPlay() {}
    }, {
        key: 'offPlay',
        value: function offPlay() {}
    }, {
        key: 'onSeeked',
        value: function onSeeked() {}
    }, {
        key: 'offSeeked',
        value: function offSeeked() {}
    }, {
        key: 'onSeeking',
        value: function onSeeking() {}
    }, {
        key: 'offSeeking',
        value: function offSeeking() {}
    }, {
        key: 'onStop',
        value: function onStop() {}
    }, {
        key: 'offStop',
        value: function offStop() {}
    }, {
        key: 'onTimeUpdate',
        value: function onTimeUpdate() {}
    }, {
        key: 'offTimeUpdate',
        value: function offTimeUpdate() {}
    }, {
        key: 'offWaiting',
        value: function offWaiting() {}
    }, {
        key: 'onWaitin',
        value: function onWaitin() {}
    }]);

    return AudioMock;
}();

var Audio = function (_HTMLAudioElement) {
    _inherits(Audio, _HTMLAudioElement);

    function Audio(url) {
        _classCallCheck(this, Audio);

        var _this = _possibleConstructorReturn(this, (Audio.__proto__ || Object.getPrototypeOf(Audio)).call(this));

        _this._$sn = SN_SEED++;

        _this.readyState = Audio.HAVE_NOTHING;

        var innerAudioContext = swan.createInnerAudioContext ? swan.createInnerAudioContext() : new AudioMock();

        _innerAudioContextMap[_this._$sn] = innerAudioContext;

        _this._canplayEvents = ['load', 'loadend', 'canplay', 'canplaythrough', 'loadedmetadata'];

        innerAudioContext.onCanplay(function () {
            _this._loaded = true;
            _this.readyState = Audio.HAVE_CURRENT_DATA;

            _this._canplayEvents.forEach(function (type) {
                _this.dispatchEvent({ type: type });
            });
        });
        innerAudioContext.onPlay(function () {
            _this._paused = _innerAudioContextMap[_this._$sn].paused;
            _this.dispatchEvent({ type: 'play' });
        });
        innerAudioContext.onPause(function () {
            _this._paused = _innerAudioContextMap[_this._$sn].paused;
            _this.dispatchEvent({ type: 'pause' });
        });
        innerAudioContext.onEnded(function () {
            _this._paused = _innerAudioContextMap[_this._$sn].paused;
            if (_innerAudioContextMap[_this._$sn].loop === false) {
                _this.dispatchEvent({ type: 'ended' });
            }
            _this.readyState = Audio.HAVE_ENOUGH_DATA;
        });
        innerAudioContext.onError(function () {
            _this._paused = _innerAudioContextMap[_this._$sn].paused;
            _this.dispatchEvent({ type: 'error' });
        });

        if (url) {
            _this.src = url;
        } else {
            _this._src = '';
        }

        _this._loop = innerAudioContext.loop;
        _this._autoplay = innerAudioContext.autoplay;
        _this._paused = innerAudioContext.paused;
        _this._volume = innerAudioContext.volume;
        _this._muted = false;
        return _this;
    }

    _createClass(Audio, [{
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            type = String(type).toLowerCase();

            _get(Audio.prototype.__proto__ || Object.getPrototypeOf(Audio.prototype), 'addEventListener', this).call(this, type, listener, options);

            if (this._loaded && this._canplayEvents.indexOf(type) !== -1) {
                this.dispatchEvent({ type: type });
            }
        }
    }, {
        key: 'load',
        value: function load() {
            // console.warn('HTMLAudioElement.load() is not implemented.')
            // weixin doesn't need call load() manually
        }
    }, {
        key: 'play',
        value: function play() {
            _innerAudioContextMap[this._$sn].play();
        }
    }, {
        key: 'resume',
        value: function resume() {
            _innerAudioContextMap[this._$sn].resume();
        }
    }, {
        key: 'pause',
        value: function pause() {
            _innerAudioContextMap[this._$sn].pause();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _innerAudioContextMap[this._$sn].destroy();
        }
    }, {
        key: 'canPlayType',
        value: function canPlayType() {
            var mediaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            if (typeof mediaType !== 'string') {
                return '';
            }

            if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
                return 'probably';
            }
            return '';
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode() {
            var newAudio = new Audio();
            newAudio.loop = this.loop;
            newAudio.autoplay = this.autoplay;
            newAudio.src = this.src;
            return newAudio;
        }
    }, {
        key: 'currentTime',
        get: function get() {
            return _innerAudioContextMap[this._$sn].currentTime;
        },
        set: function set(value) {
            _innerAudioContextMap[this._$sn].seek(value);
        }
    }, {
        key: 'duration',
        get: function get() {
            return _innerAudioContextMap[this._$sn].duration;
        }
    }, {
        key: 'src',
        get: function get() {
            return this._src;
        },
        set: function set(value) {
            this._src = value;
            this._loaded = false;
            this.readyState = Audio.HAVE_NOTHING;

            var innerAudioContext = _innerAudioContextMap[this._$sn];

            innerAudioContext.src = value;
        }
    }, {
        key: 'loop',
        get: function get() {
            return this._loop;
        },
        set: function set(value) {
            this._loop = value;
            _innerAudioContextMap[this._$sn].loop = value;
        }
    }, {
        key: 'autoplay',
        get: function get() {
            return this._autoplay;
        },
        set: function set(value) {
            this._autoplay = value;
            _innerAudioContextMap[this._$sn].autoplay = value;
        }
    }, {
        key: 'paused',
        get: function get() {
            return this._paused;
        }
    }, {
        key: 'volume',
        get: function get() {
            return this._volume;
        },
        set: function set(value) {
            this._volume = value;
            if (!this._muted) {
                _innerAudioContextMap[this._$sn].volume = value;
            }
        }
    }, {
        key: 'muted',
        get: function get() {
            return this._muted;
        },
        set: function set(value) {
            this._muted = value;
            if (value) {
                _innerAudioContextMap[this._$sn].volume = 0;
            } else {
                _innerAudioContextMap[this._$sn].volume = this._volume;
            }
        }
    }]);

    return Audio;
}(_HTMLAudioElement__WEBPACK_IMPORTED_MODULE_0__["default"]);




Audio.HAVE_NOTHING = 0;
Audio.HAVE_METADATA = 1;
Audio.HAVE_CURRENT_DATA = 2;
Audio.HAVE_FUTURE_DATA = 3;
Audio.HAVE_ENOUGH_DATA = 4;

/***/ }),

/***/ "./src/Base64.js":
/*!***********************!*\
  !*** ./src/Base64.js ***!
  \***********************/
/*! exports provided: btoa, atob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btoa", function() { return btoa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atob", function() { return atob; });
/* eslint-disable */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
    this.message = message;
}
InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

// encoder
// [https://gist.github.com/999166] by [https://github.com/nignag]

function btoa(input) {
    var str = String(input);
    var output = '';
    for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) {
            throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
    }
    return output;
}

// decoder
// [https://gist.github.com/1020396] by [https://github.com/atk]
function atob(input) {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 === 1) {
        throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    var output = '';
    for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0;
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    // and if not first of each 4 characters,
    // convert the first 8 bits to one ascii character
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
}



/***/ }),

/***/ "./src/Body.js":
/*!*********************!*\
  !*** ./src/Body.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Body; });
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var Body = function (_HTMLElement) {
    _inherits(Body, _HTMLElement);

    function Body() {
        _classCallCheck(this, Body);

        // 为了性能, 此处不按照标准的DOM层级关系设计
        // 将 body 设置为 0级, parent元素为null
        return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, 'body', 0));
    }

    return Body;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Canvas; });
/* harmony import */ var _util_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/mixin */ "./src/util/mixin.js");
/* eslint-disable */

// import HTMLCanvasElement from './HTMLCanvasElement'

// TODO
var hasModifiedCanvasPrototype = false;
var hasInit2DContextConstructor = false;
var hasInitWebGLContextConstructor = false;

function Canvas() {
    var canvas = swan.createCanvas();

    var _getContext = canvas.getContext;

    // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

    if (!('tagName' in canvas)) {
        canvas.tagName = 'CANVAS';
    }

    canvas.type = 'canvas';

    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["parentNode"](canvas);
    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["style"](canvas);
    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["classList"](canvas);
    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["clientRegion"](canvas);
    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["offsetRegion"](canvas);

    canvas.focus = function () {};
    canvas.blur = function () {};

    canvas.addEventListener = function (type, listener) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        // console.log('canvas.addEventListener', type);
        document.addEventListener(type, listener, options);
    };

    canvas.removeEventListener = function (type, listener) {
        // console.log('canvas.removeEventListener', type);
        document.removeEventListener(type, listener);
    };

    canvas.dispatchEvent = function () {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        console.log('canvas.dispatchEvent', event.type, event);
        // nothing to do
    };

    return canvas;
}

/***/ }),

/***/ "./src/DocumentElement.js":
/*!********************************!*\
  !*** ./src/DocumentElement.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DocumentElement; });
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var DocumentElement = function (_HTMLElement) {
    _inherits(DocumentElement, _HTMLElement);

    function DocumentElement() {
        _classCallCheck(this, DocumentElement);

        return _possibleConstructorReturn(this, (DocumentElement.__proto__ || Object.getPrototypeOf(DocumentElement)).call(this, 'html', 0));
    }

    return DocumentElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/Element.js":
/*!************************!*\
  !*** ./src/Element.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node */ "./src/Node.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var Element = function (_Node) {
    _inherits(Element, _Node);

    function Element() {
        _classCallCheck(this, Element);

        var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

        _this.className = '';
        _this.children = [];
        return _this;
    }

    _createClass(Element, [{
        key: 'setAttribute',
        value: function setAttribute(name, value) {
            this[name] = value;
        }
    }, {
        key: 'getAttribute',
        value: function getAttribute(name) {
            return this[name];
        }
    }, {
        key: 'setAttributeNS',
        value: function setAttributeNS(name, value) {
            this[name] = value;
        }
    }, {
        key: 'getAttributeNS',
        value: function getAttributeNS(name) {
            return this[name];
        }
    }]);

    return Element;
}(_Node__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/Event.js":
/*!**********************!*\
  !*** ./src/Event.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Event; });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/index.js */ "./src/util/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */


var Event = function Event(type) {
    _classCallCheck(this, Event);

    this.cancelBubble = false;
    this.cancelable = false;
    this.target = null;
    this.currentTarget = null;
    this.preventDefault = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];
    this.stopPropagation = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];

    this.type = type;
    this.timeStamp = Date.now();
};



/***/ }),

/***/ "./src/EventIniter/MouseEvent.js":
/*!***************************************!*\
  !*** ./src/EventIniter/MouseEvent.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MouseEvent; });
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Event */ "./src/Event.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var MouseEvent = function (_Event) {
    _inherits(MouseEvent, _Event);

    function MouseEvent(type) {
        _classCallCheck(this, MouseEvent);

        return _possibleConstructorReturn(this, (MouseEvent.__proto__ || Object.getPrototypeOf(MouseEvent)).call(this, type));
    }

    return MouseEvent;
}(_Event__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/EventIniter/PointerEvent.js":
/*!*****************************************!*\
  !*** ./src/EventIniter/PointerEvent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointerEvent; });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index.js */ "./src/util/index.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Event */ "./src/Event.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */



var PointerEvent = function (_Event) {
    _inherits(PointerEvent, _Event);

    function PointerEvent(type) {
        _classCallCheck(this, PointerEvent);

        var _this = _possibleConstructorReturn(this, (PointerEvent.__proto__ || Object.getPrototypeOf(PointerEvent)).call(this, type));

        _this.target = window.canvas;
        _this.currentTarget = window.canvas;
        return _this;
    }

    return PointerEvent;
}(_Event__WEBPACK_IMPORTED_MODULE_1__["default"]);




var CLONE_PROPS = [

// MouseEvent
'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget',

// PointerEvent
'pointerId', 'width', 'height', 'pressure', 'tiltX', 'tiltY', 'pointerType', 'hwTimestamp', 'isPrimary',

// event instance
'pageX', 'pageY', 'timeStamp'];

var CLONE_DEFAULTS = [

// MouseEvent
false, false, null, null, 0, 0, 0, 0, false, false, false, false, 0, null,

// DOM Level 3
0,

// PointerEvent
0, 0, 0, 0, 0, 0, '', 0, false,

// event instance
0, 0, 0];

var POINTER_TYPE = 'touch';

function touchToPointer(type, touch, rawEvent) {
    var e = new PointerEvent(type);

    for (var i = 0; i < CLONE_PROPS.length; i++) {
        var p = CLONE_PROPS[i];
        e[p] = touch[p] || CLONE_DEFAULTS[i];
    }

    e.type = type;
    e.target = window.canvas;
    e.currentTarget = window.canvas;
    e.buttons = typeToButtons(type);
    e.which = e.buttons;

    e.pointerId = (touch.identifier || 0) + 2;
    e.bubbles = true;
    e.cancelable = true;
    // e.detail = this.clickCount;
    e.button = 0;

    e.width = (touch.radiusX || 0.5) * 2;
    e.height = (touch.radiusY || 0.5) * 2;
    e.pressure = touch.force || 0.5;
    e.isPrimary = isPrimaryPointer(touch);
    e.pointerType = POINTER_TYPE;

    // forward modifier keys
    e.altKey = rawEvent.altKey;
    e.ctrlKey = rawEvent.ctrlKey;
    e.metaKey = rawEvent.metaKey;
    e.shiftKey = rawEvent.shiftKey;

    if (rawEvent.preventDefault) {
        e.preventDefault = function () {
            rawEvent.preventDefault();
        };
    }

    return e;
}

function typeToButtons(type) {
    var ret = 0;
    if (type === 'touchstart' || type === 'touchmove' || type === 'pointerdown' || type === 'pointermove') {
        ret = 1;
    }
    return ret;
}

var firstPointer = null;

function isPrimaryPointer(touch) {
    return firstPointer === touch.identifier;
}

function setPrimaryPointer(touch) {
    if (firstPointer === null) {
        firstPointer = touch.identifier;
    }
}

function removePrimaryPointer(touch) {
    if (firstPointer === touch.identifier) {
        firstPointer = null;
    }
}

function eventHandlerFactory(type) {
    return function (rawEvent) {

        var changedTouches = rawEvent.changedTouches;

        for (var i = 0; i < changedTouches.length; i++) {
            var touch = changedTouches[i];

            if (i === 0 && type === 'pointerdown') {
                setPrimaryPointer(touch);
            } else if (type === 'pointerup' || type === 'pointercancel') {
                removePrimaryPointer(touch);
            }

            var event = touchToPointer(type, touch, rawEvent);
            document.dispatchEvent(event);
        }
    };
}

if (swan.onTouchStart) {
    swan.onTouchStart(eventHandlerFactory('pointerdown'));
    swan.onTouchMove(eventHandlerFactory('pointermove'));
    swan.onTouchEnd(eventHandlerFactory('pointerup'));
    swan.onTouchCancel(eventHandlerFactory('pointercancel'));
}

/***/ }),

/***/ "./src/EventIniter/TouchEvent.js":
/*!***************************************!*\
  !*** ./src/EventIniter/TouchEvent.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TouchEvent; });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index.js */ "./src/util/index.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Event */ "./src/Event.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */



var TouchEvent = function (_Event) {
    _inherits(TouchEvent, _Event);

    function TouchEvent(type) {
        _classCallCheck(this, TouchEvent);

        var _this = _possibleConstructorReturn(this, (TouchEvent.__proto__ || Object.getPrototypeOf(TouchEvent)).call(this, type));

        _this.touches = [];
        _this.targetTouches = [];
        _this.changedTouches = [];

        _this.target = window.canvas;
        _this.currentTarget = window.canvas;
        return _this;
    }

    return TouchEvent;
}(_Event__WEBPACK_IMPORTED_MODULE_1__["default"]);




function eventHandlerFactory(type) {
    return function (rawEvent) {
        var event = new TouchEvent(type);

        event.changedTouches = rawEvent.changedTouches;
        event.touches = rawEvent.touches;
        event.targetTouches = Array.prototype.slice.call(rawEvent.touches);
        event.timeStamp = rawEvent.timeStamp;

        document.dispatchEvent(event);
    };
}
if (swan.onTouchStart) {
    swan.onTouchStart(eventHandlerFactory('touchstart'));
    swan.onTouchMove(eventHandlerFactory('touchmove'));
    swan.onTouchEnd(eventHandlerFactory('touchend'));
    swan.onTouchCancel(eventHandlerFactory('touchcancel'));
}

/***/ }),

/***/ "./src/EventIniter/index.js":
/*!**********************************!*\
  !*** ./src/EventIniter/index.js ***!
  \**********************************/
/*! exports provided: TouchEvent, PointerEvent, MouseEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TouchEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TouchEvent */ "./src/EventIniter/TouchEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TouchEvent", function() { return _TouchEvent__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _PointerEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PointerEvent */ "./src/EventIniter/PointerEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PointerEvent", function() { return _PointerEvent__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _MouseEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MouseEvent */ "./src/EventIniter/MouseEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MouseEvent", function() { return _MouseEvent__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* eslint-disable */




/***/ }),

/***/ "./src/EventTarget.js":
/*!****************************!*\
  !*** ./src/EventTarget.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventTarget; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var _events = new WeakMap();

var EventTarget = function () {
    function EventTarget() {
        _classCallCheck(this, EventTarget);

        _events.set(this, {});
    }

    _createClass(EventTarget, [{
        key: "addEventListener",
        value: function addEventListener(type, listener) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var events = _events.get(this);

            if (!events) {
                events = {};
                _events.set(this, events);
            }
            if (!events[type]) {
                events[type] = [];
            }
            events[type].push(listener);

            if (options.capture) {
                // console.warn('EventTarget.addEventListener: options.capture is not implemented.')
            }
            if (options.once) {
                // console.warn('EventTarget.addEventListener: options.once is not implemented.')
            }
            if (options.passive) {
                // console.warn('EventTarget.addEventListener: options.passive is not implemented.')
            }
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(type, listener) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var events = _events.get(this);

            if (events) {
                var listeners = events[type];

                if (listeners && listeners.length > 0) {
                    for (var i = listeners.length; i--; i > 0) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent() {
            var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var listeners = _events.get(this)[event.type];

            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i](event);
                }
            }
        }
    }]);

    return EventTarget;
}();



/***/ }),

/***/ "./src/FileReader.js":
/*!***************************!*\
  !*** ./src/FileReader.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FileReader; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
/*
 * TODO 使用 swan.readFile 来封装 FileReader
 */
var FileReader = function () {
  function FileReader() {
    _classCallCheck(this, FileReader);
  }

  _createClass(FileReader, [{
    key: "construct",
    value: function construct() {}
  }]);

  return FileReader;
}();



/***/ }),

/***/ "./src/HTMLAudioElement.js":
/*!*********************************!*\
  !*** ./src/HTMLAudioElement.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLAudioElement; });
/* harmony import */ var _HTMLMediaElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLMediaElement */ "./src/HTMLMediaElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var HTMLAudioElement = function (_HTMLMediaElement) {
    _inherits(HTMLAudioElement, _HTMLMediaElement);

    function HTMLAudioElement() {
        _classCallCheck(this, HTMLAudioElement);

        return _possibleConstructorReturn(this, (HTMLAudioElement.__proto__ || Object.getPrototypeOf(HTMLAudioElement)).call(this, 'audio'));
    }

    return HTMLAudioElement;
}(_HTMLMediaElement__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/HTMLCanvasElement.js":
/*!**********************************!*\
  !*** ./src/HTMLCanvasElement.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "./src/Canvas.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
/* eslint-disable */
// import HTMLElement from './HTMLElement';

// export default class HTMLCanvasElement extends HTMLElement
// {
//     constructor(){
//         super('canvas')
//     }
// };




GameGlobal.screencanvas = GameGlobal.screencanvas || new _Canvas__WEBPACK_IMPORTED_MODULE_0__["default"]();
var canvas = GameGlobal.screencanvas;

var canvasConstructor = canvas.constructor;

// canvasConstructor.__proto__.__proto__ = new HTMLElement();

/* harmony default export */ __webpack_exports__["default"] = (canvasConstructor);

/***/ }),

/***/ "./src/HTMLElement.js":
/*!****************************!*\
  !*** ./src/HTMLElement.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLElement; });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/index.js */ "./src/util/index.js");
/* harmony import */ var _util_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/mixin */ "./src/util/mixin.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Element */ "./src/Element.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */




var HTMLElement = function (_Element) {
    _inherits(HTMLElement, _Element);

    function HTMLElement() {
        var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var level = arguments[1];

        _classCallCheck(this, HTMLElement);

        var _this = _possibleConstructorReturn(this, (HTMLElement.__proto__ || Object.getPrototypeOf(HTMLElement)).call(this));

        _this.className = '';
        _this.childern = [];

        _this.focus = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];
        _this.blur = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];

        _this.insertBefore = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];
        _this.appendChild = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];
        _this.removeChild = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];
        _this.remove = _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"];

        _this.innerHTML = '';

        _this.tagName = tagName.toUpperCase();

        _util_mixin__WEBPACK_IMPORTED_MODULE_1__["parentNode"](_this, level);
        _util_mixin__WEBPACK_IMPORTED_MODULE_1__["style"](_this);
        _util_mixin__WEBPACK_IMPORTED_MODULE_1__["classList"](_this);
        _util_mixin__WEBPACK_IMPORTED_MODULE_1__["clientRegion"](_this);
        _util_mixin__WEBPACK_IMPORTED_MODULE_1__["offsetRegion"](_this);
        _util_mixin__WEBPACK_IMPORTED_MODULE_1__["scrollRegion"](_this);
        return _this;
    }

    return HTMLElement;
}(_Element__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/HTMLImageElement.js":
/*!*********************************!*\
  !*** ./src/HTMLImageElement.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
/* eslint-disable */
// import HTMLElement from './HTMLElement';

// export default class HTMLImageElement extends HTMLElement
// {
//     constructor(){
//         super('img')
//     }
// };



var imageConstructor = swan.createImage().constructor;

// imageConstructor.__proto__.__proto__ = new HTMLElement();

/* harmony default export */ __webpack_exports__["default"] = (imageConstructor);

/***/ }),

/***/ "./src/HTMLMediaElement.js":
/*!*********************************!*\
  !*** ./src/HTMLMediaElement.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLMediaElement; });
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var HTMLMediaElement = function (_HTMLElement) {
    _inherits(HTMLMediaElement, _HTMLElement);

    function HTMLMediaElement(tagName) {
        _classCallCheck(this, HTMLMediaElement);

        return _possibleConstructorReturn(this, (HTMLMediaElement.__proto__ || Object.getPrototypeOf(HTMLMediaElement)).call(this, tagName));
    }

    _createClass(HTMLMediaElement, [{
        key: 'addTextTrack',
        value: function addTextTrack() {}
    }, {
        key: 'captureStream',
        value: function captureStream() {}
    }, {
        key: 'fastSeek',
        value: function fastSeek() {}
    }, {
        key: 'load',
        value: function load() {}
    }, {
        key: 'pause',
        value: function pause() {}
    }, {
        key: 'play',
        value: function play() {}
    }]);

    return HTMLMediaElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/HTMLVideoElement.js":
/*!*********************************!*\
  !*** ./src/HTMLVideoElement.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLVideoElement; });
/* harmony import */ var _HTMLMediaElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLMediaElement */ "./src/HTMLMediaElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var HTMLVideoElement = function (_HTMLMediaElement) {
    _inherits(HTMLVideoElement, _HTMLMediaElement);

    function HTMLVideoElement() {
        _classCallCheck(this, HTMLVideoElement);

        return _possibleConstructorReturn(this, (HTMLVideoElement.__proto__ || Object.getPrototypeOf(HTMLVideoElement)).call(this, 'video'));
    }

    return HTMLVideoElement;
}(_HTMLMediaElement__WEBPACK_IMPORTED_MODULE_0__["default"]);


;

/***/ }),

/***/ "./src/Image.js":
/*!**********************!*\
  !*** ./src/Image.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/mixin */ "./src/util/mixin.js");
/* harmony import */ var _HTMLImageElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HTMLImageElement */ "./src/HTMLImageElement.js");
/* eslint-disable */



/* harmony default export */ __webpack_exports__["default"] = (function () {
    var image = swan.createImage();

    // image.__proto__.__proto__.__proto__ = new HTMLImageElement();

    if (!('tagName' in image)) {
        image.tagName = 'IMG';
    }

    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["parentNode"](image);
    _util_mixin__WEBPACK_IMPORTED_MODULE_0__["classList"](image);

    return image;
});;

/***/ }),

/***/ "./src/ImageBitmap.js":
/*!****************************!*\
  !*** ./src/ImageBitmap.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageBitmap; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var ImageBitmap = function ImageBitmap() {
    // TODO

    _classCallCheck(this, ImageBitmap);
};



/***/ }),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
/* harmony import */ var _EventTarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventTarget.js */ "./src/EventTarget.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var Node = function (_EventTarget) {
    _inherits(Node, _EventTarget);

    function Node() {
        _classCallCheck(this, Node);

        var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this));

        _this.childNodes = [];
        return _this;
    }

    _createClass(Node, [{
        key: 'appendChild',
        value: function appendChild(node) {
            this.childNodes.push(node);
            // if (node instanceof Node) {
            //   this.childNodes.push(node)
            // } else {
            //   throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.')
            // }
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode() {
            var copyNode = Object.create(this);

            Object.assign(copyNode, this);
            return copyNode;
        }
    }, {
        key: 'removeChild',
        value: function removeChild(node) {
            var index = this.childNodes.findIndex(function (child) {
                return child === node;
            });

            if (index > -1) {
                return this.childNodes.splice(index, 1);
            }
            return null;
        }
    }]);

    return Node;
}(_EventTarget_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/WebGLRenderingContext.js":
/*!**************************************!*\
  !*** ./src/WebGLRenderingContext.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebGLRenderingContext; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var WebGLRenderingContext = function WebGLRenderingContext() {
    // TODO

    _classCallCheck(this, WebGLRenderingContext);
};



/***/ }),

/***/ "./src/WebSocket.js":
/*!**************************!*\
  !*** ./src/WebSocket.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebSocket; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var _socketTask = new WeakMap();

var WebSocket = function () {
  function WebSocket(url) {
    var _this = this;

    var protocols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, WebSocket);

    this.binaryType = ''; // TODO 更新 binaryType
    this.bufferedAmount = 0; // TODO 更新 bufferedAmount
    this.extensions = '';

    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    this.onopen = null;

    this.protocol = ''; // TODO 小程序内目前获取不到，实际上需要根据服务器选择的 sub-protocol 返回
    this.readyState = 3;

    if (typeof url !== 'string' || !/(^ws:\/\/)|(^wss:\/\/)/.test(url)) {
      throw new TypeError('Failed to construct \'WebSocket\': The URL \'' + url + '\' is invalid');
    }

    this.url = url;
    this.readyState = WebSocket.CONNECTING;

    var socketTask = swan.connectSocket({
      url: url,
      protocols: Array.isArray(protocols) ? protocols : [protocols]
    });

    _socketTask.set(this, socketTask);

    socketTask.onClose(function (res) {
      _this.readyState = WebSocket.CLOSED;
      if (typeof _this.onclose === 'function') {
        _this.onclose(res);
      }
    });

    socketTask.onMessage(function (res) {
      if (typeof _this.onmessage === 'function') {
        _this.onmessage(res);
      }
    });

    socketTask.onOpen(function () {
      _this.readyState = WebSocket.OPEN;
      if (typeof _this.onopen === 'function') {
        _this.onopen();
      }
    });

    socketTask.onError(function (res) {
      if (typeof _this.onerror === 'function') {
        _this.onerror(new Error(res.errMsg));
      }
    });

    return this;
  }

  _createClass(WebSocket, [{
    key: 'close',
    value: function close(code, reason) {
      this.readyState = WebSocket.CLOSING;
      var socketTask = _socketTask.get(this);

      socketTask.close({
        code: code,
        reason: reason
      });
    }
  }, {
    key: 'send',
    value: function send(data) {
      if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
        throw new TypeError('Failed to send message: The data ' + data + ' is invalid');
      }

      var socketTask = _socketTask.get(this);

      socketTask.send({
        data: data
      });
    }
  }]);

  return WebSocket;
}();




WebSocket.CONNECTING = 0; // The connection is not yet open.
WebSocket.OPEN = 1; // The connection is open and ready to communicate.
WebSocket.CLOSING = 2; // The connection is in the process of closing.
WebSocket.CLOSED = 3; // The connection is closed or couldn't be opened.

/***/ }),

/***/ "./src/WindowProperties.js":
/*!*********************************!*\
  !*** ./src/WindowProperties.js ***!
  \*********************************/
/*! exports provided: innerWidth, innerHeight, devicePixelRatio, screen, scrollX, scrollY, ontouchstart, ontouchmove, ontouchend, performance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "innerWidth", function() { return innerWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "innerHeight", function() { return innerHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devicePixelRatio", function() { return devicePixelRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screen", function() { return screen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollX", function() { return scrollX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollY", function() { return scrollY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ontouchstart", function() { return ontouchstart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ontouchmove", function() { return ontouchmove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ontouchend", function() { return ontouchend; });
/* harmony import */ var _performance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./performance */ "./src/performance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "performance", function() { return _performance__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* eslint-disable */
var _ref = swan.getSystemInfoSync ? swan.getSystemInfoSync() : { screenWidth: 0, screenHeight: 0, devicePixelRatio: 1 // Mock data

},
    screenWidth = _ref.screenWidth,
    screenHeight = _ref.screenHeight,
    devicePixelRatio = _ref.devicePixelRatio;

var innerWidth = screenWidth;
var innerHeight = screenHeight;

var screen = {
    width: screenWidth,
    height: screenHeight,
    availWidth: innerWidth,
    availHeight: innerHeight,
    availLeft: 0,
    availTop: 0
};
var scrollX = 0;
var scrollY = 0;
var ontouchstart = null;
var ontouchmove = null;
var ontouchend = null;



/***/ }),

/***/ "./src/Worker.js":
/*!***********************!*\
  !*** ./src/Worker.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Worker; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var Worker = function () {
    function Worker(file) {
        var _this = this;

        _classCallCheck(this, Worker);

        this.onmessage = null;

        // 目前 微信小游戏中 Worker 最大并发数量限制为 1 个，
        // 所以创建新Worker前, 需要结束现有的 Worker.terminate
        if (Worker.previousWorker) {
            Worker.previousWorker.terminate();
        }
        Worker.previousWorker = this;

        this._file = file;

        this._worker = swan.createWorker(file);

        this._worker.onMessage(function (res) {
            if (_this.onmessage) {
                _this.onmessage({
                    target: _this,
                    data: res
                });
            }
        });
    }

    _createClass(Worker, [{
        key: "postMessage",
        value: function postMessage(message, transferList) {
            this._worker.postMessage(message, transferList);
        }
    }, {
        key: "terminate",
        value: function terminate() {
            this._worker.terminate();
            Worker.previousWorker = null;
        }
    }]);

    return Worker;
}();




Worker.previousWorker = null;

// export default function(file) {
//     const worker = swan.createWorker(file)

//     return worker
// }

/***/ }),

/***/ "./src/XMLHttpRequest.js":
/*!*******************************!*\
  !*** ./src/XMLHttpRequest.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return XMLHttpRequest; });
/* harmony import */ var _EventTarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventTarget.js */ "./src/EventTarget.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */


var _url = new WeakMap();
var _method = new WeakMap();
var _requestHeader = new WeakMap();
var _responseHeader = new WeakMap();
var _requestTask = new WeakMap();

var fs = void 0;

function _triggerEvent(type) {
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    event.target = event.target || this;

    if (typeof this['on' + type] === 'function') {
        this['on' + type].call(this, event);
    }
}

function _changeReadyState(readyState) {
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.readyState = readyState;

    event.readyState = readyState;

    _triggerEvent.call(this, 'readystatechange', event);
}

function _isRelativePath(url) {
    return !/^(http|https|ftp|wxfile):\/\/.*/i.test(url);
}

var XMLHttpRequest = function (_EventTarget) {
    _inherits(XMLHttpRequest, _EventTarget);

    function XMLHttpRequest() {
        _classCallCheck(this, XMLHttpRequest);

        /*
         * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
         */
        var _this = _possibleConstructorReturn(this, (XMLHttpRequest.__proto__ || Object.getPrototypeOf(XMLHttpRequest)).call(this));

        _this.onabort = null;
        _this.onerror = null;
        _this.onload = null;
        _this.onloadstart = null;
        _this.onprogress = null;
        _this.ontimeout = null;
        _this.onloadend = null;

        _this.onreadystatechange = null;
        _this.readyState = 0;
        _this.response = null;
        _this.responseText = null;
        _this.responseType = '';
        _this.responseXML = null;
        _this.status = 0;
        _this.statusText = '';
        _this.upload = {};
        _this.withCredentials = false;

        _requestHeader.set(_this, {
            'content-type': 'application/x-www-form-urlencoded'
        });
        _responseHeader.set(_this, {});
        return _this;
    }

    _createClass(XMLHttpRequest, [{
        key: 'abort',
        value: function abort() {
            var myRequestTask = _requestTask.get(this);

            if (myRequestTask) {
                myRequestTask.abort();
            }
        }
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders() {
            var responseHeader = _responseHeader.get(this);

            return Object.keys(responseHeader).map(function (header) {
                return header + ': ' + responseHeader[header];
            }).join('\n');
        }
    }, {
        key: 'getResponseHeader',
        value: function getResponseHeader(header) {
            return _responseHeader.get(this)[header];
        }
    }, {
        key: 'open',
        value: function open(method, url /* async, user, password 这几个参数在小程序内不支持*/) {
            _method.set(this, method);
            _url.set(this, url);
            _changeReadyState.call(this, XMLHttpRequest.OPENED);
        }
    }, {
        key: 'overrideMimeType',
        value: function overrideMimeType() {}
    }, {
        key: 'send',
        value: function send() {
            var _this2 = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            if (this.readyState !== XMLHttpRequest.OPENED) {
                throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
            } else {
                var url = _url.get(this);
                var header = _requestHeader.get(this);
                var responseType = this.responseType;

                var relative = _isRelativePath(url);
                var encoding = void 0;

                if (responseType === 'arraybuffer') {
                    // encoding = 'binary'
                } else {
                    encoding = 'utf8';
                }

                delete this.response;
                this.response = null;

                var onSuccess = function onSuccess(_ref) {
                    var data = _ref.data,
                        statusCode = _ref.statusCode,
                        header = _ref.header;

                    statusCode = statusCode === undefined ? 200 : statusCode;
                    if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
                        try {
                            data = JSON.stringify(data);
                        } catch (e) {
                            data = data;
                        }
                    }

                    _this2.status = statusCode;
                    if (header) {
                        _responseHeader.set(_this2, header);
                    }
                    _triggerEvent.call(_this2, 'loadstart');
                    _changeReadyState.call(_this2, XMLHttpRequest.HEADERS_RECEIVED);
                    _changeReadyState.call(_this2, XMLHttpRequest.LOADING);

                    _this2.response = data;

                    if (data instanceof ArrayBuffer) {
                        Object.defineProperty(_this2, 'responseText', {
                            enumerable: true,
                            configurable: true,
                            get: function get() {
                                throw "InvalidStateError : responseType is " + this.responseType;
                            }
                        });
                    } else {
                        Object.defineProperty(_this2, 'responseText', {
                            enumerable: true,
                            configurable: true,
                            value: data
                        });
                    }
                    _changeReadyState.call(_this2, XMLHttpRequest.DONE);
                    _triggerEvent.call(_this2, 'load');
                    _triggerEvent.call(_this2, 'loadend');
                };

                var onFail = function onFail(_ref2) {
                    var errMsg = _ref2.errMsg;

                    // TODO 规范错误

                    if (errMsg.indexOf('abort') !== -1) {
                        _triggerEvent.call(_this2, 'abort');
                    } else {
                        _triggerEvent.call(_this2, 'error', {
                            message: errMsg
                        });
                    }
                    _triggerEvent.call(_this2, 'loadend');

                    if (relative) {
                        // 用户即使没监听error事件, 也给出相应的警告
                        console.warn(errMsg);
                    }
                };

                if (relative) {
                    var options = {
                        'filePath': url,
                        'success': onSuccess,
                        'fail': onFail
                    };
                    if (encoding) {
                        options['encoding'] = encoding;
                    }
                    if (!fs) {
                        fs = swan.getFileSystemManager();
                    }
                    fs.readFile(options);
                    return;
                }

                swan.request({
                    data: data,
                    url: url,
                    method: _method.get(this),
                    header: header,
                    responseType: responseType,
                    success: onSuccess,
                    fail: onFail
                });
            }
        }
    }, {
        key: 'setRequestHeader',
        value: function setRequestHeader(header, value) {
            var myHeader = _requestHeader.get(this);

            myHeader[header] = value;
            _requestHeader.set(this, myHeader);
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            var _this3 = this;

            if (typeof listener !== 'function') {
                return;
            }

            this['on' + type] = function () {
                var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                event.target = event.target || _this3;
                listener.call(_this3, event);
            };
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener) {
            if (this['on' + type] === listener) {
                this['on' + type] = null;
            }
        }
    }]);

    return XMLHttpRequest;
}(_EventTarget_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

// TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态



XMLHttpRequest.UNSEND = 0;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

/***/ }),

/***/ "./src/document.js":
/*!*************************!*\
  !*** ./src/document.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./window */ "./src/window.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/Event.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
/* harmony import */ var _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HTMLVideoElement */ "./src/HTMLVideoElement.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Image */ "./src/Image.js");
/* harmony import */ var _Audio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Audio */ "./src/Audio.js");
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Canvas */ "./src/Canvas.js");
/* harmony import */ var _DocumentElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DocumentElement */ "./src/DocumentElement.js");
/* harmony import */ var _Body__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Body */ "./src/Body.js");
/* harmony import */ var _EventIniter_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EventIniter/index.js */ "./src/EventIniter/index.js");
/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./location */ "./src/location.js");
/* eslint-disable */












var events = {};

var document = {
    readyState: 'complete',
    visibilityState: 'visible', // 'visible' , 'hidden'
    hidden: false,
    fullscreen: true,

    URL: _location__WEBPACK_IMPORTED_MODULE_10__["default"].href,

    location: _window__WEBPACK_IMPORTED_MODULE_0__["location"],

    scripts: [],
    style: {},

    ontouchstart: null,
    ontouchmove: null,
    ontouchend: null,
    onvisibilitychange: null,

    parentNode: null,
    parentElement: null,

    createElement: function createElement(tagName) {
        tagName = tagName.toLowerCase();
        if (tagName === 'canvas') {
            return new _Canvas__WEBPACK_IMPORTED_MODULE_6__["default"]();
        } else if (tagName === 'audio') {
            return new _Audio__WEBPACK_IMPORTED_MODULE_5__["default"]();
        } else if (tagName === 'img') {
            return new _Image__WEBPACK_IMPORTED_MODULE_4__["default"]();
        } else if (tagName === 'video') {
            return new _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_3__["default"]();
        }

        return new _HTMLElement__WEBPACK_IMPORTED_MODULE_2__["default"](tagName);
    },
    createElementNS: function createElementNS(nameSpace, tagName) {
        return this.createElement(tagName);
    },
    createTextNode: function createTextNode(text) {
        // TODO: Do we need the TextNode Class ???
        return text;
    },
    getElementById: function getElementById(id) {
        if (id === _window__WEBPACK_IMPORTED_MODULE_0__["canvas"].id) {
            return _window__WEBPACK_IMPORTED_MODULE_0__["canvas"];
        }
        return null;
    },
    getElementsByTagName: function getElementsByTagName(tagName) {
        tagName = tagName.toLowerCase();
        if (tagName === 'head') {
            return [document.head];
        } else if (tagName === 'body') {
            return [document.body];
        } else if (tagName === 'canvas') {
            return [_window__WEBPACK_IMPORTED_MODULE_0__["canvas"]];
        }
        return [];
    },
    getElementsByTagNameNS: function getElementsByTagNameNS(nameSpace, tagName) {
        return this.getElementsByTagName(tagName);
    },
    getElementsByName: function getElementsByName(tagName) {
        if (tagName === 'head') {
            return [document.head];
        } else if (tagName === 'body') {
            return [document.body];
        } else if (tagName === 'canvas') {
            return [_window__WEBPACK_IMPORTED_MODULE_0__["canvas"]];
        }
        return [];
    },
    querySelector: function querySelector(query) {
        if (query === 'head') {
            return document.head;
        } else if (query === 'body') {
            return document.body;
        } else if (query === 'canvas') {
            return _window__WEBPACK_IMPORTED_MODULE_0__["canvas"];
        } else if (query === '#' + _window__WEBPACK_IMPORTED_MODULE_0__["canvas"].id) {
            return _window__WEBPACK_IMPORTED_MODULE_0__["canvas"];
        }
        return null;
    },
    querySelectorAll: function querySelectorAll(query) {
        if (query === 'head') {
            return [document.head];
        } else if (query === 'body') {
            return [document.body];
        } else if (query === 'canvas') {
            return [_window__WEBPACK_IMPORTED_MODULE_0__["canvas"]];
        }
        return [];
    },
    addEventListener: function addEventListener(type, listener) {
        if (!events[type]) {
            events[type] = [];
        }
        events[type].push(listener);
    },
    removeEventListener: function removeEventListener(type, listener) {
        var listeners = events[type];

        if (listeners && listeners.length > 0) {
            for (var i = listeners.length; i--; i > 0) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    dispatchEvent: function dispatchEvent(event) {
        var type = event.type;
        var listeners = events[type];

        if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](event);
            }
        }

        if (event.target && typeof event.target['on' + type] === 'function') {
            event.target['on' + type](event);
        }
    }
};

document.documentElement = new _DocumentElement__WEBPACK_IMPORTED_MODULE_7__["default"]();
document.head = new _HTMLElement__WEBPACK_IMPORTED_MODULE_2__["default"]('head');
document.body = new _Body__WEBPACK_IMPORTED_MODULE_8__["default"]();

function onVisibilityChange(visible) {

    return function () {

        document.visibilityState = visible ? 'visible' : 'hidden';

        var hidden = !visible;
        if (document.hidden === hidden) {
            return;
        }
        document.hidden = hidden;

        var event = new _Event__WEBPACK_IMPORTED_MODULE_1__["default"]('visibilitychange');

        event.target = document;
        event.timeStamp = Date.now();

        document.dispatchEvent(event);
    };
}

if (swan.onHide) {
    swan.onHide(onVisibilityChange(false));
    swan.onShow(onVisibilityChange(true));
}

/* harmony default export */ __webpack_exports__["default"] = (document);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./window */ "./src/window.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./document */ "./src/document.js");
/* harmony import */ var _util_isDevtool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/isDevtool */ "./src/util/isDevtool.js");
/* eslint-disable */




// Avoid being static analyzed in webpack
var _window = _window__WEBPACK_IMPORTED_MODULE_0__;

var global = GameGlobal;

GameGlobal.global = GameGlobal.global || global;

function inject() {
    _window.document = _document__WEBPACK_IMPORTED_MODULE_1__["default"];

    _window.addEventListener = function (type, listener) {
        _window.document.addEventListener(type, listener);
    };
    _window.removeEventListener = function (type, listener) {
        _window.document.removeEventListener(type, listener);
    };
    _window.dispatchEvent = function () {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        console.log('window.dispatchEvent', event.type, event);
        // nothing to do
    };

    if (Object(_util_isDevtool__WEBPACK_IMPORTED_MODULE_2__["default"])()) {
        for (var key in _window) {
            var descriptor = Object.getOwnPropertyDescriptor(global, key);

            if (!descriptor || descriptor.configurable === true) {
                Object.defineProperty(window, key, {
                    value: _window[key]
                });
            }
        }

        for (var _key in _window.document) {
            var _descriptor = Object.getOwnPropertyDescriptor(global.document, _key);

            if (!_descriptor || _descriptor.configurable === true) {
                Object.defineProperty(global.document, _key, {
                    value: _window.document[_key]
                });
            }
        }
        window.parent = window;
    } else {
        for (var _key2 in _window) {
            global[_key2] = _window[_key2];
        }
        global.window = global;
        global.top = global.parent = global;
    }
}

if (!GameGlobal.__isAdapterInjected) {
    GameGlobal.__isAdapterInjected = true;
    inject();
}

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
var localStorage = {
    get length() {
        var _swan$getStorageInfoS = swan.getStorageInfoSync(),
            keys = _swan$getStorageInfoS.keys;

        return keys.length;
    },

    key: function key(n) {
        var _swan$getStorageInfoS2 = swan.getStorageInfoSync(),
            keys = _swan$getStorageInfoS2.keys;

        return keys[n];
    },
    getItem: function getItem(key) {
        var value = swan.getStorageSync(key);
        return value === "" ? null : value;
    },
    setItem: function setItem(key, value) {
        return swan.setStorageSync(key, value);
    },
    removeItem: function removeItem(key) {
        swan.removeStorageSync(key);
    },
    clear: function clear() {
        swan.clearStorageSync();
    }
};

/* harmony default export */ __webpack_exports__["default"] = (localStorage);

/***/ }),

/***/ "./src/location.js":
/*!*************************!*\
  !*** ./src/location.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
var location = {
  href: 'game.js',

  search: '',

  hash: '',

  reload: function reload() {},
  replace: function replace(href) {
    this.href = href;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (location);

/***/ }),

/***/ "./src/navigator.js":
/*!**************************!*\
  !*** ./src/navigator.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/index.js */ "./src/util/index.js");
/* eslint-disable */


// TODO 开放域下用 userAgent
var systemInfo = swan.getSystemInfoSync && swan.getSystemInfoSync();

var system = systemInfo && systemInfo.system || '';
var platform = systemInfo && systemInfo.platform || '';
var language = systemInfo && systemInfo.language || '"zh_CN"';

var android = system.toLowerCase().indexOf('android') !== -1;

var uaDesc = android ? 'Android; CPU Android 6.0' : 'iPhone; CPU iPhone OS 10_3_1 like Mac OS X';
var ua = 'Mozilla/5.0 (' + uaDesc + ') AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 SwanGame NetType/WIFI Language/' + language;

var navigator = {
  platform: platform,
  language: language,
  appVersion: '5.0 (' + uaDesc + ') AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  userAgent: ua,
  onLine: true, // TODO 用 swan.getNetworkStateChange 和 swan.onNetworkStateChange 来返回真实的状态

  // TODO 用 swan.getLocation 来封装 geolocation
  geolocation: {
    getCurrentPosition: _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"],
    watchPosition: _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"],
    clearWatch: _util_index_js__WEBPACK_IMPORTED_MODULE_0__["noop"]
  }
};

if (swan.onNetworkStatusChange) {
  swan.onNetworkStatusChange(function (event) {
    navigator.onLine = event.isConnected;
  });
}

/* harmony default export */ __webpack_exports__["default"] = (navigator);

/***/ }),

/***/ "./src/performance.js":
/*!****************************!*\
  !*** ./src/performance.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_isDevtool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/isDevtool */ "./src/util/isDevtool.js");
/* eslint-disable */


var performance = void 0;

if (swan.getPerformance) {
  var wxPerf = swan.getPerformance();
  var initTime = wxPerf.now();

  var clientPerfAdapter = Object.assign({}, wxPerf, {
    now: function now() {
      return (wxPerf.now() - initTime) / 1000;
    }
  });

  performance = Object(_util_isDevtool__WEBPACK_IMPORTED_MODULE_0__["default"])() ? wxPerf : clientPerfAdapter;
}

/* harmony default export */ __webpack_exports__["default"] = (performance);

/***/ }),

/***/ "./src/style/CanvasComputedStyle.js":
/*!******************************************!*\
  !*** ./src/style/CanvasComputedStyle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonComputedStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommonComputedStyle */ "./src/style/CommonComputedStyle.js");
/* eslint-disable */


function getCanvasComputedStyle(canvas) {
    var rect = canvas.getBoundingClientRect();
    var style = Object.assign(_CommonComputedStyle__WEBPACK_IMPORTED_MODULE_0__["default"], {
        "display": "inline",
        "position": "static",
        "inlineSize": rect.width + "px",
        "perspectiveOrigin": rect.width / 2 + "px " + rect.height / 2 + "px",
        "transformOrigin": rect.width / 2 + "px " + rect.height / 2 + "px",
        "webkitLogicalWidth": rect.width + "px",
        "webkitLogicalHeight": rect.height + "px",
        "width": rect.width + "px",
        "height": rect.height + "px"
    });
    return style;
}

/* harmony default export */ __webpack_exports__["default"] = (getCanvasComputedStyle);

/***/ }),

/***/ "./src/style/CommonComputedStyle.js":
/*!******************************************!*\
  !*** ./src/style/CommonComputedStyle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
var style = {
    "0": "animation-delay",
    "1": "animation-direction",
    "2": "animation-duration",
    "3": "animation-fill-mode",
    "4": "animation-iteration-count",
    "5": "animation-name",
    "6": "animation-play-state",
    "7": "animation-timing-function",
    "8": "background-attachment",
    "9": "background-blend-mode",
    "10": "background-clip",
    "11": "background-color",
    "12": "background-image",
    "13": "background-origin",
    "14": "background-position",
    "15": "background-repeat",
    "16": "background-size",
    "17": "border-bottom-color",
    "18": "border-bottom-left-radius",
    "19": "border-bottom-right-radius",
    "20": "border-bottom-style",
    "21": "border-bottom-width",
    "22": "border-collapse",
    "23": "border-image-outset",
    "24": "border-image-repeat",
    "25": "border-image-slice",
    "26": "border-image-source",
    "27": "border-image-width",
    "28": "border-left-color",
    "29": "border-left-style",
    "30": "border-left-width",
    "31": "border-right-color",
    "32": "border-right-style",
    "33": "border-right-width",
    "34": "border-top-color",
    "35": "border-top-left-radius",
    "36": "border-top-right-radius",
    "37": "border-top-style",
    "38": "border-top-width",
    "39": "bottom",
    "40": "box-shadow",
    "41": "box-sizing",
    "42": "break-after",
    "43": "break-before",
    "44": "break-inside",
    "45": "caption-side",
    "46": "clear",
    "47": "clip",
    "48": "color",
    "49": "content",
    "50": "cursor",
    "51": "direction",
    "52": "display",
    "53": "empty-cells",
    "54": "float",
    "55": "font-family",
    "56": "font-kerning",
    "57": "font-size",
    "58": "font-stretch",
    "59": "font-style",
    "60": "font-variant",
    "61": "font-variant-ligatures",
    "62": "font-variant-caps",
    "63": "font-variant-numeric",
    "64": "font-variant-east-asian",
    "65": "font-weight",
    "66": "height",
    "67": "image-rendering",
    "68": "isolation",
    "69": "justify-items",
    "70": "justify-self",
    "71": "left",
    "72": "letter-spacing",
    "73": "line-height",
    "74": "list-style-image",
    "75": "list-style-position",
    "76": "list-style-type",
    "77": "margin-bottom",
    "78": "margin-left",
    "79": "margin-right",
    "80": "margin-top",
    "81": "max-height",
    "82": "max-width",
    "83": "min-height",
    "84": "min-width",
    "85": "mix-blend-mode",
    "86": "object-fit",
    "87": "object-position",
    "88": "offset-distance",
    "89": "offset-path",
    "90": "offset-rotate",
    "91": "opacity",
    "92": "orphans",
    "93": "outline-color",
    "94": "outline-offset",
    "95": "outline-style",
    "96": "outline-width",
    "97": "overflow-anchor",
    "98": "overflow-wrap",
    "99": "overflow-x",
    "100": "overflow-y",
    "101": "padding-bottom",
    "102": "padding-left",
    "103": "padding-right",
    "104": "padding-top",
    "105": "pointer-events",
    "106": "position",
    "107": "resize",
    "108": "right",
    "109": "scroll-behavior",
    "110": "speak",
    "111": "table-layout",
    "112": "tab-size",
    "113": "text-align",
    "114": "text-align-last",
    "115": "text-decoration",
    "116": "text-decoration-line",
    "117": "text-decoration-style",
    "118": "text-decoration-color",
    "119": "text-decoration-skip-ink",
    "120": "text-underline-position",
    "121": "text-indent",
    "122": "text-rendering",
    "123": "text-shadow",
    "124": "text-size-adjust",
    "125": "text-overflow",
    "126": "text-transform",
    "127": "top",
    "128": "touch-action",
    "129": "transition-delay",
    "130": "transition-duration",
    "131": "transition-property",
    "132": "transition-timing-function",
    "133": "unicode-bidi",
    "134": "vertical-align",
    "135": "visibility",
    "136": "white-space",
    "137": "widows",
    "138": "width",
    "139": "will-change",
    "140": "word-break",
    "141": "word-spacing",
    "142": "word-wrap",
    "143": "z-index",
    "144": "zoom",
    "145": "-webkit-appearance",
    "146": "backface-visibility",
    "147": "-webkit-border-horizontal-spacing",
    "148": "-webkit-border-image",
    "149": "-webkit-border-vertical-spacing",
    "150": "-webkit-box-align",
    "151": "-webkit-box-decoration-break",
    "152": "-webkit-box-direction",
    "153": "-webkit-box-flex",
    "154": "-webkit-box-flex-group",
    "155": "-webkit-box-lines",
    "156": "-webkit-box-ordinal-group",
    "157": "-webkit-box-orient",
    "158": "-webkit-box-pack",
    "159": "-webkit-box-reflect",
    "160": "column-count",
    "161": "column-gap",
    "162": "column-rule-color",
    "163": "column-rule-style",
    "164": "column-rule-width",
    "165": "column-span",
    "166": "column-width",
    "167": "align-content",
    "168": "align-items",
    "169": "align-self",
    "170": "flex-basis",
    "171": "flex-grow",
    "172": "flex-shrink",
    "173": "flex-direction",
    "174": "flex-wrap",
    "175": "justify-content",
    "176": "-webkit-font-smoothing",
    "177": "grid-auto-columns",
    "178": "grid-auto-flow",
    "179": "grid-auto-rows",
    "180": "grid-column-end",
    "181": "grid-column-start",
    "182": "grid-template-areas",
    "183": "grid-template-columns",
    "184": "grid-template-rows",
    "185": "grid-row-end",
    "186": "grid-row-start",
    "187": "grid-column-gap",
    "188": "grid-row-gap",
    "189": "-webkit-highlight",
    "190": "hyphens",
    "191": "-webkit-hyphenate-character",
    "192": "-webkit-line-break",
    "193": "-webkit-line-clamp",
    "194": "-webkit-locale",
    "195": "-webkit-margin-before-collapse",
    "196": "-webkit-margin-after-collapse",
    "197": "-webkit-mask-box-image",
    "198": "-webkit-mask-box-image-outset",
    "199": "-webkit-mask-box-image-repeat",
    "200": "-webkit-mask-box-image-slice",
    "201": "-webkit-mask-box-image-source",
    "202": "-webkit-mask-box-image-width",
    "203": "-webkit-mask-clip",
    "204": "-webkit-mask-composite",
    "205": "-webkit-mask-image",
    "206": "-webkit-mask-origin",
    "207": "-webkit-mask-position",
    "208": "-webkit-mask-repeat",
    "209": "-webkit-mask-size",
    "210": "order",
    "211": "perspective",
    "212": "perspective-origin",
    "213": "-webkit-print-color-adjust",
    "214": "-webkit-rtl-ordering",
    "215": "shape-outside",
    "216": "shape-image-threshold",
    "217": "shape-margin",
    "218": "-webkit-tap-highlight-color",
    "219": "-webkit-text-combine",
    "220": "-webkit-text-decorations-in-effect",
    "221": "-webkit-text-emphasis-color",
    "222": "-webkit-text-emphasis-position",
    "223": "-webkit-text-emphasis-style",
    "224": "-webkit-text-fill-color",
    "225": "-webkit-text-orientation",
    "226": "-webkit-text-security",
    "227": "-webkit-text-stroke-color",
    "228": "-webkit-text-stroke-width",
    "229": "transform",
    "230": "transform-origin",
    "231": "transform-style",
    "232": "-webkit-user-drag",
    "233": "-webkit-user-modify",
    "234": "user-select",
    "235": "-webkit-writing-mode",
    "236": "-webkit-app-region",
    "237": "buffered-rendering",
    "238": "clip-path",
    "239": "clip-rule",
    "240": "mask",
    "241": "filter",
    "242": "flood-color",
    "243": "flood-opacity",
    "244": "lighting-color",
    "245": "stop-color",
    "246": "stop-opacity",
    "247": "color-interpolation",
    "248": "color-interpolation-filters",
    "249": "color-rendering",
    "250": "fill",
    "251": "fill-opacity",
    "252": "fill-rule",
    "253": "marker-end",
    "254": "marker-mid",
    "255": "marker-start",
    "256": "mask-type",
    "257": "shape-rendering",
    "258": "stroke",
    "259": "stroke-dasharray",
    "260": "stroke-dashoffset",
    "261": "stroke-linecap",
    "262": "stroke-linejoin",
    "263": "stroke-miterlimit",
    "264": "stroke-opacity",
    "265": "stroke-width",
    "266": "alignment-baseline",
    "267": "baseline-shift",
    "268": "dominant-baseline",
    "269": "text-anchor",
    "270": "writing-mode",
    "271": "vector-effect",
    "272": "paint-order",
    "273": "d",
    "274": "cx",
    "275": "cy",
    "276": "x",
    "277": "y",
    "278": "r",
    "279": "rx",
    "280": "ry",
    "281": "caret-color",
    "282": "line-break",

    "display": "inline",
    "dominantBaseline": "auto",
    "emptyCells": "show",
    "fill": "rgb(0, 0, 0)",
    "fillOpacity": "1",
    "fillRule": "nonzero",
    "filter": "none",
    "flex": "0 1 auto",
    "flexBasis": "auto",
    "flexDirection": "row",
    "flexFlow": "row nowrap",
    "flexGrow": "0",
    "flexShrink": "1",
    "flexWrap": "nowrap",
    "float": "none",
    "floodColor": "rgb(0, 0, 0)",
    "floodOpacity": "1",
    "font": "normal normal 400 normal 16px / normal \"PingFang SC\"",
    "fontDisplay": "",
    "fontFamily": "\"PingFang SC\"",
    "fontFeatureSettings": "normal",
    "fontKerning": "auto",
    "fontSize": "16px",
    "fontStretch": "100%",
    "fontStyle": "normal",
    "fontVariant": "normal",
    "fontVariantCaps": "normal",
    "fontVariantEastAsian": "normal",
    "fontVariantLigatures": "normal",
    "fontVariantNumeric": "normal",
    "fontVariationSettings": "normal",
    "fontWeight": "400",
    "grid": "none / none / none / row / auto / auto",
    "gridArea": "auto / auto / auto / auto",
    "gridAutoColumns": "auto",
    "gridAutoFlow": "row",
    "gridAutoRows": "auto",
    "gridColumn": "auto / auto",
    "gridColumnEnd": "auto",
    "gridColumnGap": "0px",
    "gridColumnStart": "auto",
    "gridGap": "0px 0px",
    "gridRow": "auto / auto",
    "gridRowEnd": "auto",
    "gridRowGap": "0px",
    "gridRowStart": "auto",
    "gridTemplate": "none / none / none",
    "gridTemplateAreas": "none",
    "gridTemplateColumns": "none",
    "gridTemplateRows": "none",
    "height": "0px",
    "hyphens": "manual",
    "imageRendering": "auto",
    "inlineSize": "0px",
    "isolation": "auto",
    "justifyContent": "normal",
    "justifyItems": "normal",
    "justifySelf": "auto",
    "left": "auto",
    "letterSpacing": "normal",
    "lightingColor": "rgb(255, 255, 255)",
    "lineBreak": "auto",
    "lineHeight": "normal",
    "listStyle": "disc outside none",
    "listStyleImage": "none",
    "listStylePosition": "outside",
    "listStyleType": "disc",
    "margin": "0px",
    "marginBottom": "0px",
    "marginLeft": "0px",
    "marginRight": "0px",
    "marginTop": "0px",
    "marker": "",
    "markerEnd": "none",
    "markerMid": "none",
    "markerStart": "none",
    "mask": "none",
    "maskType": "luminance",
    "maxBlockSize": "none",
    "maxHeight": "none",
    "maxInlineSize": "none",
    "maxWidth": "none",
    "maxZoom": "",
    "minBlockSize": "0px",
    "minHeight": "0px",
    "minInlineSize": "0px",
    "minWidth": "0px",
    "minZoom": "",
    "mixBlendMode": "normal",
    "objectFit": "fill",
    "objectPosition": "50% 50%",
    "offset": "none 0px auto 0deg",
    "offsetDistance": "0px",
    "offsetPath": "none",
    "offsetRotate": "auto 0deg",
    "opacity": "1",
    "order": "0",
    "orientation": "",
    "orphans": "2",
    "outline": "rgb(0, 0, 0) none 0px",
    "outlineColor": "rgb(0, 0, 0)",
    "outlineOffset": "0px",
    "outlineStyle": "none",
    "outlineWidth": "0px",
    "overflow": "visible",
    "overflowAnchor": "auto",
    "overflowWrap": "normal",
    "overflowX": "visible",
    "overflowY": "visible",
    "overscrollBehavior": "auto auto",
    "overscrollBehaviorX": "auto",
    "overscrollBehaviorY": "auto",
    "padding": "0px",
    "paddingBottom": "0px",
    "paddingLeft": "0px",
    "paddingRight": "0px",
    "paddingTop": "0px",
    "page": "",
    "pageBreakAfter": "auto",
    "pageBreakBefore": "auto",
    "pageBreakInside": "auto",
    "paintOrder": "fill stroke markers",
    "perspective": "none",
    "perspectiveOrigin": "0px 0px",
    "placeContent": "normal normal",
    "placeItems": "normal normal",
    "placeSelf": "auto auto",
    "pointerEvents": "auto",
    "position": "static",
    "quotes": "",
    "r": "0px",
    "resize": "none",
    "right": "auto",
    "rx": "auto",
    "ry": "auto",
    "scrollBehavior": "auto",
    "shapeImageThreshold": "0",
    "shapeMargin": "0px",
    "shapeOutside": "none",
    "shapeRendering": "auto",
    "size": "",
    "speak": "normal",
    "src": "",
    "stopColor": "rgb(0, 0, 0)",
    "stopOpacity": "1",
    "stroke": "none",
    "strokeDasharray": "none",
    "strokeDashoffset": "0px",
    "strokeLinecap": "butt",
    "strokeLinejoin": "miter",
    "strokeMiterlimit": "4",
    "strokeOpacity": "1",
    "strokeWidth": "1px",
    "tabSize": "8",
    "tableLayout": "auto",
    "textAlign": "start",
    "textAlignLast": "auto",
    "textAnchor": "start",
    "textCombineUpright": "none",
    "textDecoration": "none solid rgb(0, 0, 0)",
    "textDecorationColor": "rgb(0, 0, 0)",
    "textDecorationLine": "none",
    "textDecorationSkipInk": "auto",
    "textDecorationStyle": "solid",
    "textIndent": "0px",
    "textOrientation": "mixed",
    "textOverflow": "clip",
    "textRendering": "auto",
    "textShadow": "none",
    "textSizeAdjust": "auto",
    "textTransform": "none",
    "textUnderlinePosition": "auto",
    "top": "auto",
    "touchAction": "auto",
    "transform": "none",
    "transformBox": "view-box",
    "transformOrigin": "0px 0px",
    "transformStyle": "flat",
    "transition": "all 0s ease 0s",
    "transitionDelay": "0s",
    "transitionDuration": "0s",
    "transitionProperty": "all",
    "transitionTimingFunction": "ease",
    "unicodeBidi": "normal",
    "unicodeRange": "",
    "userSelect": "auto",
    "userZoom": "",
    "vectorEffect": "none",
    "verticalAlign": "baseline",
    "visibility": "visible",
    "webkitAppRegion": "no-drag",
    "webkitAppearance": "none",
    "webkitBorderAfter": "0px none rgb(0, 0, 0)",
    "webkitBorderAfterColor": "rgb(0, 0, 0)",
    "webkitBorderAfterStyle": "none",
    "webkitBorderAfterWidth": "0px",
    "webkitBorderBefore": "0px none rgb(0, 0, 0)",
    "webkitBorderBeforeColor": "rgb(0, 0, 0)",
    "webkitBorderBeforeStyle": "none",
    "webkitBorderBeforeWidth": "0px",
    "webkitBorderEnd": "0px none rgb(0, 0, 0)",
    "webkitBorderEndColor": "rgb(0, 0, 0)",
    "webkitBorderEndStyle": "none",
    "webkitBorderEndWidth": "0px",
    "webkitBorderHorizontalSpacing": "0px",
    "webkitBorderImage": "none",
    "webkitBorderStart": "0px none rgb(0, 0, 0)",
    "webkitBorderStartColor": "rgb(0, 0, 0)",
    "webkitBorderStartStyle": "none",
    "webkitBorderStartWidth": "0px",
    "webkitBorderVerticalSpacing": "0px",
    "webkitBoxAlign": "stretch",
    "webkitBoxDecorationBreak": "slice",
    "webkitBoxDirection": "normal",
    "webkitBoxFlex": "0",
    "webkitBoxFlexGroup": "1",
    "webkitBoxLines": "single",
    "webkitBoxOrdinalGroup": "1",
    "webkitBoxOrient": "horizontal",
    "webkitBoxPack": "start",
    "webkitBoxReflect": "none",
    "webkitColumnBreakAfter": "auto",
    "webkitColumnBreakBefore": "auto",
    "webkitColumnBreakInside": "auto",
    "webkitFontSizeDelta": "",
    "webkitFontSmoothing": "auto",
    "webkitHighlight": "none",
    "webkitHyphenateCharacter": "auto",
    "webkitLineBreak": "auto",
    "webkitLineClamp": "none",
    "webkitLocale": "auto",
    "webkitLogicalHeight": "0px",
    "webkitLogicalWidth": "0px",
    "webkitMarginAfter": "0px",
    "webkitMarginAfterCollapse": "collapse",
    "webkitMarginBefore": "0px",
    "webkitMarginBeforeCollapse": "collapse",
    "webkitMarginBottomCollapse": "collapse",
    "webkitMarginCollapse": "",
    "webkitMarginEnd": "0px",
    "webkitMarginStart": "0px",
    "webkitMarginTopCollapse": "collapse",
    "webkitMask": "",
    "webkitMaskBoxImage": "none",
    "webkitMaskBoxImageOutset": "0px",
    "webkitMaskBoxImageRepeat": "stretch",
    "webkitMaskBoxImageSlice": "0 fill",
    "webkitMaskBoxImageSource": "none",
    "webkitMaskBoxImageWidth": "auto",
    "webkitMaskClip": "border-box",
    "webkitMaskComposite": "source-over",
    "webkitMaskImage": "none",
    "webkitMaskOrigin": "border-box",
    "webkitMaskPosition": "0% 0%",
    "webkitMaskPositionX": "0%",
    "webkitMaskPositionY": "0%",
    "webkitMaskRepeat": "repeat",
    "webkitMaskRepeatX": "",
    "webkitMaskRepeatY": "",
    "webkitMaskSize": "auto",
    "webkitMaxLogicalHeight": "none",
    "webkitMaxLogicalWidth": "none",
    "webkitMinLogicalHeight": "0px",
    "webkitMinLogicalWidth": "0px",
    "webkitPaddingAfter": "0px",
    "webkitPaddingBefore": "0px",
    "webkitPaddingEnd": "0px",
    "webkitPaddingStart": "0px",
    "webkitPerspectiveOriginX": "",
    "webkitPerspectiveOriginY": "",
    "webkitPrintColorAdjust": "economy",
    "webkitRtlOrdering": "logical",
    "webkitRubyPosition": "before",
    "webkitTapHighlightColor": "rgba(0, 0, 0, 0.4)",
    "webkitTextCombine": "none",
    "webkitTextDecorationsInEffect": "none",
    "webkitTextEmphasis": "",
    "webkitTextEmphasisColor": "rgb(0, 0, 0)",
    "webkitTextEmphasisPosition": "over right",
    "webkitTextEmphasisStyle": "none",
    "webkitTextFillColor": "rgb(0, 0, 0)",
    "webkitTextOrientation": "vertical-right",
    "webkitTextSecurity": "none",
    "webkitTextStroke": "",
    "webkitTextStrokeColor": "rgb(0, 0, 0)",
    "webkitTextStrokeWidth": "0px",
    "webkitTransformOriginX": "",
    "webkitTransformOriginY": "",
    "webkitTransformOriginZ": "",
    "webkitUserDrag": "auto",
    "webkitUserModify": "read-only",
    "webkitWritingMode": "horizontal-tb",
    "whiteSpace": "normal",
    "widows": "2",
    "width": "0px",
    "willChange": "auto",
    "wordBreak": "normal",
    "wordSpacing": "0px",
    "wordWrap": "normal",
    "writingMode": "horizontal-tb",
    "x": "0px",
    "y": "0px",
    "zIndex": "auto",
    "zoom": "1"
};

/* harmony default export */ __webpack_exports__["default"] = (style);

/***/ }),

/***/ "./src/style/ImageComputedStyle.js":
/*!*****************************************!*\
  !*** ./src/style/ImageComputedStyle.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonComputedStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommonComputedStyle */ "./src/style/CommonComputedStyle.js");
/* eslint-disable */


function getImageComputedStyle(image) {
    var width = image.width;
    var height = image.height;
    var style = Object.assign(_CommonComputedStyle__WEBPACK_IMPORTED_MODULE_0__["default"], {
        "display": "inline",
        "position": "static",
        "inlineSize": width + "px",
        "perspectiveOrigin": width / 2 + "px " + height / 2 + "px",
        "transformOrigin": width / 2 + "px " + height / 2 + "px",
        "webkitLogicalWidth": width + "px",
        "webkitLogicalHeight": height + "px",
        "width": width + "px",
        "height": height + "px"
    });
    return style;
}

/* harmony default export */ __webpack_exports__["default"] = (getImageComputedStyle);

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* eslint-disable */
function noop() {}

/***/ }),

/***/ "./src/util/isDevtool.js":
/*!*******************************!*\
  !*** ./src/util/isDevtool.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* eslint-disable */
var isDevtool = false;
if (swan.getSystemInfoSync) {
    var _swan$getSystemInfoSy = swan.getSystemInfoSync(),
        platform = _swan$getSystemInfoSy.platform;

    isDevtool = platform === 'devtools';
} else {
    var descriptor = Object.getOwnPropertyDescriptor(global, 'window');
    // 开发者工具无法重定义 window
    isDevtool = !(!descriptor || descriptor.configurable === true);
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
    return isDevtool;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/util/mixin.js":
/*!***************************!*\
  !*** ./src/util/mixin.js ***!
  \***************************/
/*! exports provided: parentNode, style, clientRegion, offsetRegion, scrollRegion, classList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parentNode", function() { return parentNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientRegion", function() { return clientRegion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offsetRegion", function() { return offsetRegion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollRegion", function() { return scrollRegion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classList", function() { return classList; });
/* harmony import */ var _WindowProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../WindowProperties */ "./src/WindowProperties.js");
/* eslint-disable */


function parentNode(obj, level) {
    if (!('parentNode' in obj)) {
        var _parent = void 0;

        if (level === 0) {
            _parent = function _parent() {
                // return document
                return null;
            };
        } else if (level === 1) {
            _parent = function _parent() {
                return document.documentElement;
            };
        } else {
            _parent = function _parent() {
                return document.body;
            };
        }

        Object.defineProperty(obj, 'parentNode', {
            enumerable: true,
            get: _parent
        });
    }

    if (!('parentElement' in obj)) {
        var _parent2 = void 0;

        if (level === 0) {
            _parent2 = function _parent2() {
                return null;
            };
        } else if (level === 1) {
            _parent2 = function _parent2() {
                return document.documentElement;
            };
        } else {
            _parent2 = function _parent2() {
                return document.body;
            };
        }

        Object.defineProperty(obj, 'parentElement', {
            enumerable: true,
            get: _parent2
        });
    }
}

function style(obj) {
    obj.style = obj.style || {};

    Object.assign(obj.style, {
        top: '0px',
        left: '0px',
        width: _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerWidth"] + 'px',
        height: _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerHeight"] + 'px',
        margin: '0px',
        padding: '0px',
        removeProperty: function removeProperty() {},
        setProperty: function setProperty() {}
    });
}

function clientRegion(obj) {
    if (!('clientLeft' in obj)) {
        obj.clientLeft = 0;
        obj.clientTop = 0;
    }
    if (!('clientWidth' in obj)) {
        obj.clientWidth = _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerWidth"];
        obj.clientHeight = _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerHeight"];
    }

    if (!('getBoundingClientRect' in obj)) {
        obj.getBoundingClientRect = function () {
            var ret = {
                x: 0,
                y: 0,
                top: 0,
                left: 0,
                width: this.clientWidth,
                height: this.clientHeight
            };
            ret.right = ret.width;
            ret.bottom = ret.height;

            return ret;
        };
    }
}

function offsetRegion(obj) {
    if (!('offsetLeft' in obj)) {
        obj.offsetLeft = 0;
        obj.offsetTop = 0;
    }
    if (!('offsetWidth' in obj)) {
        obj.offsetWidth = _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerWidth"];
        obj.offsetHeight = _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerHeight"];
    }
}

function scrollRegion(obj) {
    if (!('scrollLeft' in obj)) {
        obj.scrollLeft = 0;
        obj.scrollTop = 0;
    }
    if (!('scrollWidth' in obj)) {
        obj.scrollWidth = _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerWidth"];
        obj.scrollHeight = _WindowProperties__WEBPACK_IMPORTED_MODULE_0__["innerHeight"];
    }
}

function classList(obj) {
    var noop = function noop() {};
    obj.classList = [];
    obj.classList.add = noop;
    obj.classList.remove = noop;
    obj.classList.contains = noop;
    obj.classList.toggle = noop;
}

/***/ }),

/***/ "./src/window.js":
/*!***********************!*\
  !*** ./src/window.js ***!
  \***********************/
/*! exports provided: navigator, XMLHttpRequest, WebSocket, Worker, Image, ImageBitmap, Audio, FileReader, HTMLElement, HTMLImageElement, HTMLCanvasElement, HTMLMediaElement, HTMLAudioElement, HTMLVideoElement, WebGLRenderingContext, TouchEvent, PointerEvent, MouseEvent, localStorage, location, btoa, atob, canvas, alert, focus, blur, getComputedStyle, scrollTo, scrollBy, setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame, cancelAnimationFrame, innerWidth, innerHeight, devicePixelRatio, screen, scrollX, scrollY, ontouchstart, ontouchmove, ontouchend, performance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alert", function() { return alert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focus", function() { return focus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blur", function() { return blur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComputedStyle", function() { return getComputedStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollTo", function() { return scrollTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollBy", function() { return scrollBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _setTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _clearTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _setInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _clearInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _requestAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _cancelAnimationFrame; });
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "./src/Canvas.js");
/* harmony import */ var _style_CommonComputedStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/CommonComputedStyle */ "./src/style/CommonComputedStyle.js");
/* harmony import */ var _style_ImageComputedStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/ImageComputedStyle */ "./src/style/ImageComputedStyle.js");
/* harmony import */ var _style_CanvasComputedStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/CanvasComputedStyle */ "./src/style/CanvasComputedStyle.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Event */ "./src/Event.js");
/* harmony import */ var _util_isDevtool__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isDevtool */ "./src/util/isDevtool.js");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navigator */ "./src/navigator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigator", function() { return _navigator__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _XMLHttpRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./XMLHttpRequest */ "./src/XMLHttpRequest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XMLHttpRequest", function() { return _XMLHttpRequest__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _WebSocket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./WebSocket */ "./src/WebSocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebSocket", function() { return _WebSocket__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _Worker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Worker */ "./src/Worker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Worker", function() { return _Worker__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Image */ "./src/Image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _Image__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _ImageBitmap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ImageBitmap */ "./src/ImageBitmap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageBitmap", function() { return _ImageBitmap__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _Audio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Audio */ "./src/Audio.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Audio", function() { return _Audio__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _FileReader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FileReader */ "./src/FileReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileReader", function() { return _FileReader__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./HTMLElement */ "./src/HTMLElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLElement", function() { return _HTMLElement__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _HTMLImageElement__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./HTMLImageElement */ "./src/HTMLImageElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLImageElement", function() { return _HTMLImageElement__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _HTMLCanvasElement__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./HTMLCanvasElement */ "./src/HTMLCanvasElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLCanvasElement", function() { return _HTMLCanvasElement__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _HTMLMediaElement__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./HTMLMediaElement */ "./src/HTMLMediaElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLMediaElement", function() { return _HTMLMediaElement__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _HTMLAudioElement__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./HTMLAudioElement */ "./src/HTMLAudioElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLAudioElement", function() { return _HTMLAudioElement__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./HTMLVideoElement */ "./src/HTMLVideoElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLVideoElement", function() { return _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _WebGLRenderingContext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./WebGLRenderingContext */ "./src/WebGLRenderingContext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLRenderingContext", function() { return _WebGLRenderingContext__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _EventIniter_index_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./EventIniter/index.js */ "./src/EventIniter/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TouchEvent", function() { return _EventIniter_index_js__WEBPACK_IMPORTED_MODULE_21__["TouchEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PointerEvent", function() { return _EventIniter_index_js__WEBPACK_IMPORTED_MODULE_21__["PointerEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MouseEvent", function() { return _EventIniter_index_js__WEBPACK_IMPORTED_MODULE_21__["MouseEvent"]; });

/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "localStorage", function() { return _localStorage__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./location */ "./src/location.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "location", function() { return _location__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _Base64_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Base64.js */ "./src/Base64.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "btoa", function() { return _Base64_js__WEBPACK_IMPORTED_MODULE_24__["btoa"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "atob", function() { return _Base64_js__WEBPACK_IMPORTED_MODULE_24__["atob"]; });

/* harmony import */ var _WindowProperties__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./WindowProperties */ "./src/WindowProperties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "innerWidth", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["innerWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "innerHeight", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["innerHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "devicePixelRatio", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["devicePixelRatio"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "screen", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["screen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollX", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["scrollX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollY", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["scrollY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ontouchstart", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["ontouchstart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ontouchmove", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["ontouchmove"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ontouchend", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["ontouchend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "performance", function() { return _WindowProperties__WEBPACK_IMPORTED_MODULE_25__["performance"]; });

/* eslint-disable */





























// 暴露全局的 canvas
GameGlobal.screencanvas = GameGlobal.screencanvas || new _Canvas__WEBPACK_IMPORTED_MODULE_0__["default"]();
var canvas = GameGlobal.screencanvas;

function getComputedStyle(dom) {
    var tagName = dom.tagName;

    if (tagName === "CANVAS") {
        return Object(_style_CanvasComputedStyle__WEBPACK_IMPORTED_MODULE_3__["default"])(dom);
    } else if (tagName === "IMG") {
        return Object(_style_ImageComputedStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(dom);
    }

    return _style_CommonComputedStyle__WEBPACK_IMPORTED_MODULE_1__["default"];
}

function scrollTo(x, y) {
    // x = Math.min(window.innerWidth, Math.max(0, x));
    // y = Math.min(window.innerHeight, Math.max(0, y));
    // We can't scroll the page of WeChatTinyGame, so it'll always be 0.

    // window.scrollX = 0;
    // window.scrollY = 0;
}

function scrollBy(dx, dy) {
    window.scrollTo(window.scrollX + dx, window.scrollY + dy);
}

function alert(msg) {
    console.log(msg);
}

function focus() {}

function blur() {}

if (Object(_util_isDevtool__WEBPACK_IMPORTED_MODULE_5__["default"])() && swan.getPerformance) {
    var wxPerf = swan.getPerformance();
    var consoleTimers = {};
    console.time = function (name) {
        consoleTimers[name] = wxPerf.now();
    };

    console.timeEnd = function (name) {
        var timeStart = consoleTimers[name];
        if (!timeStart) {
            return;
        }

        var timeElapsed = wxPerf.now() - timeStart;
        console.log(name + ": " + timeElapsed / 1000 + "ms");
        delete consoleTimers[name];
    };
}

function eventHandlerFactory() {
    return function (res) {
        var event = new _Event__WEBPACK_IMPORTED_MODULE_4__["default"]('resize');

        event.target = window;
        event.timeStamp = Date.now();
        event.res = res;
        event.windowWidth = res.windowWidth;
        event.windowHeight = res.windowHeight;
        document.dispatchEvent(event);
    };
}
// TODO
// swan.onWindowResize(eventHandlerFactory())

var _setTimeout = setTimeout;
var _clearTimeout = clearTimeout;
var _setInterval = setInterval;
var _clearInterval = clearInterval;
var _requestAnimationFrame = requestAnimationFrame;
var _cancelAnimationFrame = cancelAnimationFrame;



/***/ })

/******/ });