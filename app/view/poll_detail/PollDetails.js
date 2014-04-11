Ext.define('PollStar.view.poll_detail.PollDetails', {
    extend: 'Ext.Container',
    xtype: 'polldetails',
    requires: [
        'PollStar.view.PollImage',
        //'Ext.Img',
        'PollStar.view.components.ImageMask',
        'Ext.field.Radio'
    ],
    config: {
        //layout: 'vbox',
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
        record: null,
        canVote: false,
        owner: false,
        cls: 'poll-detail-container',
        scrollable: 'vertical',
        // layout: 'fit'

    },
    initialize: function() {
        var me = this;
        me.populateConfig();
        me.addItems();
        me.callParent(arguments);
        var radiofields = Ext.ComponentQuery.query('radiofield');
        Ext.Array.forEach(radiofields, function(radiofield, index) {
            if (radiofield.isChecked())
                radiofield.addCls('checked');
        });
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
        items = [];
        var question_container = Ext.create('Ext.Container', {
            cls: 'poll-question',
            layout: 'hbox',
            width: window.screen.width,
            items: [{
                flex: 1,
                //xtype: 'container'
                //width: 48,
                cls: 'container',
                //height: 48,
                items: [{
                    xtype: 'image',
                    src: 'resources/images/pug_tn.jpg',
                    mode: 'image',
                    cls: 'image',
                    centered: true
                }]
            }, {
                flex: 5,
                cls: 'text',
                html: '<p class="poster">@Pranav Ram <span class="catch-line">asks</span></p><p class="question">' + me.getQuestion() + '</p>',
            }]
        });
        items.push(question_container);
        items.push({
            masked: {
                xtype: 'imagemask',
                message: 'loading image',
            },
            // height: 230,
            //width: window.screen.width,
            //layout: 'fit',
            //cls: 'poll-detail-image-background',
            items: [{
                xtype: 'pollimage',
                //flex: 1,
                height: 240,
                //width: window.screen.width,
                src: me.getImageUrl(),
                cls: 'pollImage',
                //mode: 'image',
                listeners: {
                    load: function(cmp) {
                        var img = Ext.get(cmp.element).down('img').dom;
                        //console.log(img.dom.naturalHeight, img.dom.naturalWidth);
                        var screenWidth = window.screen.width;
                        var screenHeight = window.screen.height;
                        var imgH = img.naturalHeight;
                        var imgW = img.naturalWidth;

                        if (imgW < imgH) {
                            cmp.setHeight((screenHeight / 2) - 24);
                        } else {
                            var height = screenWidth * (img.naturalHeight / img.naturalWidth);
                            cmp.setHeight(height);
                        }
                        cmp.up().setMasked(false);
                    }
                }
            }]
        });
        if(me.getOwner())
            me.prepareOwnerOptionsRadio(items);
        else
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
                //width: window.screen.width,
                name: 'vote',
                labelWidth: '85%',
                labelWrap: true,
                value: item,
                label: item,
                checked: (index == 0),
                cls: 'color-label',
                disabled: (!me.getCanVote()),
                listeners: {
                    check: function(radio_field, e, eOpts) {
                        //console.log(radiofield.up('formpanel').getValues());
                        var radiofields = Ext.ComponentQuery.query('radiofield');
                        Ext.Array.forEach(radiofields, function(radiofield, index) {
                            radiofield.removeCls('checked');
                        });
                        radio_field.addCls('checked');
                    }
                }
            }
            innerItems.push(item);
        });

        var formpanel = {
            xtype: 'formpanel',
            //flex: 1,
            cls: 'poll-detail-form',
            scrollable: null,
            items: [{
                xtype: 'fieldset',
                //html: 'Q. ' + me.getQuestion(),
                //instructions: 'Select an option and tap Vote',
                items: innerItems,
                cls: 'poll-detail-results-options'
            }]
        }
        items.push(formpanel);
        //return items;
    },
    prepareOwnerOptionsRadio: function(items) {
        var me = this;
        var options = me.getOptions();
        var innerItems = [];
        Ext.Array.forEach(options, function(item, index) {
            var item = {
                xtype: 'label',
                html: (index + 1) + '. ' + item,
                cls: 'options-label'
            }
            innerItems.push(item);
        });
        //items.push(me.prepareList());
        var formpanel = {
            xtype: 'formpanel',
            cls: 'poll-admin-form',
            scrollable: null,
            flex: 1,
            items: [{
                xtype: 'fieldset',
                // title: 'Options',
                items: innerItems,
            }],
            margin: '1em 0'
        }
        items.push(formpanel);
        //return items;
    },
});