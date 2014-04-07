Ext.define('PollStar.view.poll_detail.Owner', {
    extend: 'Ext.Container',
    xtype: 'polldetailowner',
    requires: [
        'PollStar.view.PollImage'
    ],
    config: {
        layout: 'vbox',
        scrollable: 'vertical',
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
        votedList: null,
        record: null
    },
    initialize: function() {
        var me = this;
        me.populateConfig();
        me.addItems();
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
    addItems: function() {
        var me = this;
        //console.log(me.getImageUrl());
        var items = [{
            flex: 1,
            layout: 'fit',
            items: [{
                masked: {
                    xtype: 'loadmask',
                    message: 'loading',
                },
                layout: 'fit',
                cls: 'poll-detail-image-background',
                items: [{
                    xtype: 'pollimage',
                    //flex: 1,
                    src: me.getImageUrl(),
                    cls: 'pollImage',
                    listeners: {
                        load: function() {
                            console.log('loaddd');
                            //Ext.Viewport.setMasked(false);
                            this.up().setMasked(false);
                        }
                    }
                }]
            }]
        }, {
            xtype: 'label',
            html: 'Q. ' + me.getQuestion(),
            //margin: '5px auto 0 auto',
            height: '36px',
            style: 'text-align: center; padding: 0.5em; background-color: RGB(234, 244, 246)'
        }];
        me.prepareOptionsRadio(items);
        me.add(items);
    },
    prepareOptionsRadio: function(items) {
        var me = this;
        var options = me.getOptions();
        var innerItems = [];
        Ext.Array.forEach(options, function(item, index) {
            var item = {
                xtype: 'radiofield',
                labelWidth: '100%',
                labelWrap: true,
                label: item,
                readOnly: true,
                cls: 'radio-label'
            }
            innerItems.push(item);
        });
        items.push(me.prepareList());
        var formpanel = {
            xtype: 'formpanel',
            cls: 'poll-admin-form',
            scrollable: null,
            flex: 1,
            items: [{
                xtype: 'fieldset',
                title: 'Options',
                items: innerItems,
            }]
        }
        items.push(formpanel);
        return items;
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