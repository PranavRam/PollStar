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
            cls: 'imageFullScreen'
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