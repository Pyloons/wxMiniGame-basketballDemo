cc.Class({
    extends: cc.Component,

    properties: {
        basket: {
            type: cc.Node,
            default: null
        }
    },

    onLoad() {
        this.score = 0;

        this.basket.on('plusOne', () => {
            this.score += 1;
            this.node.getComponent(cc.Label).string = 'Combo:' + this.score.toString();
            this.node.emit('recover');
        });
    },
});