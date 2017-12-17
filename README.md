# SudokuGame
数独游戏，通过 JavaScript 技术实现向 TypeScript 技术实现的转换。使用的工具有 Gulp、Webpack、 Babel 和 TSC(TypeScript Compiler) 等

## 界面及操作

*   弹出数字面板
1.  点击数字直接选用该数字填写当前格
2.  点击底部中央空白：清除当前格的数字
3.  点击底部左右色块，标记当前格具有的特殊意义

*   功能按钮
1.  检查：检查是否成功完成本局游戏，标记出错的小格  
2.  重置：重置到本局起始状态
3.  清理：清除错误标记
4.  重建：放弃当前局，新开一局

## 数据结构

数据结构由数组进行表示：
    
    aRow = matrix[i];
    aCell = aRow[j];
    // 1 - 9 代表实际的数， 0 - 空白（因为0有 false 的意义）
    
用2个带有 es6 新特性的函数来制造我们的数据吧：

    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    
    makeMatrix(v = 0) {
        //使用映射来制造各不相同的 Array , 第二个参数代表了 map() 函数的参数(简写)
        return Array.from({length: 9}, () => this.makeRow(v));
    }
    
## 游戏算法

其实数独游戏不可避免的会用到递归，采用一个简单的算法，从数字1开始，失败重算，随机位置，采用 Fisher-Yates 洗牌算法：遍历数组，指针所指元素随机与它之后的元素进行值的交换。

    /**
    * Fisher-Yates 洗牌算法
    * @param array 需要进行洗牌的数据
    */
    shuffle(array) {
        const len = array.length; //数组的长度
        const endIndex = len - 2; //因为最后一个元素不需要交换,省略1位,故不是 len - 1
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (len - i));
            [array[i], array[j]] = [array[j], array[i]]; //解构赋值
        }
        return array;
    }


#### 检查算法 

按行 / 按列 / 按宫 - array as result

*   抽取行数据，So easy
*   抽取列数据，多转一个弯
*   **抽取宫数据，寻找关系**

其中最复杂的检查过程，就是抽取每个宫的数据，这里举例**第六宫**：

    n = 5;//序号从0开始，这里代表第六宫
    
    //坐标
    bX = n % 3 = 2;
    bY = n / 3 = 1;
    
    //起始格坐标
    x0 = bx * 3 = 6;
    y0 = by * 3 = 3;
    
    //宫内小格坐标,序号 i
    x = x0 + i % 3;
    y = y0 + i / 3;
    
    //这样,我们就能获得到每一宫的每一格的坐标
    array = [1,2,3,4,5,6,7,8,9]; //假设这是符合的数组
    array.join(""); //如果它和 "123456789" 全等,则游戏判断就是 true
   
当然，如果我们 join 出来的结果是包含 "0" 或者有重复数字的(例"123406789","1233567889")，则为 false。
    
    