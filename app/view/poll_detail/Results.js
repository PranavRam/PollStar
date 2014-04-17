Ext.define('PollStar.view.poll_detail.Results', {
    extend: 'Ext.Carousel',
    xtype: 'polldetailresults',
    requires: [
        'PollStar.view.PollImage',
        'PollStar.view.poll_detail.PollDetails',
        'PollStar.view.PieChart'
    ],
    config: {
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
        record: null,
        cls: 'poll-detail-container',
        /*items: [{
            xtype: 'piechart'
        }],*/
        //scrollable: 'vertical'
    },
    initialize: function() {
        var me = this;
        //me.populateConfig();
        //me.addItems();
        me.callParent(arguments);
        var results = me.getRecord().get('results');
        if (!Ext.isEmpty(results)) {
            var piechart = Ext.create('PollStar.view.PieChart', {
                chartData: results
            });
            me.add(piechart);
        }
        
        var pollDetails = Ext.create('PollStar.view.poll_detail.PollDetails', {
            record: me.getRecord()
        });
        me.add(pollDetails);
    }
});