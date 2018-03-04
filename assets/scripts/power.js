cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            type: cc.Node,
            default: null
        },
        
        controller: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.height = 0;
        this.clockStart = false;
        this.deltaTime = 0;

        this.score.on('recover', () => {
            // console.log('power recover');
            this.node.height = 0;
        });

        this.controller.on('stickStart', () => {
            this.deltaTime = Date.now();
            // console.log('power stickStart');
            this.clockStart = true;
        });

        this.controller.on('stickRelease', () => {
            // console.log('power stickRelease');
            this.clockStart = false;
        });
    },

    update (dt) {
        this.deltaTime = Date.now() - this.deltaTime;
        if(this.clockStart && this.deltaTime < 1000) {
            this.node.height += dt * 200;
        }
    },
});
