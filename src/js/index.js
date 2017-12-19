import Grid from "./ui/grid";
import PopupNumbers from "./ui/popupNumbers";
const grid = new Grid($("#container"), $("#levelSel")); //创建实例
grid.build(); //开始构建
grid.layout(); //调整高度
const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers); //绑定操作
//底部按键
$("#check").on("click", e => {
    if (grid.check()) {
        alert("ok");
    }
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});
