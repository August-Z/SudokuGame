"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//生成数独游戏
const generator_1 = require("./generator");
class Sudoku {
    constructor() {
        //生成完成的解决方案
        const gen = new generator_1.default();
        gen.generate();
        this.solutionMatrix = gen.matrix;
    }
    make(level = 5) {
        // const shouldRid = Math.random() * 9 < level;
        //生成迷盘
        this.puzzleMatrix = this.solutionMatrix.map((row) => {
            return row.map((cell) => Math.random() * 9 < level ? 0 : cell);
        });
    }
}
exports.Sudoku = Sudoku;
exports.default = Sudoku;
