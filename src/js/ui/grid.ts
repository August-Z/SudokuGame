//生成九宫格
const Toolkit = require("../core/toolkit.js");
const Sudoku = require("../core/sudoku.js");
const Check = require("../core/checker.js");

class Grid {

    constructor(container, levelSel) {
        this._$container = container;
        this._$levelSel = levelSel;
    }

    build() {

        const suduku = new Sudoku();
        suduku.make(this._$levelSel.val());
        // const matrix = suduku.solutionMatrix;
        const matrix = suduku.puzzleMatrix;

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_ g_left", "col_g_center", "col_g_right"];

        const $cells = matrix.map(rowValues => rowValues
            .map((cellValue, colIndex) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : "empty")
                    .text(cellValue);
            }));

        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div class='row'>")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);

    }

    layout() {
        const width = $("span:first", this._$container).width(); //取得小方块的宽度
        //适配不同的屏幕产生的小方块宽度，让它的高度与其宽度相等
        $("span", this._$container).height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}` : ""
            });
    }

    bindPopup(popupNumbers) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) {
                return;
            }
            popupNumbers.popup($cell);
        })
    }

    /**
     * 检查用户解密的结果，如果成功则提示，如果失败则进行标记
     */
    check() {
        //  从界面获取需要检查的数据
        const data = this._$container.children()
            .map((rowIndex, div) => {
                return $(div).children()
                    .map((colIndex, span) => parseInt($(span).text()) || 0);
            })
            .toArray()
            .map($data => $data.toArray());
        //此时的 data 为二维数字，一维是 div ，二维是具体的 span 的值数组

        const checker = new Check(data);
        if (checker.check()) {
            return true;
        }

        //检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex, div) => {
                $(div).children().each((colIndex, span) => {
                    const $span = $(span);  //缓存
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
    clear() {
        this._$container.find("span.error")
            .removeClass("error");
    }

    /**
     * 重置当前迷盘到初始状态
     */
    reset() {
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    }

    /**
     * 重建新的迷盘，开始新的一局游戏
     */
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }
}

module.exports = Grid;


