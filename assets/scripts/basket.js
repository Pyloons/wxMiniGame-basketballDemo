cc.Class({
    extends: cc.Component,

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter (other, self){
        this.node.emit('plusOne');
    }
});
