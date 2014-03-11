Ext.define('PollStar.view.UsersList', {
    extend: 'Ext.dataview.List',
    requires: [
        'PollStar.store.Users'
    ],
    xtype: 'usersList',
    config: {
        //store: 'usersStore',
        grouped: true,
        onItemDisclosure: true,
        cls: 'user-list',
        listeners: {
        	disclose: function(list, record, target, index, e, eOpts){
        		console.log(index, record);
        	}
        }
    },
    initialize: function(){
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.setItemTpl(Ext.select('#tpl_user_list').elements[0].innerHTML);
        me.setStore('usersStore');
        me.callParent(arguments);
    }
});