Ext.define('PollStar.view.poll_detail.Results', {
    extend: 'Ext.Carousel',
    xtype: 'polldetailresults',
    config: {
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
        record: null,
        layout: 'fit',
        cls: 'poll-detail-image-background',
        items: [{
            xtype: 'piechart'
        }]
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
                cls: 'poll-detail-chart-background',
                flex: 1,
                items: [{
                    xtype: 'image',
                    src: me.getImageUrl(),
                    cls: 'poll-detail-image',
                    listeners: {
                        load: function() {
                            console.log('loaddd');
                            //Ext.Viewport.setMasked(false);
                            //this.up('carousel').setMasked(false);
                        },
                        tap: function() {
                            console.log('tapped');
                        }
                    }
                }]
        }, {
            xtype: 'label',
            html: 'Q. ' + me.getQuestion(),
            //margin: '5px auto 0 auto',
            height: '36px',
            style: 'text-align: center; padding: 0.5em; background-color: RGB(234, 244, 246)'
        }];
        me.prepareOptionsRadio(items);
        console.dir(items)
        var container = Ext.create('Ext.Container',{
        	layout: 'vbox',
        	items: items
        })
        me.add(container);
    },
    prepareOptionsRadio: function(items) {
        var me = this;
        var options = me.getOptions();
        var innerItems = [];
        Ext.Array.forEach(options, function(item, index) {
            var item = {
                xtype: 'label',
                cls: 'poll-detail-results-label',
                html: item
            }
            innerItems.push(item);
        });
        var formpanel = {
            xtype: 'formpanel',
            flex: 1,
            items: [{
                xtype: 'fieldset',
                title: 'Options',
                items: innerItems,
                cls: 'poll-detail-results-options'
            }]
        }
        items.push(formpanel);
        //return items;
    }
});