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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 宫坐标系工具集
 * @type {{getBoxCells(*, *): *, convertToBoxIndex(*, *): *, convertFromBoxIndex(*, *): *}}
 */
var boxToolkit = {
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            // console.log(rowIndex, colIndex);
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
/**
 * 矩阵工具集
 * @type {{makeRow(*=): *, makeMatrix(*=): *, shuffle(*): *}}
 */

var MatrixToolkit = function () {
    function MatrixToolkit() {
        _classCallCheck(this, MatrixToolkit);
    }

    _createClass(MatrixToolkit, null, [{
        key: "makeRow",
        value: function makeRow() {
            var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var array = new Array(9);
            array.fill(v);
            return array;
        }
    }, {
        key: "makeMatrix",
        value: function makeMatrix() {
            var _this = this;

            var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            //使用映射来制造各不相同的 Array , 第二个参数代表了 map() 函数的参数(简写)
            return Array.from({ length: 9 }, function () {
                return _this.makeRow(v);
            });
        }
        /**
         * Fisher-Yates 洗牌算法
         * @param array 需要进行洗牌的数据
         */

    }, {
        key: "shuffle",
        value: function shuffle(array) {
            var len = array.length; //数组的长度
            var endIndex = len - 2; //因为最后一个元素不需要交换,省略1位,故不是 len - 1
            for (var i = 0; i <= endIndex; i++) {
                var j = i + Math.floor(Math.random() * (len - i));
                var _ref = [array[j], array[i]];
                array[i] = _ref[0];
                array[j] = _ref[1];
            }
            return array;
        }
        /**
         * 检查制定位置是否可以填写数字 n
         * @param martix
         * @param n
         * @param rowIndex
         * @param colIndex
         * @returns {boolean}
         */

    }, {
        key: "checkFillable",
        value: function checkFillable(martix, n, rowIndex, colIndex) {
            var row = martix[rowIndex];
            var column = this.makeRow().map(function (v, i) {
                return martix[i][colIndex];
            });

            var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
                boxIndex = _boxToolkit$convertTo.boxIndex;

            var box = boxToolkit.getBoxCells(martix, boxIndex);
            for (var i = 0; i < 9; i++) {
                if (row[i] === n || column[i] === n || box[i] === n) {
                    return false;
                }
            }
            return true;
        }
    }]);

    return MatrixToolkit;
}();
//工具集


var Toolkit = exports.Toolkit = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        //矩阵与数组相关的工具
        get: function get() {
            return MatrixToolkit;
        }
        //宫坐标系相关的工具

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

exports.default = Toolkit;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(2);

var _grid2 = _interopRequireDefault(_grid);

var _popupNumbers = __webpack_require__(6);

var _popupNumbers2 = _interopRequireDefault(_popupNumbers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grid = new _grid2.default($("#container"), $("#levelSel")); //创建实例
grid.build(); //开始构建
grid.layout(); //调整高度
var popupNumbers = new _popupNumbers2.default($("#popupNumbers"));
grid.bindPopup(popupNumbers); //绑定操作
//底部按键
$("#check").on("click", function (e) {
    if (grid.check()) {
        alert("ok");
    }
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Grid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //生成九宫格


var _sudoku = __webpack_require__(3);

var _sudoku2 = _interopRequireDefault(_sudoku);

var _checker = __webpack_require__(5);

var _checker2 = _interopRequireDefault(_checker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = exports.Grid = function () {
    function Grid(container, levelSel) {
        _classCallCheck(this, Grid);

        this._$container = container;
        this._$levelSel = levelSel;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var suduku = new _sudoku2.default();
            suduku.make(this._$levelSel.val());
            // const matrix = suduku.solutionMatrix;
            var matrix = suduku.puzzleMatrix;
            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_ g_left", "col_g_center", "col_g_right"];
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
                });
            });
            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div class='row'>").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });
            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width(); //取得小方块的宽度
            //适配不同的屏幕产生的小方块宽度，让它的高度与其宽度相等
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? "" + width / 2 : ""
            });
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                if ($cell.is(".fixed")) {
                    return;
                }
                popupNumbers.popup($cell);
            });
        }
        /**
         * 检查用户解密的结果，如果成功则提示，如果失败则进行标记
         */

    }, {
        key: "check",
        value: function check() {
            //  从界面获取需要检查的数据
            var data = this._$container.children().toArray().map(function (div) {
                return $(div).children().toArray().map(function (span) {
                    return parseInt($(span).text(), 10) || 0;
                });
            });
            var checker = new _checker2.default(data);
            if (checker.check()) {
                return true;
            }
            //检查不成功，进行标记
            var marks = checker.matrixMarks;
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span); //缓存
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
                        $span.addClass("error");
                    }
                });
            });
        }
        /**
         * 清理错误标记
         */

    }, {
        key: "clear",
        value: function clear() {
            this._$container.find("span.error").removeClass("error");
        }
        /**
         * 重置当前迷盘到初始状态
         */

    }, {
        key: "reset",
        value: function reset() {
            this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
        }
        /**
         * 重建新的迷盘，开始新的一局游戏
         */

    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sudoku = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //生成数独游戏


var _generator = __webpack_require__(4);

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sudoku = exports.Sudoku = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        //生成完成的解决方案
        var gen = new _generator2.default();
        gen.generate();
        this.solutionMatrix = gen.matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            // const shouldRid = Math.random() * 9 < level;
            //生成迷盘
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

exports.default = Sudoku;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Generator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //生成数独解决方案


var _toolkit = __webpack_require__(0);

var _toolkit2 = _interopRequireDefault(_toolkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = exports.Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalGenerate()) {
                // console.log('try again');
            }
        }
    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            this.matrix = _toolkit2.default.matrix.makeMatrix();
            this.orders = _toolkit2.default.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return _toolkit2.default.matrix.shuffle(row);
            });
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) return false;
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
        //递归函数

    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            //填充结束
            if (rowIndex > 8) {
                return true;
            }
            var row = this.matrix[rowIndex]; //行数据
            var orders = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                //如果这个位置已经有值，跳过
                if (row[colIndex]) {
                    continue;
                }
                //检查这个是否可以填 n
                if (!_toolkit2.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n; //填写
                //去下一行填写 n ，如果没填进去，就继续寻找当前行下一个
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                return true;
            }
            return false;
        }
    }]);

    return Generator;
}();

exports.default = Generator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //检查数独解决方案


var _toolkit = __webpack_require__(0);

var _toolkit2 = _interopRequireDefault(_toolkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function checkArray(array) {
    var len = array.length;
    var marks = new Array(len); //标记数组
    marks.fill(true); //初始化都为 true
    for (var i = 0; i < len - 1; i++) {
        //小优化，检查之前先检查 marks 的值，如果已经是 false 了，那么就不必再重复验证一次了
        if (!marks[i]) {
            continue;
        }
        var v = array[i];
        //是否有效，0为无效，1-9有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        //是否有重复
        for (var j = i + 1; j < len; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}
//输入：matrix，用户完成的数独数据，9 x 9
//处理：对 matrix 行，列，宫进行检查，并填写 marks
//输出：检查是否成功，marks 为二维数组，与 matrix 的值一一对应

var Checker = exports.Checker = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._success = false;
        this._matrix = matrix;
        this._matrixMarks = _toolkit2.default.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();
            //检查是否成功
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);
                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }
                var marks = checkArray(cols);
                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = _toolkit2.default.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _Toolkit$box$convertF = _toolkit2.default.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _Toolkit$box$convertF.rowIndex,
                            colIndex = _Toolkit$box$convertF.colIndex;

                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

exports.default = Checker;
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
//
// console.log(matrix);
// const checker = new Checker(matrix);
// console.log(checker.check());
// console.log(checker.matrixMarks);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//处理弹出的操作面板
var PopupNumbers = exports.PopupNumbers = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                //取消数字和mark
                $cell.text(0).addClass("empty");
            } else {
                //回填数字
                $cell.removeClass("empty").text($span.text());
            }
            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

exports.default = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map