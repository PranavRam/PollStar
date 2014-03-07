Ext.define('PollStar.view.UsersList', {
    extend: 'Ext.dataview.List',
    requires: [
        'PollStar.store.Users'
    ],
    xtype: 'usersList',
    config: {
        //store: 'usersStore',
        grouped: true
    },
    initialize: function(){
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.setItemTpl(Ext.select('#tpl_user_list').elements[0].innerHTML);
        me.setStore('usersStore');
    }
});