Ext.define('PollStar.view.PollList', {
    extend: 'Ext.dataview.List',
    xtype: 'pollList',
    config: {
        itemTpl: '<div class="contact">{question}</strong></div>',
        store: 'pollsStore',
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            text: 'Load More...'
        }]
    }
});