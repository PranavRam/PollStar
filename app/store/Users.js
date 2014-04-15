Ext.define('PollStar.store.Users', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.ux.parse.data.proxy.Parse'
    ],

    config: {
        storeId: 'usersStore',
        model: 'PollStar.model.User',
        //autoLoad: true,
        sorters: 'username',
        //pageSize: 30,
        grouper: {
            groupFn: function(record) {
                return record.get('username')[0];
            }
        }
    },
    initialize: function(){
        var me = this;
        me.callParent(arguments);
        me.setProxy({
            type: 'parse',
            url: 'https://api.parse.com/1/users' + me.usersQuery(),
        });
        me.load();
    },
    usersQuery: function() {
        var usersQuery = JSON.stringify({
            objectId: {
                $ne: Parse.User.current().id
            }
        });
        return '?where=' + usersQuery;
    }
});