Ext.define('PollStar.view.PollImage', {
    extend: 'Ext.Img',
    requires: [
        'PollStar.view.ImageFullScreen'
    ],
    xtype: 'pollimage',
    config: {
        imageOrientation: null,
        //mode: 'image',
        //height: '100%',
        listeners: {
            tap: function(img, e, eOpts) {
            	var me = this;
                /*var formpanel = img.up('addPollView').down('formpanel');
		        var navBar = img.up('addPollView').getNavigationBar();
		        //console.log(formpanel);
		        if(!img.fullscreen) img.fullscreen = false;
		        //console.log(img);
		        if(img.fullscreen){
		            // formpanel.setHidden(false);
		            // img.setFlex(1);
		            // formpanel.setFlex(2);
		            // formpanel.setHidden(false);
		            img.element.dom.style.setProperty("height", "0", "important");
		            img.element.dom.style.setProperty("-webkit-transform", "");
		            img.fullscreen = false;
		            navBar.setHidden(false);
		            //img.setMode('background');
		        }
		        else {
		            // formpanel.setHidden(true);
		            // formpanel.setFlex(0);
		            //console.log(img.getStyle());
		            // img.setHeight(window.innerHeight);
		            //console.log(img.getImageOrientation());
		            navBar.setHidden(true);
		            if(img.getImageOrientation() == 1){
		            	img.element.dom.style.setProperty("-webkit-transform", "rotate(90deg)");
		            }
		            img.element.dom.style.setProperty("height", screen.height+"px", "important");
		            //img.element.dom.style.setProperty("background-size", "contain");
		            img.fullscreen = true;
		            
		            //img.setMode('image');
		        }*/
                var fullscreenimage = Ext.create('PollStar.view.ImageFullScreen');
                Ext.Viewport.add(fullscreenimage);
                console.log(me.getSrc());
                fullscreenimage.down('image').setSrc(me.getSrc());
                //if(me.getImageOrientation() == 1)
                	//fullscreenimage.down('image').setCls('rotate-90-right');
                fullscreenimage.show();
            }
        }
    }
});