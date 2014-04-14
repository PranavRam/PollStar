Ext.define('PollStar.view.components.FriendsList', {
    extend: 'Ext.dataview.List',
    xtype: 'addfriendslist',

    config: {
        store: 'friendsStore',
        left: 0,
        top: 0,
        hideOnMaskTap: true,
        width: '95%',
        height: 100,
        cls: 'myClass',
        textfield: null,
        itemTpl: '<div class="myContent">' + '<div><b>{username}</b> ({email})</div>' + '</div>',

        emptyText: '<div class="myContent">No Matching Countries</div>',

    }
});