Ext.define('PollStar.view.FriendsList',{
	extend: 'Ext.dataview.List',
	requires: [
		'PollStar.store.Friends'
	],
	xtype: 'friendsList',
	config: {
		//store: 'friendsStore',
	},
	initialize: function(){
		//console.log(PollStar.util.Templates.pollList());
		var me = this;
		me.setItemTpl(Ext.select('#tpl_friends_list').elements[0].innerHTML);
		me.setStore('friendsStore');
		me.callParent(arguments);
		//me.refresh();
	}
});
