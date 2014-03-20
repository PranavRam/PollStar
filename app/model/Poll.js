Ext.define('PollStar.model.Poll', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'objectId',
            type: 'string',
            persist: 'false'
        }, {
            name: 'question',
            type: 'string'
        }, {
            name: 'options'
        }, {
            name: 'owner',
            type: 'object'
        }, {
            name: 'participants'
        }, {
            name: 'image',
            type: 'object'
        }],
        idProperty: 'objectId'
    }
});