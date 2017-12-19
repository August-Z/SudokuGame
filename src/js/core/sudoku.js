"use strict";
//生成数独游戏
var Generator = require("./generator.js");
var Sudoku = /** @class */ (function () {
    function Sudoku() {
        //生成完成的解决方案
        var gen = new Generator();
        gen.generate();
        this.solutionMatrix = gen.matrix;
    }
    Sudoku.prototype.make = function (level) {
        if (level === void 0) { level = 5; }
        // const shouldRid = Math.random() * 9 < level;
        //生成迷盘
        this.puzzleMatrix = this.solutionMatrix.map(function (row) {
            return row.map(function (cell) { return Math.random() * 9 < level ? 0 : cell; });
        });
    };
    return Sudoku;
}());
module.exports = Sudoku;
