Ext.define('PollStar.controller.LogoutController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.view.Login'
    ],
    config: {
        anims: {
            right: {
                type: 'slide',
                direction: 'left'
            },
            left: {
                type: 'slide',
                direction: 'right'
            },
            flip: {
                type: 'flip',
                duration: 300,
                direction: 'right'
            }
        },
        refs: {
            settingsBtn: 'button[action=settings]'
        },
        control: {
            settingsBtn: {
                tap: function(self, e, eOpts) {
                    //self.setHidden(true);
                    var me = this;
                    Parse.User.logOut();
                    var loginView = Ext.create('PollStar.view.Login');
                    Ext.Viewport.on({
                        activeitemchange: 'onAfterAnimate',
                        scope: me,
                        single: true,
                        order: 'after',
                        args: [loginView]
                    });
                    Ext.Viewport.add(loginView);
                    Ext.Viewport.animateActiveItem(loginView,
                        me.getAnims().left
                    );
                }
            }
        }
    },
    onAfterAnimate: function(itemToSave) {
        //console.log('destroy login', itemToDestroy);
        //Ext.Viewport.setMasked(false);
        var items = Ext.Viewport.getItems().items;
        var length = items.length;
        for (i = length - 1; i >= 0; i--) {
            if (items[i] != itemToSave) {
                Ext.Viewport.remove(items[i], true);
            }
        }
        /*Ext.Viewport.getItems().items.forEach(function(item) {
            console.log(item);
            if (item != itemToSave) {
                Ext.Viewport.remove(item, true);
            }
        });*/
        Ext.StoreManager.destroy();
    }
})