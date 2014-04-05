Ext.define('PollStar.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    requires: [
        'Ext.Toolbar',
        'PollStar.view.PollList'
    ],
    config: {
        autoDestroy: true,
        defaultBackButtonText: 'Polls',
        navigationBar: {
            docked: 'top',
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'button',
                iconCls: 'add',
                action: 'activateImageSelect',
                category: 'hideOffMain'
            }, /*{
                xtype: 'button',
                iconCls: 'photos',
                action: 'activatePhotoLibrary'
            },*/ {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'user',
                action: 'navToUsers',
                category: 'hideOffMain'
            }]
        },
        items: [{
          xtype: 'pollList',
          title: 'PollStar'
        }]
    }
});