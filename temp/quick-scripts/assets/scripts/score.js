(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/score.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'df4944G3ddEM61wN24UqTbp', 'score', __filename);
// scripts/score.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        basket: {
            type: cc.Node,
            default: null
        }
    },

    onLoad: function onLoad() {
        var _this = this;

        this.score = 0;

        this.basket.on('plusOne', function () {
            _this.score += 1;
            _this.node.getComponent(cc.Label).string = 'Combo:' + _this.score.toString();
            _this.node.emit('recover');
        });
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=score.js.map
        