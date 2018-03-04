(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/power.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca80cexugZLMoEX8M71bhxe', 'power', __filename);
// scripts/power.js

'use strict';

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

    onLoad: function onLoad() {
        var _this = this;

        this.node.height = 0;
        this.clockStart = false;
        this.deltaTime = 0;

        this.score.on('recover', function () {
            // console.log('power recover');
            _this.node.height = 0;
        });

        this.controller.on('stickStart', function () {
            _this.deltaTime = Date.now();
            // console.log('power stickStart');
            _this.clockStart = true;
        });

        this.controller.on('stickRelease', function () {
            // console.log('power stickRelease');
            _this.clockStart = false;
        });
    },
    update: function update(dt) {
        this.deltaTime = Date.now() - this.deltaTime;
        if (this.clockStart && this.deltaTime < 1000) {
            this.node.height += dt * 200;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=power.js.map
        