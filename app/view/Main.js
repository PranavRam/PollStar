Ext.define('PollStar.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    requires: [
        'Ext.Toolbar',
        'PollStar.view.PollList',
        'PollStar.view.components.ToolbarSpinner'
    ],
    config: {
        autoDestroy: true,
        hidden: true,
        showAnimation: {
            type: 'fade',
            duration: 300,
            delay: 100
        },
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
        }]
    }
});