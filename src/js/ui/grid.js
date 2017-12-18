//生成九宫格
const Toolkit = require("../core/toolkit.js");
const Sudoku = require("../core/sudoku.js");

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        // const gen = new Generator();
        // gen.generate();
        // const matrix = gen.matrix;

        const suduku = new Sudoku();
        suduku.make();
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
            popupNumbers.popup($cell);
        })
    }

    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }
}

module.exports = Grid;


