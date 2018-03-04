"use strict";
cc._RF.push(module, 'df4944G3ddEM61wN24UqTbp', 'score');
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