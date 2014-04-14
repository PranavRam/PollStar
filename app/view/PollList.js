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
        },
        loadingText: false
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        function dhm(t) {
            var cd = 24 * 60 * 60 * 1000,
                ch = 60 * 60 * 1000,
                d = Math.floor(t / cd),
                h = '0' + Math.floor((t - d * cd) / ch),
                m = '0' + Math.round((t - d * cd - h * ch) / 60000);
            //return [h.substr(-2), m.substr(-2)].join(':');
            var time = {};
            time.hours = h.substr(-2);
            time.minutes = m.substr(-2);
            return time;
        }
        console.log('init');
        var me = this;
        var tpl = new Ext.XTemplate(
            Ext.select('#tpl_poll_list').elements[0].innerHTML, {
                timeLeft: function(time) {
                    var timeDiff = new Date(time) - new Date();
                    if (timeDiff >= 0) {
                        var time = dhm(timeDiff);

                        /*hours = Ext.Date.format(
                            new Date(timeDiff), 
                            "G");*/
                        return '<div class="time"><div class="hour">'+time.hours+'h</div><div class="minutes">'+time.minutes+'m</div></div>';
                        // return '<div class="time">'+time+'</div>';
                    } else {
                        return '<div class="over"></div>';
                    }
                }
            });
        //console.log(tpl);
        me.setItemTpl(tpl);
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
        var votedParents = Ext.DomQuery.select('.votedParent');
        Ext.Array.forEach(votedParents, function(votes, index) {
            votes.classList.remove('votedParent');
        });
        var votedItems = Ext.DomQuery.select('.voted');
        Ext.Array.forEach(votedItems, function(votes, index) {
            var xListItem = Ext.get(votes).up('.x-list-item');
            /*if(!xListItem.hasCls('votedParent'))
                xListItem.addCls('votedParent');*/
            xListItem.dom.classList.add('votedParent');
        });
    }
});