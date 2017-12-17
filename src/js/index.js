const Grid = require("./ui/grid.js");

const grid = new Grid($("#container")); //创建实例

grid.build();   //开始构建
grid.layout();  //调整高度