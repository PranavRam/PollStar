Ext.define('PollStar.model.Poll', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'objectId',
            type: 'auto',
            persist: 'false'
        }, {
            name: 'question',
            type: 'string'
        }],
        idProperty: 'objectId'
    }
});