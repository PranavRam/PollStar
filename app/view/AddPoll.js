Ext.define('PollStar.view.AddPoll', {
    extend: 'Ext.navigation.View',
    xtype: 'addPollView',
    requires: [,
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Slider',
        'Ext.Img'
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
                src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
                flex: 1,
                itemId: 'addPollImage'
            }, {
                xtype: 'formpanel',
                itemId: 'addPollForm',
                flex: 3,
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
                        label: 'Question'
                    }, {
                        xtype: 'sliderfield',
                        label: 'Option Count',
                        minValue: 2,
                        maxValue: 5,
                        value: 2
                    }, {
                        xtype: 'textfield',
                        name: 'options',
                        label: 'Option 1',
                        action: 'optionsSlider'
                    }, {
                        xtype: 'textfield',
                        name: 'options',
                        label: 'Option 2',
                        action: 'optionsSlider'
                    }]
                }
            }]
        }]
    }
});