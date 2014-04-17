Ext.define('PollStar.view.FriendsList', {
    extend: 'Ext.dataview.List',
    requires: [
        'PollStar.store.Friends',
        'Ext.field.Search'
    ],
    xtype: 'friendsList',
    config: {
        //store: 'friendsStore',
        //onItemDisclosure: true,
        cls: 'friends-list',
        plugins: [{
            xclass: 'Ext.plugin.PullRefresh',
            pullText: 'Pull down to update!',
            releaseRefreshText: 'Retrieving data ',
            loadingText: 'Loading ...'
        }],
        grouped: true,
        items: [{
            xtype: 'searchfield',
            scrollDock: 'top',
            //docked: 'top',
            placeHolder: 'Search',
            disabled: true,
            listeners: {
                blur: function() {
                    var me = this;
                    me.setDisabled(true);
                },
                painted: function(cmp) {
                    //console.log(cmp);
                    var me = this;
                    cmp.on('tap', function(e) {
                        console.log('before focus search');
                        var target = e.getTarget('.x-field-search');
                        if (target) {
                            console.log(target);
                            //console.log(button);
                            me.setDisabled(false);
                            me.focus();
                        }
                    });
                }
            },
            loadingText: false
        }]
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.setItemTpl(Ext.select('#tpl_friends_list').elements[0].innerHTML);
        me.setStore('friendsStore');
        me.callParent(arguments);
        //me.refresh();
    }
});