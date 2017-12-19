"use strict";
//生成九宫格
var Toolkit = require("../core/toolkit.js");
var Sudoku = require("../core/sudoku.js");
var Check = require("../core/checker.js");
var Grid = /** @class */ (function () {
    function Grid(container, levelSel) {
        this._$container = container;
        this._$levelSel = levelSel;
    }
    Grid.prototype.build = function () {
        var suduku = new Sudoku();
        suduku.make(this._$levelSel.val());
        // const matrix = suduku.solutionMatrix;
        var matrix = suduku.puzzleMatrix;
        var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        var colGroupClasses = ["col_ g_left", "col_g_center", "col_g_right"];
        var $cells = matrix.map(function (rowValues) { return rowValues
            .map(function (cellValue, colIndex) {
            return $("<span>")
                .addClass(colGroupClasses[colIndex % 3])
                .addClass(cellValue ? "fixed" : "empty")
                .text(cellValue);
        }); });
        var $divArray = $cells.map(function ($spanArray, rowIndex) {
            return $("<div class='row'>")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });
        this._$container.append($divArray);
    };
    Grid.prototype.layout = function () {
        var width = $("span:first", this._$container).width(); //取得小方块的宽度
        //适配不同的屏幕产生的小方块宽度，让它的高度与其宽度相等
        $("span", this._$container).height(width)
            .css({
            "line-height": width + "px",
            "font-size": width < 32 ? "" + width / 2 : ""
        });
    };
    Grid.prototype.bindPopup = function (popupNumbers) {
        this._$container.on("click", "span", function (e) {
            var $cell = $(e.target);
            if ($cell.is(".fixed")) {
                return;
            }
            popupNumbers.popup($cell);
        });
    };
    /**
     * 检查用户解密的结果，如果成功则提示，如果失败则进行标记
     */
    Grid.prototype.check = function () {
        //  从界面获取需要检查的数据
        var data = this._$container.children()
            .map(function (rowIndex, div) {
            return $(div).children()
                .map(function (colIndex, span) { return parseInt($(span).text()) || 0; });
        })
            .toArray()
            .map(function ($data) { return $data.toArray(); });
        //此时的 data 为二维数字，一维是 div ，二维是具体的 span 的值数组
        var checker = new Check(data);
        if (checker.check()) {
            return true;
        }
        //检查不成功，进行标记
        var marks = checker.matrixMarks;
        this._$container.children()
            .each(function (rowIndex, div) {
            $(div).children().each(function (colIndex, span) {
                var $span = $(span); //缓存
                if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                    $span.removeClass("error");
                }
                else {
                    $span.addClass("error");
                }
            });
        });
    };
    /**
     * 清理错误标记
     */
    Grid.prototype.clear = function () {
        this._$container.find("span.error")
            .removeClass("error");
    };
    /**
     * 重置当前迷盘到初始状态
     */
    Grid.prototype.reset = function () {
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    };
    /**
     * 重建新的迷盘，开始新的一局游戏
     */
    Grid.prototype.rebuild = function () {
        this._$container.empty();
        this.build();
        this.layout();
    };
    return Grid;
}());
module.exports = Grid;
