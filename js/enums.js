define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Direction;
    (function (Direction) {
        Direction[Direction["up"] = 0] = "up";
        Direction[Direction["down"] = 1] = "down";
        Direction[Direction["left"] = 2] = "left";
        Direction[Direction["right"] = 3] = "right";
    })(Direction = exports.Direction || (exports.Direction = {}));
    /**
     * Enum for the different kinds of shapes that can be checked by collision detection
     **/
    var CollisionType;
    (function (CollisionType) {
        CollisionType[CollisionType["none"] = 0] = "none";
        CollisionType[CollisionType["rectangle"] = 1] = "rectangle";
        //circle
        //line
    })(CollisionType = exports.CollisionType || (exports.CollisionType = {}));
});
