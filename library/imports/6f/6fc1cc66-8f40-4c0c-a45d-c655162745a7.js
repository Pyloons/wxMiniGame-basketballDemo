"use strict";
cc._RF.push(module, '6fc1cxmj0BMDKRdxlUWJ0Wn', 'JoyStick');
// prefabs/Controller/scripts/JoyStick.js

'use strict';

/*
 * 简单的游戏摇杆实现
 * 使用方法：
 * 1.加载本组件的预制件
 * 2.在需要受控制的模块监听“本节点”的VirtualStick事件
 *
 * 注意：
 * 最合适的用法，是将此预制件拖入自定义控件，再将JoyStick子节点引入需要它控制的模块，再监听事件。
 */

cc.Class({
    extends: cc.Component,

    properties: {
        moveRadius: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.setTouchListener();
        this.originPos = this.node.getPosition();
        this.stickSize = this.node.getContentSize();
        this.ratio = 0;
        this.stickDistance = 0;
        this.touchLocalX = 0;
        this.touchLocalY = 0;
        this.moveVec = cc.p(0, 0);
        this.stickGo = false;
    },


    // 监听内置触摸事件，并处理摇杆对应的逻辑
    setTouchListener: function setTouchListener() {

        var self = this;

        // 增加了三个子事件，以免通过摇杆坐标来判断摇杆状态，引起混乱
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,

            onTouchesBegan: function onTouchesBegan(touches, event) {
                self.node.emit('stickStart');
                self.getStickStatus(touches);
                if (Math.abs(self.touchLocalX) < 60 && Math.abs(self.touchLocalY) < 60) {
                    self.stickGo = true;
                    self.changeStickStatus();
                }
            },
            onTouchesMoved: function onTouchesMoved(touches, event) {
                self.node.emit('stickMove');
                self.node.setPosition(self.originPos.x, self.originPos.y);
                self.getStickStatus(touches);
                if (self.stickGo == true) {
                    self.changeStickStatus();
                }
            },
            onTouchesEnded: function onTouchesEnded(touches, event) {
                self.node.emit('stickRelease');
                self.node.setPosition(self.originPos.x, self.originPos.y);
                self.touchLocalX = 0;
                self.touchLocalY = 0;
                self.stickGo = false;
                self.sendEvent();
            }
        }, self.node);
    },


    //获取并处理一些摇杆相关的变量
    getStickStatus: function getStickStatus(touches) {
        // 父节点坐标，触摸监听只返回左上角坐标系
        var touch = touches[0].getLocation();
        // 摇杆子节点坐标，原点位于摇杆左下角
        var touchLocal = this.node.convertToNodeSpace(touch);
        // 以下处理将坐标系锚点换为摇杆节点的水平垂直居中点
        this.touchLocalX = touchLocal.x - this.stickSize.width / 2;
        this.touchLocalY = touchLocal.y - this.stickSize.height / 2;

        this.stickDistance = cc.pDistance(cc.p(this.touchLocalX, this.touchLocalY), cc.p(0, 0));

        this.ratio = this.moveRadius / this.stickDistance;
    },


    //改变摇杆的外貌，并将状态用自定义事件发送出去
    changeStickStatus: function changeStickStatus() {
        if (this.stickDistance <= this.moveRadius) {
            this.node.setPositionX(this.originPos.x + this.touchLocalX);
            this.node.setPositionY(this.originPos.y + this.touchLocalY);
        } else {
            this.node.setPositionX(this.originPos.x + this.touchLocalX * this.ratio);
            this.node.setPositionY(this.originPos.y + this.touchLocalY * this.ratio);
        }
        this.sendEvent();
    },


    //发送自定义的VirtualStick事件
    sendEvent: function sendEvent() {
        this.moveVec = this.returnMyCommands();
        this.node.emit('VirtualStick', {
            moveVector: this.moveVec
        });
    },
    start: function start() {},
    update: function update(dt) {},


    //生成VirtualStick事件需要的数据
    returnMyCommands: function returnMyCommands() {
        var commandX = this.touchLocalX * this.ratio;
        var commandY = this.touchLocalY * this.ratio;
        return cc.p(commandX, commandY);
    }
});

cc._RF.pop();