"use strict";
//检查数独解决方案
var Toolkit = require("./toolkit.js");
var Generator = require("./generator.js");
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
var Checker = /** @class */ (function () {
    function Checker(matrix) {
        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }
    Object.defineProperty(Checker.prototype, "matrixMarks", {
        get: function () {
            return this._matrixMarks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checker.prototype, "isSuccess", {
        get: function () {
            return this._success;
        },
        enumerable: true,
        configurable: true
    });
    Checker.prototype.check = function () {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        //检查是否成功
        this._success = this._matrixMarks.every(function (row) { return row.every(function (mark) { return mark; }); });
        return this._success;
    };
    Checker.prototype.checkRows = function () {
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
            var row = this._matrix[rowIndex];
            var marks = checkArray(row);
            for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    };
    Checker.prototype.checkCols = function () {
        for (var colIndex = 0; colIndex < 9; colIndex++) {
            var cols = [];
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            var marks = checkArray(cols);
            for (var rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    };
    Checker.prototype.checkBoxes = function () {
        for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
            var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
            var marks = checkArray(boxes);
            for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    var _a = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex), rowIndex = _a.rowIndex, colIndex = _a.colIndex;
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    };
    return Checker;
}());
module.exports = Checker;
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
//
// console.log(matrix);
// const checker = new Checker(matrix);
// console.log(checker.check());
// console.log(checker.matrixMarks);
