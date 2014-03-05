Ext.define('PollStar.view.PollList', {
    extend: 'Ext.dataview.List',
    xtype: 'pollList',
    config: {
        itemTpl: '<img src="http://www.sencha.com/assets/images/sencha-avatar-64x64.png" alt=""><div class="contact"><p>{question}</p><small><i>Tap to view</i></small></div>',
        store: 'pollsStore',
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            text: 'Load More...'
        }]
    }
});