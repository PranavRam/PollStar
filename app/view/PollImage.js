Ext.define('PollStar.view.PollImage', {
    extend: 'Ext.Img',
    requires: [
        'PollStar.view.ImageFullScreen'
    ],
    xtype: 'pollimage',
    config: {
        imageOrientation: null,
        mode: 'image',
        //centered: true,
        //width: '100%',
        //height: '100%',
        listeners: {
            tap: function(img, e, eOpts) {
                var me = this;
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