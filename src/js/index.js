const Grid = require("./ui/grid.js");
const PopupNumbers = require("./ui/popupNumbers.js");

const grid = new Grid($("#container")); //创建实例
grid.build();   //开始构建
grid.layout();  //调整高度

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);   //绑定操作

$("#check").on("click",e => {});

$("#reset").on("click",e => {});

$("#clear").on("click",e => {});

$("#rebuild").on("click",e => {
    grid.rebuild();
});