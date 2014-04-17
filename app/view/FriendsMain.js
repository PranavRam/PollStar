Ext.define('PollStar.view.FriendsMain', {
    extend: 'Ext.TabPanel',
    xtype: 'friendsMain',
    requires: [
        'PollStar.view.FriendsList',
        'PollStar.view.UsersList',
        'PollStar.view.components.ToolbarSpinner'
    ],
    config: {
        tabBarPosition: 'bottom',
        hidden: true,
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'PollStar',
            items: [{
                xtype: 'button',
                iconCls: 'add',
                action: 'activateImageSelect'
            }, {
                xtype: 'tbarspinner',
                //align: 'right',
                action: 'friends',
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
                iconCls: 'flag',
                action: 'navToPolls'
            }]
        }, {
            title: 'Friends',
            iconCls: 'user',
            xtype: 'friendsList'
        }, {
            title: 'Users',
            iconCls: 'team',
            xtype: 'usersList'
        }, {
            title: 'Groups',
            iconCls: 'favorites'
        }]
    }
})