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
        scrollable: {
            direction: 'vertical',
            directionLock: true
        }
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
        var textCmp = me.down('[cls=text]');
        var data = {question: me.getQuestion()};
        if(me.getOwner()){
            data.name = "You" 
            data.catch_line = "asked";
        }
        else{
            data.name = me.getRecord().get('owner').username
            data.catch_line = 'asks';
        }
        var tpl = new Ext.XTemplate(
            '<p class="poster">@{name} <span class="catch-line">{catch_line}</span></p>',
            '<p class="question">{question}</p>'
            );
        tpl.overwrite(textCmp.element, data);
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
                cls: 'text'            }]
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
        var pollsVoted = JSON.parse(localStorage.getItem('pollsVoted'));
        var pollId = me.getRecord().get('objectId');
        var options = me.getOptions();
        var innerItems = [];
        Ext.Array.forEach(options, function(item, index) {
            var radio = {
                xtype: 'radiofield',
                //width: window.screen.width,
                name: 'vote',
                labelWidth: '85%',
                labelWrap: true,
                value: item,
                label: item,
                checked: function(){
                    //console.log('checked here');
                    if(pollsVoted && pollsVoted[pollId])
                        return pollsVoted[pollId] == item;
                    else{
                        return (index == 0);
                    }
                }(),
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
            innerItems.push(radio);
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
            var radio = {
                xtype: 'label',
                html: (index + 1) + '. ' + item,
                cls: 'options-label'
            }
            innerItems.push(radio);
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