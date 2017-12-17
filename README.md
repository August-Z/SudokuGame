# SudokuGame
数独游戏，通过 JavaScript 技术实现向 TypeScript 技术实现的转换。使用的工具有 Gulp、Webpack、 Babel 和 TSC(TypeScript Compiler) 等

##界面及操作
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

    function makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    }
    
    function makeMatrix(v = 0) {
        //使用映射来制造各不相同的 Array , 第二个参数代表了 map() 函数的参数(简写)
        return Array.from({length: 9}, () => makeRow(v));
    }
    
    const a = makeMatrix();
    
## 游戏算法
其实数独游戏不可避免的会用到递归，采用一个简单的算法，从数字1开始，失败重算，随机位置，采用 Fisher-Yates 洗牌算法：遍历数组，指针所指元素随机与它之后的元素进行值的交换。

####检查算法 - 按行 / 按列 / 按宫 - array as result
*   抽取行数据，So easy
*   抽取列数据，多转一个弯
*   **抽取宫数据，寻找关系**