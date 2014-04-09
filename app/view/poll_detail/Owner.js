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
            xtype: 'pollimage',
            //flex: 1,
            height: 240,
            src: me.getImageUrl(),
            cls: 'pollImage',
            listeners: {
                load: function(cmp) {
                    console.log('image loaded!');
                    //var imgContainer = cmp.up('#imageContainer')
                    //if (imgContainer) {
                        //console.log(imgContainer);
                        var img = Ext.get(cmp.element).down('img');
                        //console.log(img.dom.naturalHeight, img.dom.naturalWidth);
                        var screenWidth = window.screen.width;
                        var height = screenWidth * (img.dom.naturalHeight / img.dom.naturalWidth);
                        //height = Math.round(height / 10) * 10;
                        console.log(height);

                        cmp.setHeight(height);
                    //}
                    cmp.up().setMasked(false);
                }
            }
        }];

        var itemsList = [];
        var label2 = {
            xytpe: 'label',
            html: 'Participants',
            //margin: '5px auto 0 auto',
            height: '36px',
            style: 'text-align: center; padding: 0.5em;'
        };
        //itemsList.push(label2);
        //itemsList.push(me.prepareList());

        me.prepareOptionsRadio(itemsList);
        //console.log(items, itemsList);
        var container1 = Ext.create('Ext.Container', {
            //flex: 1,
            //layout: 'fit',
            //height: '240px',
            itemId: 'imageContainer',
            items: items,
            masked: {
                xtype: 'imagemask',
                message: 'loading image',
            }
        })
        var label1 = Ext.create('Ext.Label', {
            html: 'Q. ' + me.getQuestion(),
            //margin: '5px auto 0 auto',
            //height: '36px',
            //maxHeight: '72px',
            //flex: 1,
            cls: 'poll-detail-question'
        });
        var container2 = Ext.create('Ext.Container', {
            //flex: 1,
            //layout: 'vbox',
            //layout: 'fit',
            items: itemsList,
            //cls: 'poll-detail-container'
        });
        me.add([container1, container2]);
    },
    prepareOptionsRadio: function(items) {
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
                title: 'Q. ' + me.getQuestion(),
                // title: 'Options',
                items: innerItems,
            }]
        }
        items.push(formpanel);
        //return items;
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