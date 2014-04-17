Ext.define('PollStar.controller.LoginController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.view.Main',
        'PollStar.view.FriendsMain',
        'PollStar.store.Polls',
        'PollStar.store.Friends',
        'PollStar.store.Users',
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
            loginView: 'loginView',
            loginButton: 'button[itemId=loginButton]',
            pollList: 'pollList'
        },
        control: {
            loginButton: {
                tap: function(btn, e, eOpts) {
                    console.log('Hey in login tap');
                    var me = this;
                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Loading...'
                    });
                    me.logInUser();
                    //var friendsMainView = Ext.create('PollStar.view.FriendsMain');

                }
            }
        }
    },
    init: function(application) {
        var me = this;
        me.callParent(arguments);
        application.on('userLoggedIn', function() {
            console.log('authenticated');
            me.addStores();
        });
    },
    onAfterAnimate: function(itemToDestroy) {
        //console.log('destroy login', itemToDestroy);
        //Ext.Viewport.setMasked(false);
        Ext.Viewport.remove(itemToDestroy, true);
    },
    addStores: function() {
        var me = this;
        var pollListStore = Ext.create('PollStar.store.Polls', {
            listeners: {
                load: {
                    single: true,
                    fn: function(store, records, successful, operation, eOpts) {
                        //console.log(records);
                        var pollsVoted = JSON.parse(localStorage.getItem('pollsVoted'));

                        Ext.Array.forEach(records, function(record, index) {
                            var pollId = record.get('objectId');
                            //console.log(pollId, pollsVoted);
                            if (pollId in pollsVoted) {
                                console.log('voted');
                                record.set('voted', "voted");
                            }
                        });
                        //me.setCount(me.getCount + 1);

                        //if (me.getFirstLoad() !== 3) {
                        // me.setFirstLoad(me.getFirstLoad() + 1);
                        me.addMainViews();
                        //}
                    }
                }
            }
        });
        var friendsStore = Ext.create('PollStar.store.Friends', {
            listeners: {
                load: {
                    single: true,
                    scope: me,
                    fn: me.loadFriendsStore
                }
            }
        });
    },
    addFriendsMainView: function() {
        var me = this;
        //console.log('Count', me);
        //if (me.getCount() != 2) return;
        console.log('here');
        var friendsMainView = Ext.create('PollStar.view.FriendsMain');
        Ext.Viewport.insert(1, friendsMainView);
    },
    addMainViews: function() {
        var me = this;
        //if(me.getCount() != 3) return;

        var loginView = me.getLoginView();
        var mainView = Ext.create('PollStar.view.Main');
        if (loginView) {
            Ext.Viewport.on({
                activeitemchange: 'onAfterAnimate',
                scope: me,
                single: true,
                order: 'after',
                args: [loginView]
            });
            console.log('addMainViews');
            mainView.setShowAnimation(null);
            //mainView.show();
            Ext.Viewport.add(mainView);
            Ext.Viewport.animateActiveItem(mainView,
                me.getAnims().right
            );
        } else {
            Ext.fly('spinner').destroy();
            Ext.Viewport.add(mainView);
            // Ext.Viewport.setActiveItem(mainView);
        }
        //Ext.Viewport.add(mainView);
        //mainView.show();
        console.log('done');
    },
    logInUser: function() {
        var me = this;
        var logInFieldSet = Ext.ComponentQuery.query('formpanel[baseCls=login-panel]')[0];
        var logInValues = logInFieldSet.getValues();
        Parse.User.logIn(logInValues.userNameTextField, logInValues.passwordTextField, {
            success: function(user) {
                // Do stuff after successful login.
                var pollsVoted = user.get('pollsVoted');
                localStorage.setItem('pollsVoted', JSON.stringify(pollsVoted));
                Ext.ux.parse.data.ParseConnector._sessionToken = user.getSessionToken();
                me.addStores();
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
                console.log(user, error);
                Ext.Viewport.setMasked(false);
                setTimeout(function() {
                    Ext.Msg.alert("Login Error", error.message, Ext.emptyFn);
                }, 1);
            }
        });
    },
    loadFriendsStore: function(store, records, successful, operation, eOpts) {
        var me = this;
        //console.log(me);
        var usersStore = Ext.create('PollStar.store.Users', {
            listeners: {
                load: {
                    single: true,
                    scope: me,
                    fn: me.loadUsersStore
                }
            }
        });
    },
    loadUsersStore: function(store, records, successful, operation, eOpts) {
        var me = this;
        var friendsStore = Ext.getStore('friendsStore');
        //console.log('here in users store');
        Ext.Array.forEach(records, function(record, index) {
            //var user = record.get('objectId');
            //console.log(pollId, pollsVoted);
            //record.set('isFriend', '+');
            console.log(record.get('isFriend'), record);

            if (friendsStore.find('objectId', record.get('objectId')) > -1) {
                record.set('isFriend', '2');
                //store.sync();
            } else {
                record.set('isFriend', '+');
            }
        });
        me.addFriendsMainView();
    }
});