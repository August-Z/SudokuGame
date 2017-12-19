"use strict";
//生成数独解决方案
var Toolkit = require("./toolkit.js");
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.generate = function () {
        while (!this.internalGenerate()) {
            // console.log('try again');
        }
    };
    Generator.prototype.internalGenerate = function () {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(function (row) { return row.map(function (v, i) { return i; }); })
            .map(function (row) { return Toolkit.matrix.shuffle(row); });
        for (var n = 1; n <= 9; n++) {
            if (!this.fillNumber(n))
                return false;
        }
        return true;
    };
    Generator.prototype.fillNumber = function (n) {
        return this.fillRow(n, 0);
    };
    //递归函数
    Generator.prototype.fillRow = function (n, rowIndex) {
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
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
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
    };
    return Generator;
}());
module.exports = Generator;
