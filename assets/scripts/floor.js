cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter(other, self) {
        cc.director.loadScene('main');
    },

    start() {

    },
});