Ext.define('PollStar.view.AddPoll', {
    extend: 'Ext.navigation.View',
    xtype: 'addPollView',
    requires: [,
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Slider',
        'Ext.Img',
        'Ext.SegmentedButton',
        'PollStar.view.PollImage',
        'Ext.field.Hidden'
    ],
    config: {
        // layout: 'vbox',
        //fullscreen: true,
        hidden: 'true',
        showAnimation: {
            type: 'slideIn',
            duration: 300,
            direction: 'down'
        },

        hideAnimation: {
            type: 'slideOut',
            duration: 200,
            direction: 'down'
        },
        navigationBar: {
            docked: 'top',
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'button',
                text: 'Cancel',
                action: 'cancelAddPoll'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'Next',
                action: 'nextPollData'
            }, {
                xtype: 'button',
                text: 'Add',
                action: 'addPoll',
                hidden: true
            }]
        },
        items: [{
            // layout: 'vbox',
            cls: 'add-poll-container',
            scrollable: 'vertical',
            //cls: 'flexboxDiv',
            items: [{
                xtype: 'pollimage',
                // flex: 1,
                height: 240,
                itemId: 'addPollImage',
                cls: 'pollImage',
                //style: 'background-color: RGB(234, 244, 246)',
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
                    }
                }
            }, {
                xtype: 'formpanel',
                cls: 'addPollForm',
                itemId: 'addPollForm',
                // flex: 2,
                scrollable: null,
                items: {
                    xtype: 'fieldset',
                    //title: 'Poll Questions',
                    itemId: 'pollQuestionsFieldset',
                    defaults: {
                        labelWrap: true
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'question',
                        placeHolder: 'Question',
                        cls: 'question'
                        //label: 'Question'
                    }, {
                        xtype: 'label',
                        html: 'Options Count',
                        //align: 'center',
                        //margin: '5px auto 0 auto',
                        height: '30px',
                        style: 'text-align: center; padding: 0.5em;',
                        cls: 'add-options-label'
                    }, {
                        xtype: 'sliderfield',
                        //label: 'Option Count',
                        minValue: 2,
                        maxValue: 5,
                        value: 2,
                        //style: 'background-color: RGB(234, 244, 246)',
                        cls: 'add-options-slider'
                    }, {
                        xtype: 'textfield',
                        name: 'options',
                        data: 1,
                        placeHolder: 'Option 1',
                        action: 'optionsSlider',
                        cls: 'options-input'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'id',
                        value: 1,
                        data: 1
                    }, {
                        xtype: 'textfield',
                        name: 'options',
                        data: 2,
                        placeHolder: 'Option 2',
                        action: 'optionsSlider',
                        cls: 'options-input'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'id',
                        value: 2,
                        data: 2
                    }, {
                        xtype: 'segmentedbutton',
                        docked: 'bottom',
                        cls: 'poll-end-button',
                        style: 'padding-bottom: 1em;',
                        layout: {
                            pack: 'center'
                        },
                        items: [{
                            text: '3 Hours',
                            data: 3,
                            pressed: true
                        }, {
                            text: '6 Hours',
                            data: 6
                        }, {
                            text: '12 Hours',
                            data: 12
                        }, {
                            text: '1 Day',
                            data: 24
                        }]
                    }, {
                        xtype: 'label',
                        html: 'Poll End Time',
                        docked: 'bottom',
                        //align: 'center',
                        //margin: '5px auto 0 auto',
                        height: '30px',
                        style: 'text-align: center; padding: 0.5em;',
                        cls: 'poll-end-label'
                    }]
                }
            }]
        }]
    }
});