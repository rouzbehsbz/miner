const GameController = require("../logic/game-controller");

log = function(str){
    console.log(str);
}

isUndefined = function (obj){
    return typeof obj == 'undefined';
};

randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}