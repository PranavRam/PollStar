Ext.define('PollStar.store.Contacts', {
    extend: 'Ext.data.Store',
    requires: [
        //'Ext.ux.parse.data.proxy.Parse'
    ],

    config: {
        storeId: 'contactStore',
        model: 'PollStar.model.Contact'
        //autoLoad: true,
    }
});