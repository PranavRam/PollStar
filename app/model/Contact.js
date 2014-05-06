Ext.define('PollStar.model.Contact', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'name',
            type: 'string',
            persist: 'false'
        },{
            name: 'numbers'
        }]
        //idProperty: 'objectId'
    }
});