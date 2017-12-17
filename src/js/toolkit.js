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
    }
};

module.exports = matrixToolkit;