"use strict";
var Grid = require("./ui/grid.js");
var PopupNumbers = require("./ui/popupNumbers.js");
var grid = new Grid($("#container"), $("#levelSel")); //创建实例
grid.build(); //开始构建
grid.layout(); //调整高度
var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers); //绑定操作
//底部按键
$("#check").on("click", function (e) {
    if (grid.check()) {
        alert("ok");
    }
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});
