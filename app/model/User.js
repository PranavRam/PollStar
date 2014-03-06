Ext.define('PollStar.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'username',
            type: 'string',
            persist: 'false'
        }, {
            name: 'email',
            type: 'string'
        }],
        idProperty: 'objectId'
    }
});