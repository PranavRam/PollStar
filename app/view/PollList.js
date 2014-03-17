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
            hidden: true,
            //docked: 'top',
            placeHolder: 'Search'
        }]
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        console.log('init');
        var me = this;
        me.setItemTpl(Ext.select('#tpl_poll_list').elements[0].innerHTML);
        me.setStore('pollsStore');
        me.callParent(arguments);
        //me.refresh();
        //me.setListScroller();
    },
    setListScroller: function() {
        console.log('in scroller');
        var me = this;
        //me.down('searchfield').setHidden(false);
        console.log(me.getScrollable().getScroller());
        //debugger;
        me.getScrollable().getScroller().scrollTo(0, 45);
    }
});