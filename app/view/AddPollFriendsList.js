Ext.define('PollStar.view.AddPollFriendsList', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.field.Search'
    ],
    xtype: 'addPollFriendsList',
    config: {
        //store: 'friendsStore',
        //onItemDisclosure: true,
        mode: 'MULTI',
        items: [{
            xtype: 'searchfield',
            scrollDock: 'top',
            //docked: 'top',
            placeHolder: 'Search'
        }]
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.setItemTpl(Ext.select('#tpl_friends_list').elements[0].innerHTML);
        me.setStore(Ext.getStore('friendsStore'));
        me.callParent(arguments);
        //me.refresh();
    }
});