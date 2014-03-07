Ext.define('PollStar.view.PollList', {
    extend: 'Ext.dataview.List',
    xtype: 'pollList',
    config: {
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            text: 'Load More...'
        }]
    },
    initialize: function(){
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.setItemTpl(Ext.select('#tpl_poll_list').elements[0].innerHTML);
        me.setStore('pollsStore');
        me.callParent(arguments);
        //me.refresh();
    }
});