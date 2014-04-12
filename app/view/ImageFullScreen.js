// var elementImage;
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
            duration: 200,
            direction: 'up'
        },

        hideAnimation: {
            type: 'slideOut',
            duration: 200,
            direction: 'down'
        },
        //layout: 'fit',
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
            // height: '100%',
            // width: '100%',
            // centered: true,
            listeners: {
                painted: function(element) {
                    console.log(cmp);
                    var img = Ext.get(element).down('img').dom;
                    //console.log(img.dom.naturalHeight, img.dom.naturalWidth);
                    var screenWidth = window.screen.width;
                    var screenHeight = window.screen.height;
                    var imgH = img.naturalHeight;
                    var imgW = img.naturalWidth;
                    console.log(screenHeight, screenWidth, imgH, imgW);
                    if (imgW < imgH) {
                        var ratio = (imgW/(screenWidth));
                        //cmp.setWidth(screenWidth);
                        var height = imgH/ ratio;
                        var width = imgW / ratio;
                        var imgTag = element.child('img').dom;
                        //console.log(imgTag, width, height);
                        //marginLeft = (screenWidth - height)/2;
                        marginTop = (screenHeight - height - 24)/2;
                        imgTag.style.setProperty('width', width+"px", 'important');
                        imgTag.style.setProperty('height', height+"px", 'important');
                        //imgTag.style.setProperty('margin-left', marginLeft+"px", 'important');
                        imgTag.style.setProperty('margin-top', marginTop+"px", 'important');
                        console.log(imgTag);
                    } else {
                        //var height = imgW;
                        element.addCls('rotate-90-right');
                        // elementImage = element;
                        var ratio = (imgH/(screenWidth));
                        //var ratioW = (imgW/(screenH - 24));
                        var height = imgH/ ratio;
                        var width = imgW / ratio;
                        //cmp.setHeight(height-24);
                        /*cmp.setHeight(height);
                        cmp.setWidth(width);*/
                        var imgTag = element.child('img').dom;
                        console.log(imgTag, width, height);
                        marginLeft = (screenWidth - height)/2;
                        marginTop = (screenHeight - width - 24)/2;
                        imgTag.style.setProperty('width', width+"px", 'important');
                        imgTag.style.setProperty('height', height+"px", 'important');
                        //imgTag.style.setProperty('margin-left', marginLeft+"px", 'important');
                        imgTag.style.setProperty('margin-top', marginTop+"px", 'important');
                        console.log(imgTag);
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