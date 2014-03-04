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
              iconCls: 'camera'
            }, {
              xtype: 'spacer'
            },  {
              xtype: 'button',
              iconCls: 'user'
            }]
        }, {
          xtype: 'pollList',
          flex: 1
        }]
    }
});