"use strict";
/**
 * 矩阵工具集
 * @type {{makeRow(*=): *, makeMatrix(*=): *, shuffle(*): *}}
 */
var matrixToolkit = {
    makeRow: function (v) {
        if (v === void 0) { v = 0; }
        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix: function (v) {
        var _this = this;
        if (v === void 0) { v = 0; }
        //使用映射来制造各不相同的 Array , 第二个参数代表了 map() 函数的参数(简写)
        return Array.from({ length: 9 }, function () { return _this.makeRow(v); });
    },
    /**
     * Fisher-Yates 洗牌算法
     * @param array 需要进行洗牌的数据
     */
    shuffle: function (array) {
        var len = array.length; //数组的长度
        var endIndex = len - 2; //因为最后一个元素不需要交换,省略1位,故不是 len - 1
        for (var i = 0; i <= endIndex; i++) {
            var j = i + Math.floor(Math.random() * (len - i));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        return array;
        var _a;
    },
    /**
     * 检查制定位置是否可以填写数字 n
     * @param martix
     * @param n
     * @param rowIndex
     * @param colIndex
     * @returns {boolean}
     */
    checkFillable: function (martix, n, rowIndex, colIndex) {
        var row = martix[rowIndex];
        var column = this.makeRow().map(function (v, i) { return martix[i][colIndex]; });
        var boxIndex = boxToolkit.convertToBoxIndex(rowIndex, colIndex).boxIndex;
        var box = boxToolkit.getBoxCells(martix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n
                || column[i] === n
                || box[i] === n)
                return false;
        }
        return true;
    }
};
/**
 * 宫坐标系工具集
 * @type {{getBoxCells(*, *): *, convertToBoxIndex(*, *): *, convertFromBoxIndex(*, *): *}}
 */
var boxToolkit = {
    getBoxCells: function (matrix, boxIndex) {
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
    convertToBoxIndex: function (rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function (boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
//工具集
module.exports = /** @class */ (function () {
    function toolkit() {
    }
    Object.defineProperty(toolkit, "matrix", {
        //矩阵与数组相关的工具
        get: function () {
            return matrixToolkit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(toolkit, "box", {
        //宫坐标系相关的工具
        get: function () {
            return boxToolkit;
        },
        enumerable: true,
        configurable: true
    });
    return toolkit;
}());
