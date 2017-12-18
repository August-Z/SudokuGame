//生成数独解决方案
const Toolkit = require("./toolkit.js");

class Generator {

    generate() {
        while (!this.internalGenerate()) {
            // TODO
            // console.log('try again');
        }
    }

    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));
        
        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) return false;
        }
        return true;
    }

    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    //递归函数
    fillRow(n, rowIndex) {

        //填充结束
        if (rowIndex > 8) {
            return true;
        }

        const row = this.matrix[rowIndex];//行数据
        const orders = this.orders[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];

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

    }
}

console.time('core');
const generator = new Generator();
generator.generate();
console.log(generator.matrix);
console.timeEnd('core');

module.exports = Generator;