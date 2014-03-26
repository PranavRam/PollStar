Ext.define('PollStar.view.PollImage', {
	extend: 'Ext.Img',
	xtype: 'pollimage',
	config: {
		imageOrientation: null,
		//mode: 'image',
		//height: '100%',
		listeners: {
		    tap: function(img, e, eOpts){                        
		        var formpanel = img.up('addPollView').down('formpanel');
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
		            if(img.getImageOrientation() == 1){
		            	img.element.dom.style.setProperty("-webkit-transform", "rotate(90deg)");
		            }
		            img.element.dom.style.setProperty("height", screen.height+"px", "important");
		            //img.element.dom.style.setProperty("background-size", "contain");
		            img.fullscreen = true;
		            navBar.setHidden(true);
		            //img.setMode('image');
		        }
		    }
		}
	}
});