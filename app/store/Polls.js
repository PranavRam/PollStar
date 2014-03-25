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
            url: 'https://api.parse.com/1/classes/Poll?order=-updatedAt&include=participants,owner'
        },

        listeners: {
            load: function(store, records, successful, operation, eOpts) {
                //console.log(records);
                var pollsVoted = Parse.User.current().get('pollsVoted');

                Ext.Array.forEach(records, function(record, index) {
                    var pollId = record.get('objectId');
                    //console.log(pollId, pollsVoted);
                    if (pollId in pollsVoted) {
                        //console.log('voted');
                        record.set('voted', "voted");
                    }
                });
            }
        }
    }
});