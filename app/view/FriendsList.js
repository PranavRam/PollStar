Ext.define('PollStar.view.FriendsList',{
	extend: 'Ext.dataview.List',
	requires: [
		'PollStar.store.Friends'
	],
	xtype: 'friendsList',
	config: {
		fullscreen: true,
		store: 'friendsStore',
		itemTpl: '{username}'
	}
});
