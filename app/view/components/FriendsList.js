Ext.define('PollStar.view.components.FriendsList', {
    extend: 'Ext.dataview.List',
    xtype: 'addfriendslist',

    config: {
        showAnimation: {
            type: 'fade',
            duration: 300,
            delay: 100
        },
        store: 'friendsStore',
        left: 0,
        top: 0,
        //modal: true,
        hideOnMaskTap: true,
        width: '90%',
        height: 100,
        cls: 'add-polls-friends-list',
        textfield: null,
        itemTpl: '<div class="myContent">' + '<div><b>{username}</b> ({email})</div>' + '</div>',

        emptyText: '<div class="myContent">No Matching Friends</div>',

    }
});