Ext.define('PollStar.view.Login', {
    extend: 'Ext.Container',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Password',
        'Ext.Label',
        'Ext.Img',
        'Ext.form.Panel'
    ],
    xtype: 'loginView',
    config: {
        cls: 'login-view',
        layout: {
            type: 'vbox',
            //align: 'center'
        },
        title: 'Login',
        items: [{
            xtype: 'titlebar',
            title: 'PollStar',
            docked: 'top'
        }, {
            xtype: 'image',
            //mode: 'image',
            cls: 'circle-text',
            //width: 300,
            //height: 300,
            html: 'Your Photo',
            //src: 'resources/images/circle.png',
            flex: 3
        }, {
            xtype: 'formpanel',
            baseCls: 'login-panel',
            style: 'background-color: white;',
            flex: 3,
            items: [{
                xtype: 'fieldset',
                baseCls: 'login-fieldset',
                align: 'center',
                items: [{
                    xtype: 'textfield',
                    placeHolder: 'Username',
                    itemId: 'userNameTextField',
                    name: 'userNameTextField',
                    width: '85%',
                    margin: '0 auto',
                    required: true
                }, {
                    xtype: 'passwordfield',
                    placeHolder: 'Password',
                    itemId: 'passwordTextField',
                    name: 'passwordTextField',
                    width: '85%',
                    margin: '0 auto',
                    required: true
                }]
            }, {
                xtype: 'button',
                itemId: 'loginButton',
                cls: 'login-button',
                ui: 'action',
                //padding: '10px',
                text: 'Log In',
                width: '85%',
                margin: '10 auto'
            }]
        }, {
            xtype: 'container',
            margin: '0 0 5 0',
            flex: 1,
            items: [{
                xtype: 'label',
                html: 'Not a Member?',
                style: 'text-align: center;'
            }, {
                xtype: 'button',
                text: 'Register Here',
                width: '50%',
                margin: '5 auto'
            }]
        }]
    }
});