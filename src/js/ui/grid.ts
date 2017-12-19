//生成九宫格
import Sudoku from "../core/sudoku";
import Check from "../core/checker";
import PopupNumbers from "./popupNumbers";

export class Grid {

    private _$container: JQuery;
    private _$levelSel: JQuery;

    constructor(container: JQuery, levelSel: JQuery) {
        this._$container = container;
        this._$levelSel = levelSel;
    }

    build() {

        const suduku = new Sudoku();
        suduku.make(<number>this._$levelSel.val());
        // const matrix = suduku.solutionMatrix;
        const matrix = suduku.puzzleMatrix;

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_ g_left", "col_g_center", "col_g_right"];

        const $cells = matrix.map((rowValues: any) => rowValues
            .map((cellValue: any, colIndex: any) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : "empty")
                    .text(cellValue);
            }));

        const $divArray = $cells.map(($spanArray: any, rowIndex: any) => {
            return $("<div class='row'>")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);

    }

    layout() {
        const width: any = $("span:first", this._$container).width(); //取得小方块的宽度
        //适配不同的屏幕产生的小方块宽度，让它的高度与其宽度相等
        $("span", this._$container).height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}` : ""
            });
    }

    bindPopup(popupNumbers: PopupNumbers) {
        this._$container.on("click", "span", (e: any) => {
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
            .toArray()
            .map((div: HTMLElement): number[] => {
                return $(div).children()
                    .toArray()
                    .map(span => parseInt($(span).text(), 10) || 0);
            });

        const checker = new Check(data);
        if (checker.check()) {
            return true;
        }

        //检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex: any, div: any) => {
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

export default Grid;


