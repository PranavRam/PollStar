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
        loadingText: false,
        //onItemDisclosure: true,
        cls: 'user-list',
        items: [{
            xtype: 'searchfield',
            scrollDock: 'top',
            //docked: 'top',
            placeHolder: 'Search'
        }],
        listeners: {
            /*disclose: function(list, record, target, index, e, eOpts) {
                hello_div = e;
                console.log(index, record, e.target);
            },*/
            itemtouchstart: function(list, index, target, record, e, eOpts) {
                //console.log('itemtap start');
                var target = e.getTarget('[data-icon="+"]');
                if (target) {
                    Ext.get(target).addCls('addUser-button-pressed');
                    //console.log(target);
                }
            },
            itemtouchend: function(list, index, target, record, e, eOpts) {
                Ext.get(e.target).removeCls('addUser-button-pressed');
                //console.log(e.target);
                //target.down('[data-icon="U&"]').removeCls('x-button-pressed');
                //console.log(target.down('[data-icon="U&"]'));
            }
        }
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.callParent(arguments);

        //console.log('element', me.element);
        me.setItemTpl(Ext.select('#tpl_user_list').elements[0].innerHTML);
        me.setStore('usersStore');
    }
});