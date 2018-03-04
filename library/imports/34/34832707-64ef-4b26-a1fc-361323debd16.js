"use strict";
cc._RF.push(module, '34832cHZO9LJqH8NhMj3r0W', 'basketball');
// scripts/basketball.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        joyStick: {
            type: cc.Node,
            default: null
        },

        player: {
            type: cc.Node,
            default: null
        },

        g: 0
    },

    onLoad: function onLoad() {
        var _this = this;

        this.shootNow = false;

        // 设置球的抛物线计算参数
        this.v0 = 0;
        this.t = 0;

        this.slash = this.node.width / 2;
        this.cosAngle = 0;
        this.sinAngle = 0;

        this.player.on('shootNow', function (event) {
            _this.shootNow = true;

            // 计算抛物线
            _this.v0 = event.detail.deltaTime < 1000 ? event.detail.deltaTime / 300 : 3.33;
            var xLine = -event.detail.shootAngle.x;
            var yLine = -event.detail.shootAngle.y;
            _this.cosAngle = xLine / _this.slash;
            _this.sinAngle = yLine / _this.slash;
        });

        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function onCollisionEnter() {
        this.node.destroy();
    },
    update: function update(dt) {
        if (this.shootNow == true) {
            this.t += dt;
            var moveX = this.v0 * this.cosAngle * this.t;
            var moveY = this.v0 * this.sinAngle * this.t - this.g * this.t * this.t / 2;
            this.node.x += moveX + this.v0 * this.cosAngle;
            this.node.y += moveY + this.v0 * this.sinAngle - this.g * this.t;
        }
    }
});

cc._RF.pop();