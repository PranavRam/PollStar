var el;
Ext.define('PollStar.view.poll_detail.Owner', {
    extend: 'Ext.Container',
    xtype: 'polldetailowner',
    requires: [
        'PollStar.view.PollImage',
        'PollStar.view.components.ImageMask'
    ],
    config: {
        //layout: 'vbox',
        //layout: 'fit',
        scrollable: 'vertical',
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
        votedList: null,
        record: null,
        cls: 'poll-detail-container'
    },
    initialize: function() {
        var me = this;
        me.populateConfig();
        //me.addItems();
        me.callParent(arguments);
    },
    populateConfig: function() {
        var me = this;
        var record = me.getRecord();
        var imageUrl = record.get('image').url;
        var question = record.get('question');
        var options = record.get('options');

        me.setImageUrl(imageUrl);
        me.setQuestion(question);
        me.setOptions(options);
        me.setParticipants(record.get('participants'));
        me.setVotedList(record.get('friendsVoted'));
    },

    prepareList: function() {
        var me = this;
        return Ext.create('Ext.List', {
            //flex: 1,
            cls: 'poll-detail-participants',
            scrollable: null,
            itemTpl: new Ext.XTemplate(
                '<span class="icon" data-icon="{[this.hasVoted(values.objectId)]}"></span>{username}', {
                    hasVoted: function(name) {
                        //console.log(name);
                        if (Ext.Array.contains(me.getVotedList(), name))
                            return "2"
                        return ":";
                    }
                }

            ),
            data: me.getParticipants(),
            listeners: {
                painted: function() {
                    this.setHeight(this.itemsCount * this.getItemHeight());
                }
            }
        });
        //return list;
    }
});