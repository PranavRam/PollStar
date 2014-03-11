Ext.define('PollStar.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.Toolbar',
        'PollStar.view.PollList'
    ],
    config: {
      layout: 'vbox',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'PollStar',
            items: [{
              xtype: 'button',
              iconCls: 'camera',
              action: 'activateCamera'
            }, {
              xtype: 'button',
              iconCls: 'photos',
              action: 'activatePhotoLibrary'
            }, {
              xtype: 'spacer'
            },  {
              xtype: 'button',
              iconCls: 'user',
              action: 'navToUsers'
            }]
        }, {
          xtype: 'pollList',
          flex: 1
        }]
    }
});