Ext.define('PollStar.view.AddPoll', {
    extend: 'Ext.navigation.View',
    xtype: 'addPollView',
    requires: [,
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Slider',
        'Ext.Img',
        'Ext.SegmentedButton'
    ],
    config: {
        //layout: 'vbox',
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
            layout: 'vbox',
            items: [{
                xtype: 'image',
                src: 'resources/images/Moon.jpg',
                flex: 1,
                itemId: 'addPollImage'
            }, {
                xtype: 'formpanel',
                itemId: 'addPollForm',
                flex: 2,
                items: {
                    xtype: 'fieldset',
                    title: 'Poll Questions',
                    itemId: 'pollQuestionsFieldset',
                    defaults: {
                        labelWrap: true
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'question',
                        placeHolder: 'Question'
                        //label: 'Question'
                    }, {
                        xtype: 'label',
                        html: 'Options Count',
                        //align: 'center',
                        //margin: '5px auto 0 auto',
                        height: '30px',
                        style: 'text-align: center; padding: 0.5em; background-color: RGB(234, 244, 246)'
                    }, {
                        xtype: 'sliderfield',
                        //label: 'Option Count',
                        minValue: 2,
                        maxValue: 5,
                        value: 2,
                        style: 'background-color: RGB(234, 244, 246)'
                    }, {
                        xtype: 'textfield',
                        name: 'options',
                        // label: 'Option 1',
                        placeHolder: 'Option 1',
                        action: 'optionsSlider'
                    }, {
                        xtype: 'textfield',
                        name: 'options',
                        //label: 'Option 2',
                        placeHolder: 'Option 2',
                        action: 'optionsSlider'
                    },{
                        xtype: 'segmentedbutton',
                        docked: 'bottom',
                        style: 'background-color: RGB(234, 244, 246)',
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
                            text: '1 Day',
                            data: 24
                        }]
                    },{
                        xtype: 'label',
                        html: 'Poll End Time',
                        docked: 'bottom',
                        //align: 'center',
                        //margin: '5px auto 0 auto',
                        height: '30px',
                        style: 'text-align: center; padding: 0.5em; background-color: RGB(234, 244, 246)'
                    }]
                }
            }]
        }]
    }
});