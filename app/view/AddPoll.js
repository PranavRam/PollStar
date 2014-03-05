Ext.define('PollStar.view.AddPoll', {
    extend: 'Ext.Panel',
    xtype: 'addPollView',
    requires: [,
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Slider',
        'Ext.Img'
    ],
    config: {
        layout: 'vbox',
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
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Add Poll',
            items: [{
                xtype: 'button',
                text: 'Cancel',
                action: 'cancelAddPoll'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'Add',
                action: 'addPoll'
            }]
        }, {
            xtype: 'image',
            src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
            flex: 1,
            itemId: 'addPollImage'
        }, {
            xtype: 'formpanel',
            flex: 3,
            items: {
                xtype: 'fieldset',
                title: 'Poll Questions',
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
                    name: 'option1',
                    label: 'Option 1'
                }, {
                    xtype: 'textfield',
                    name: 'option2',
                    label: 'Option 2'
                }]
            }
        }]
    }
});