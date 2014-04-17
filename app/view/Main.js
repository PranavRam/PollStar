Ext.define('PollStar.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    requires: [
        'Ext.Toolbar',
        'PollStar.view.PollList',
        'PollStar.view.components.ToolbarSpinner'
    ],
    config: {
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
            }, {
                xtype: 'tbarspinner',
                //align: 'right',
                action: "main",
                hidden: true
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'settings',
                action: 'settings',
                category: 'hideOffMain'
            }, {
                xtype: 'button',
                iconCls: 'user',
                action: 'navToUsers',
                category: 'hideOffMain'
            }, {
                xtype: 'button',
                text: 'Vote',
                action: 'voteForPoll',
                hidden: true
            }]
        },
        items: [{
            xtype: 'pollList',
            title: 'PollStar'
        }],
        listeners: {
            painted: function(){
                console.log('main painted');
            },
            show: function(){
                console.log('main show');
            }
        }
    }
});