Ext.define('PollStar.view.UsersList', {
    extend: 'Ext.dataview.List',
    requires: [
        'PollStar.store.Users',
        'Ext.field.Search',
        'Ext.device.Contacts'
    ],
    xtype: 'usersList',
    config: {
        //store: 'usersStore',
        //grouped: true,
        loadingText: false,
        //onItemDisclosure: true,
        cls: 'user-list',
        items: [{
            xtype: 'searchfield',
            scrollDock: 'top',
            //docked: 'top',
            placeHolder: 'Search'
        }],
        listeners: {
            /*disclose: function(list, record, target, index, e, eOpts) {
                hello_div = e;
                console.log(index, record, e.target);
            },*/
            itemtouchstart: function(list, index, target, record, e, eOpts) {
                //console.log('itemtap start');
                var target = e.getTarget('[data-icon="+"]');
                if (target) {
                    Ext.get(target).addCls('addUser-button-pressed');
                    //console.log(target);
                }
            },
            itemtouchend: function(list, index, target, record, e, eOpts) {
                Ext.get(e.target).removeCls('addUser-button-pressed');
                //console.log(e.target);
                //target.down('[data-icon="U&"]').removeCls('x-button-pressed');
                //console.log(target.down('[data-icon="U&"]'));
            }
        }
    },
    initialize: function() {
        //console.log(PollStar.util.Templates.pollList());
        var me = this;
        me.callParent(arguments);

        //console.log('element', me.element);
        //me.setItemTpl(Ext.select('#tpl_user_list').elements[0].innerHTML);
        //me.setStore('usersStore');

        if (Ext.isEmpty(navigator.contacts)) {
            me.setItemTpl(Ext.select('#tpl_user_list').elements[0].innerHTML);
            me.setStore('usersStore');
        } else {
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;

            var fields = ["displayName", "phoneNumbers"];
            navigator.contacts.find(fields, function(contacts) {
                var data = [];
                for (var i = 0; i < contacts.length; i++) {
                    data.push({
                        name: contacts[i].displayName,
                        numbers: contacts[i].phoneNumbers
                    });
                }
                Ext.getStore('contactStore').setData(data)
                //alert(data[0].numbers[0].value);
                /*Ext.Viewport.add({
                        xtype: 'list',
                        itemTpl: '{name}',
                        store: {
                            fields: ['name'],
                            data: data
                        }
                    });*/
                me.setItemTpl('{name}');
                console.log('what before');
               /* me.setStore({
                    fields: ['name'],
                    data: data
                });*/
                me.setStore('contactStore');
                console('what');

            }, function(msg) {
                alert('onError: ' + msg);
            }, options);
        }
    },
    validateNumbers: function bPhoneNumberInArray(targetNum, numArray) {
        var targSanitized = targetNum.replace(/[^\d]/g, "")
            .replace(/^.*(\d{10})$/, "$1");
        //--- Choose a character that is unlikely to ever be in a valid entry.
        var arraySanitized = numArray.join('Á').replace(/[^\dÁ]/g, "") + 'Á';

        //--- Only matches numbers that END with the target 10 digits.
        return (new RegExp(targSanitized + 'Á')).test(arraySanitized);
    }
});