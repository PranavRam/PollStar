Ext.define('PollStar.store.Users', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.ux.parse.data.proxy.Parse'
    ],

    config: {
        storeId: 'usersStore',
        model: 'PollStar.model.User',
        autoLoad: true,
        sorters: 'username',
        proxy: {
            type: 'parse',
            url: 'https://api.parse.com/1/users'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('username')[0];
            }
        }
    }
});