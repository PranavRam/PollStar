var button, cmp;
Ext.define('PollStar.view.PollList', {
    extend: 'Ext.dataview.List',
    requires: [
        'PollStar.view.components.Search',
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'pollList',
    config: {
        /*masked: {
            xtype: 'loadmask',
            message: 'loading',
        },*/
        cls: 'poll-list',
        plugins: [{
            xclass: 'Ext.plugin.PullRefresh',
            pullText: 'Pull down to update!',
            releaseRefreshText: 'Retrieving data ',
            loadingText: 'Loading ...'
        }],
        /*items: [{
            xtype: 'seachpollstar',
            scrollDock: 'top'
        }],*/
        listeners: {
            painted: {
                order: 'before',
                single: true,
                fn: function(cmp) {
                    //console.log(Ext.DomQuery.select('.voted'));
                    var me = this;
                    me.findVoted();
                }
            }
        }
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        console.log('init');
        var me = this;
        me.setItemTpl(Ext.select('#tpl_poll_list').elements[0].innerHTML);
        me.setStore('pollsStore');
        //global_var = me.down('searchfield');
        /*me.down('searchfield').innerElement.onBefore('focus', function(button) {
            console.log('before focus search');
            console.log(button);
        });*/
        me.callParent(arguments);
        //me.refresh();
        //me.setListScroller();
    },
    setListScroller: function() {
        console.log('in scroller');
        var me = this;
        me.down('searchfield').setHidden(false);
        console.log(me.getScrollable().getScroller());
        //debugger;
        me.getScrollable().getScroller().scrollTo(0, 45);
    },
    findVoted: function() {
        var me = this;
        var votedItems = Ext.DomQuery.select('.voted');
        Ext.Array.forEach(votedItems, function(votes, index) {
            var xListItem = Ext.get(votes).up('.x-list-item');
            if(!xListItem.hasCls('votedParent'))
                xListItem.addCls('votedParent');
        });
    }
});