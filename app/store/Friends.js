Ext.define('PollStar.store.Friends', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.ux.parse.data.proxy.Parse'
    ],

    config: {
        storeId: 'friendsStore',
        model: 'PollStar.model.User',
        autoLoad: true,

        proxy: {
            type: 'parse',
            url: 'https://api.parse.com/1/users?'+ 'where={"$relatedTo":{"object":{"__type":"Pointer","className": "_User","objectId":"UO2sjYOKjp"},"key":"friends"}}'
        }
    }

});