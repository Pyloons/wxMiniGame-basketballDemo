"use strict";
cc._RF.push(module, 'c451c7YeZxDo57FHHXCQ8O3', 'player');
// scripts/player.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        controller: {
            type: cc.Node,
            default: null
        },

        basketball: {
            type: cc.Prefab,
            default: null
        },

        score: {
            type: cc.Node,
            default: null
        }
    },

    onLoad: function onLoad() {
        var _this = this;

        this.playerAction = this.getComponent(cc.Animation);
        this.playerAnimStatus = this.playerAction.play('playerReady');
        this.deltaTime = 0;
        this.hasReady = true;
        this.hasWait = false;
        this.hasShoot = false;
        this.stickX = 0;
        this.stickY = 0;

        // 记录摇杆状态
        this.stickStart = false;
        this.stickMove = false;
        this.stickRelease = false;

        this.controller.on('VirtualStick', function (event) {
            if (event.detail.moveVector.x != 0 || event.detail.moveVector.y != 0) {
                _this.stickX = event.detail.moveVector.x;
                _this.stickY = event.detail.moveVector.y;
            }
        });

        this.controller.on('stickStart', function () {
            _this.stickStart = true;
        });
        this.controller.on('stickMove', function () {
            _this.stickMove = true;
        });
        this.controller.on('stickRelease', function () {
            _this.stickRelease = true;
        });

        // 计分板叫球员恢复最开始的姿势
        this.score.on('recover', function (event) {
            // console.log('recover');
            if (_this.hasShoot && _this.stickRelease) {
                _this.hasReady = true;
                _this.hasShoot = false;
                _this.stickX = 0;
                _this.stickY = 0;
            }
        });
    },
    start: function start() {},
    update: function update(dt) {

        // 摇杆初始位置，球员已经做好准备
        if (this.hasReady && this.stickX == 0 && this.stickY == 0) {
            // console.log('ready');
            this.stickStart = false;
            this.stickMove = false;
            this.stickRelease = false;

            // 如果player手里没球，就给他一个
            if (!this.node.children[0]) {
                var newBall = cc.instantiate(this.basketball);
                newBall.getComponent('basketball').joyStick = this.controller;
                newBall.getComponent('basketball').player = this.node;
                this.node.addChild(newBall);
            }

            this.node.children[0].opacity = 0;

            this.playerAction.play('playerReady');
            this.deltaTime = Date.now();
        }

        // 摇杆被拉动，但未松开，球员等着投球
        else if (this.hasReady && (this.stickX != 0 || this.stickY != 0)) {
                // console.log('wait');
                this.playerAction.stop();
                this.playerAction.play('playerWait');
                this.hasReady = false;
                this.hasWait = true;
                this.node.children[0].opacity = 255;
            }

            // 摇杆已被拉动，并且松开，球员马上投出了球
            else if (this.hasWait && this.stickRelease) {
                    // console.log('shoot');
                    this.deltaTime = Date.now() - this.deltaTime;
                    this.node.emit('shootNow', {
                        deltaTime: this.deltaTime,
                        shootAngle: cc.p(this.stickX, this.stickY)
                    });
                    this.playerAction.stop();
                    this.playerAction.play('playerShoot');
                    this.hasWait = false;
                    this.hasShoot = true;
                }
    }
});

cc._RF.pop();