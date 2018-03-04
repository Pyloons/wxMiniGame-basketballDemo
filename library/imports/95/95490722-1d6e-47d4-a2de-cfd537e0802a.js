"use strict";
cc._RF.push(module, '95490ciHW5H1KLez9U34IAq', 'basket');
// scripts/basket.js

'use strict';

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.emit('plusOne');
    }
});

cc._RF.pop();