"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//检查数独解决方案
const toolkit_1 = require("./toolkit");
function checkArray(array) {
    const len = array.length;
    const marks = new Array(len); //标记数组
    marks.fill(true); //初始化都为 true
    for (let i = 0; i < len - 1; i++) {
        //小优化，检查之前先检查 marks 的值，如果已经是 false 了，那么就不必再重复验证一次了
        if (!marks[i]) {
            continue;
        }
        const v = array[i];
        //是否有效，0为无效，1-9有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        //是否有重复
        for (let j = i + 1; j < len; j++) {
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
class Checker {
    constructor(matrix) {
        this._success = false;
        this._matrix = matrix;
        this._matrixMarks = toolkit_1.default.matrix.makeMatrix(true);
    }
    get matrixMarks() {
        return this._matrixMarks;
    }
    get isSuccess() {
        return this._success;
    }
    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        //检查是否成功
        this._success = this._matrixMarks.every((row) => row.every((mark) => mark));
        return this._success;
    }
    checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);
            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            const marks = checkArray(cols);
            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = toolkit_1.default.box.getBoxCells(this._matrix, boxIndex);
            const marks = checkArray(boxes);
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const { rowIndex, colIndex } = toolkit_1.default.box.convertFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}
exports.Checker = Checker;
exports.default = Checker;
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
//
// console.log(matrix);
// const checker = new Checker(matrix);
// console.log(checker.check());
// console.log(checker.matrixMarks);
