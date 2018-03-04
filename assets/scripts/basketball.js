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

        g: 0,
    },

    onLoad() {
        this.shootNow = false;

        // 设置球的抛物线计算参数
        this.v0 = 0;
        this.t = 0;

        this.slash = this.node.width / 2;
        this.cosAngle = 0;
        this.sinAngle = 0;

        this.player.on('shootNow', (event) => {
            this.shootNow = true;

            // 计算抛物线
            this.v0 = event.detail.deltaTime < 1000 ? event.detail.deltaTime / 300 : 3.33;
            let xLine = -event.detail.shootAngle.x;
            let yLine = -event.detail.shootAngle.y;
            this.cosAngle = xLine / this.slash;
            this.sinAngle = yLine / this.slash;
        });

        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter() {
        this.node.destroy();
    },

    update(dt) {
        if (this.shootNow == true) {
            this.t += dt;
            let moveX = this.v0 * this.cosAngle * this.t;
            let moveY = this.v0 * this.sinAngle * this.t - this.g * this.t * this.t / 2;
            this.node.x += moveX + this.v0 * this.cosAngle;
            this.node.y += moveY + this.v0 * this.sinAngle - this.g * this.t;
        }
    },
});