Ext.define('PollStar.view.PollList', {
    extend: 'Ext.dataview.List',
    xtype: 'pollList',
    config: {
        itemTpl: document.getElementById('tpl_poll_list').innerHTML,
        store: 'pollsStore',
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            text: 'Load More...'
        }]
    }
});