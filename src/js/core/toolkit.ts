export interface IBoxCoord {
    boxIndex: number,
    cellIndex: number
}

export interface IRowColCoord {
    rowIndex: number,
    colIndex: number
}

/**
 * 宫坐标系工具集
 * @type {{getBoxCells(matrix: number[][], boxIndex: number): number[]; convertToBoxIndex(rowIndex: number, colIndex: number): IBoxCoord; convertFromBoxIndex(boxIndex: number, cellIndex: number): IRowColCoord}}
 */
const boxToolkit = {

    getBoxCells(matrix: number[][], boxIndex: number): number[] {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            // console.log(rowIndex, colIndex);
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },

    convertToBoxIndex(rowIndex: number, colIndex: number): IBoxCoord {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },

    convertFromBoxIndex(boxIndex: number, cellIndex: number): IRowColCoord {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};

/**
 * 矩阵工具集
 * @type {{makeRow(*=): *, makeMatrix(*=): *, shuffle(*): *}}
 */
class MatrixToolkit {

    static makeRow(): number[];
    static makeRow<T>(v: T): T[];
    static makeRow(v: any = 0): any[] {
        const array = new Array(9);
        array.fill(v);
        return array;
    }

    static makeMatrix(): number[][];
    static makeMatrix<T>(v: T): T[][];
    static makeMatrix(v: any = 0) :any[][]{
        //使用映射来制造各不相同的 Array , 第二个参数代表了 map() 函数的参数(简写)
        return Array.from({length: 9}, () => this.makeRow(v));
    }


    /**
     * Fisher-Yates 洗牌算法
     * @param array 需要进行洗牌的数据
     */
    static shuffle<T>(array: T[]): T[] {
        const len = array.length; //数组的长度
        const endIndex = len - 2; //因为最后一个元素不需要交换,省略1位,故不是 len - 1
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (len - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    /**
     * 检查制定位置是否可以填写数字 n
     * @param martix
     * @param n
     * @param rowIndex
     * @param colIndex
     * @returns {boolean}
     */
    static checkFillable(martix: number[][], n: number,
                         rowIndex: number, colIndex: number): boolean {
        const row = martix[rowIndex];
        const column = this.makeRow().map((v, i) => martix[i][colIndex]);
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(martix, boxIndex);

        for (let i = 0; i < 9; i++) {
            if (row[i] === n
                || column[i] === n
                || box[i] === n) {
                return false;
            }
        }
        return true;
    }
}

//工具集
export class Toolkit {

    //矩阵与数组相关的工具
    static get matrix():typeof MatrixToolkit{
        return MatrixToolkit;
    }

    //宫坐标系相关的工具
    static get box() {
        return boxToolkit;
    }

}


export default Toolkit;



