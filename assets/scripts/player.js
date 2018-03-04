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

    onLoad() {
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

        this.controller.on('VirtualStick', (event) => {
            if (event.detail.moveVector.x != 0 || event.detail.moveVector.y != 0) {
                this.stickX = event.detail.moveVector.x;
                this.stickY = event.detail.moveVector.y;
            }
        });

        this.controller.on('stickStart', () => {
            this.stickStart = true;
        });
        this.controller.on('stickMove', () => {
            this.stickMove = true;
        });
        this.controller.on('stickRelease', () => {
            this.stickRelease = true;
        });

        // 计分板叫球员恢复最开始的姿势
        this.score.on('recover', (event) => {
            // console.log('recover');
            if (this.hasShoot && this.stickRelease) {
                this.hasReady = true;
                this.hasShoot = false;
                this.stickX = 0;
                this.stickY = 0;
            }
        });
    },

    start() {},

    update(dt) {

        // 摇杆初始位置，球员已经做好准备
        if (this.hasReady && this.stickX == 0 && this.stickY == 0) {
            // console.log('ready');
            this.stickStart = false;
            this.stickMove = false;
            this.stickRelease = false;

            // 如果player手里没球，就给他一个
            if (!this.node.children[0]) {
                let newBall = cc.instantiate(this.basketball);
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
    },
});