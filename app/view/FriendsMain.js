Ext.define('PollStar.view.FriendsMain', {
    extend: 'Ext.TabPanel',
    xtype: 'friendsMain',
    requires: [
        'PollStar.view.FriendsList',
        'PollStar.view.UsersList'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'PollStar',
            items: [{
                xtype: 'button',
                iconCls: 'add',
                action: 'activateImageSelect'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'table',
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
            iconCls: 'heart'
        }]
    }
})