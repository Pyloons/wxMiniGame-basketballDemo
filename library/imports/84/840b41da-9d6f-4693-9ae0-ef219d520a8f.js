"use strict";
cc._RF.push(module, '840b4HanW9Gk5rg7yGdUgqP', 'floor');
// scripts/floor.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        cc.director.loadScene('main');
    },
    start: function start() {}
});

cc._RF.pop();