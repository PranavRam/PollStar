Ext.define('PollStar.view.Login', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Password',
        'Ext.Label',
        'Ext.Img'
    ],
    xtype: 'loginView',
    config: {
        title: 'Login',
        items: [{
            xtype: 'fieldset',
            title: 'Login Example',
            align: 'center',
            items: [{
                xtype: 'textfield',
                placeHolder: 'Username',
                itemId: 'userNameTextField',
                name: 'userNameTextField',
                required: true
            }, {
                xtype: 'passwordfield',
                placeHolder: 'Password',
                itemId: 'passwordTextField',
                name: 'passwordTextField',
                required: true
            }]
        }, {
            xtype: 'button',
            itemId: 'logInButton',
            ui: 'action',
            padding: '10px',
            text: 'Log In',
            margin: '10px 0 0 0'
        }]
    }
});