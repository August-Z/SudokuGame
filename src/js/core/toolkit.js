/**
 * 矩阵工具集
 * @type {{makeRow(*=): *, makeMatrix(*=): *, shuffle(*): *}}
 */
const matrixToolkit = {

    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        //使用映射来制造各不相同的 Array , 第二个参数代表了 map() 函数的参数(简写)
        return Array.from({length: 9}, () => this.makeRow(v));
    },

    /**
     * Fisher-Yates 洗牌算法
     * @param array 需要进行洗牌的数据
     */
    shuffle(array) {
        const len = array.length; //数组的长度
        const endIndex = len - 2; //因为最后一个元素不需要交换,省略1位,故不是 len - 1
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (len - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /**
     * 检查制定位置是否可以填写数字 n
     * @param martix
     * @param n
     * @param rowIndex
     * @param colIndex
     * @returns {boolean}
     */
    checkFillable(martix, n, rowIndex, colIndex) {
        const row = martix[rowIndex];
        const column = this.makeRow().map((v, i) => martix[i][colIndex]);
        // const boxIndex =


        // const box = ....


        return true;
    }
};

/**
 *  宫坐标系工具集
 */
const boxToolkit = {
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },

    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};

//工具集

module.exports = class toolkit {

    //矩阵与数组相关的工具
    static get matrix() {
        return matrixToolkit;
    }

    //宫坐标系相关的工具
    static get box() {
        return boxToolkit;
    }

};