Ext.define('PollStar.view.poll_detail.Vote', {
    extend: 'Ext.Container',
    xtype: 'polldetailvote',
    requires: [
      'PollStar.view.PollImage'
    ],
    config: {
        layout: 'vbox',
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
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
        me.setOptions(options)
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
                name: 'vote',
                labelWidth: '80%',
                labelWrap: true,
                value: item,
                label: item,
                checked: (index == 0),
                cls: 'color-label'
            }
            innerItems.push(item);
        });
        var btn = Ext.create('Ext.Button', {
            text: 'Vote',
            cls: 'vote-button',
            action: 'voteForPoll'
        });
        innerItems.push(btn);
        var formpanel = {
            xtype: 'formpanel',
            flex: 1,
            items: [{
                xtype: 'fieldset',
                title: 'Options',
                instructions: 'Select an option and tap Vote',
                items: innerItems,
                cls: 'poll-detail-form'
            }]
        }
        items.push(formpanel);
        return items;
    }
});