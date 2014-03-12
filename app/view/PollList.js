Ext.define('PollStar.view.PollList', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.field.Search'
    ],
    xtype: 'pollList',
    config: {
        items: [{
            xtype: 'searchfield',
            scrollDock: 'top',
            //docked: 'top',
            placeHolder: 'Search'
        }]
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.setItemTpl(Ext.select('#tpl_poll_list').elements[0].innerHTML);
        me.setStore('pollsStore');
        //me.on('painted', me.setListScroller, me);
        me.callParent(arguments);
        //me.refresh();
    },
    setListScroller: function() {
        /*var me = this;
        me.down('searchfield').setHidden(false);
        console.log(me.getScrollable().getScroller());
        me.getScrollable().getScroller().scrollTo(0, 45);*/
    }
});