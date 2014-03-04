Ext.define('PollStar.store.Polls', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.ux.parse.data.proxy.Parse'
    ],

    config: {
        storeId: 'pollsStore',
        model: 'PollStar.model.Poll',
        autoLoad: true,

        proxy: {
            type: 'parse',
            url: 'https://api.parse.com/1/classes/Poll'
        }
    }

});