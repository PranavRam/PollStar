Ext.define('PollStar.view.ImageSelectionSheet', {
    extend: 'Ext.ActionSheet',
    config: {
        id: 'imageselectionsheet',
        hidden: true,
        items: [{
            text: 'Photo Album',
            iconCls: 'photos',
            action: 'activatePhotoLibrary'
        }, {
            text: 'Camera',
            iconCls: 'camera',
            action: 'activateCamera'
        }, {
            text: 'Cancel',
            iconCls: 'blank',
            listeners: {
                tap: function(cBtn, e, eOpts) {
                    this.up('#imageselectionsheet').hide();
                }
            }
        }]
    }
});