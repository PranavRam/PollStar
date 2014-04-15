Ext.define('PollStar.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'username',
            type: 'string',
            persist: 'false'
        },{
            name: 'isFriend',
            type: 'string',
            defaultValue: '+'
        }, {
            name: 'email',
            type: 'string'
        }],
        idProperty: 'objectId'
    }
});