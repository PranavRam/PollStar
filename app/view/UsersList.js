Ext.define('PollStar.view.UsersList', {
    extend: 'Ext.dataview.List',
    requires: [
        'PollStar.store.Users',
        'Ext.field.Search'
    ],
    xtype: 'usersList',
    config: {
        //store: 'usersStore',
        grouped: true,
        onItemDisclosure: true,
        cls: 'user-list',
        items: [{
            xtype: 'searchfield',
            scrollDock: 'top',
            //docked: 'top',
            placeHolder: 'Search'
        }],
        listeners: {
        	disclose: function(list, record, target, index, e, eOpts){
        		hello_div = e;
        		console.log(index, record, e.target);
        	}
        }
    },
    initialize: function(){
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        element = me;
        console.log('element', me.element);
        me.setItemTpl(Ext.select('#tpl_user_list').elements[0].innerHTML);
        me.setStore('usersStore');
        me.callParent(arguments);
    }
});