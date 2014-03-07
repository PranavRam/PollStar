Ext.define('PollStar.view.FriendsMain', {
    extend: 'Ext.TabPanel',
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
                iconCls: 'camera',
                action: 'activateCamera'
            }, {
                xtype: 'button',
                iconCls: 'photos',
                action: 'activatePhotoLibrary'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'table'
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