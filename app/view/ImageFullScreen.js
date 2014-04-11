Ext.define('PollStar.view.ImageFullScreen', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Img'
    ],
    xtype: 'imagefullscreen',
    config: {
        hidden: true,
        showAnimation: {
            type: 'slideIn',
            duration: 300,
            direction: 'up'
        },

        hideAnimation: {
            type: 'slideOut',
            duration: 200,
            direction: 'down'
        },
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'button',
                text: 'Cancel',
                handler: function() {
                    var me = this;
                    var imageFullScreen = this.up('.imagefullscreen');
                    imageFullScreen.onAfter('hide', function() {
                        console.log('say bye');
                        Ext.Viewport.remove(imageFullScreen, true);
                    });
                    imageFullScreen.hide();
                }
            }]
        }, {
            xtype: 'image',
            //cls: 'rotate-90-right',
            mode: 'image',
            listeners: {
                load: function(cmp) {
                    var img = Ext.get(cmp.element).down('img').dom;
                    //console.log(img.dom.naturalHeight, img.dom.naturalWidth);
                    var screenWidth = window.screen.width;
                    var screenHeight = window.screen.height;
                    var imgH = img.naturalHeight;
                    var imgW = img.naturalWidth;
                    console.log(screenHeight, screenWidth, imgH, imgW);
                    if (imgW < imgH) {
                        cmp.setHeight(screenHeight - 24);
                    } else {
                        //var height = imgW;
                        cmp.addCls('rotate-90-right');
                        var ratio = img.naturalWidth/(screenHeight-24);
                        var height = img.naturalHeight / ratio;
                        var width = img.naturalWidth / ratio;
                        //cmp.setHeight(height-24);
                        cmp.setHeight(height);
                        cmp.setWidth(width);
                    }
                    //cmp.up().setMasked(false);
                }
            }
        }]
    },
    initialize: function() {
    	Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
    	this.callParent(arguments);
    },

    handleOrientationChange: function(viewport,orientation,width,height){
        // Execute the code that needs to fire on Orientation Change.
        Ext.Msg.alert("Orientation",orientation);
 
    }
});