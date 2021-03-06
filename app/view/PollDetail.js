var css_style;
Ext.define('PollStar.view.PollDetail', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Img',
        'Ext.form.Panel',
        'Ext.field.Radio',
        'Ext.form.FieldSet',
        'Ext.Carousel',
        'PollStar.view.PieChart'
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
        //console.log(me.getImageUrl());
        me.populateConfig();
        me.addItems();
        //var record = me.getRecord();
        //var imageUrl = record.get('image').url;
        //me.add({xtype: 'piechart', cls: 'poll-detail-chart-background'});
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
            xtype: 'carousel',
            flex: 2,
            masked: {
                xtype: 'loadmask',
                message: 'loading',
            },
            items: [{
                cls: 'poll-detail-image-background',
                items: [{
                    xtype: 'image',
                    src: me.getImageUrl(),
                    cls: 'poll-detail-image',
                    listeners: {
                        load: function() {
                            console.log('loaddd');
                            //Ext.Viewport.setMasked(false);
                            this.up('carousel').setMasked(false);
                        },
                        tap: function() {
                            console.log('tapped');
                        }
                    }
                }]
            }, {
                xtype: 'piechart',
                cls: 'poll-detail-chart-background',
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
                value: item,
                label: item,
                checked: (index == 0)
            }
            innerItems.push(item);
        });
        var btn = Ext.create('Ext.Button', {
            text: 'Vote',
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