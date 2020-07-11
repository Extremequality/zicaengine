define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var Collision = (function () {
        function Collision() {
        }
        /**
         * Tests the collision between two objects, choosing the proper method depending on their shapes.
         **/
        Collision.testCollision = function (a, b) {
            if (a.type == CollisionType.rectangle && b.type == CollisionType.rectangle) {
                return Collision.boxIntersection(a, b);
            }
        };
        /**
         * Returns true if two boxes {x, y, width, height} are inside each other, but not simply touching at an edge.
         **/
        Collision.boxIntersection = function (a, b) {
            return (a.x < b.x + b.width && a.x + a.width > b.x) && (a.y < b.y + b.height && a.y + a.height > b.y);
        };
        return Collision;
    }());
    exports.Collision = Collision;
});
