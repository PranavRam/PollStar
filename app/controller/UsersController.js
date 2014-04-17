Ext.define('PollStar.controller.UsersController', {
    extend: 'Ext.app.Controller',
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
            usersList: 'usersList',
            tBarSpinner: 'tbarspinner[action=friends]'
            //loginButton: 'button[itemId=loginButton]',
        },
        control: {
            usersList: {
                itemtap: function(list, index, target, record, e, eOpts) {
                    //console.log(index, record, e.target, target);
                    //targetGlobal = target;
                    //e.preventDefault();
                    //console.log(target);
                    var me = this;
                    var tBarSpinner = me.getTBarSpinner();
                    if (e.getTarget('[data-icon="+"]')) {
                        // console.log("Add record", record.get('objectId'));
                        console.log('again and again');
                        var el = Ext.get(e.getTarget()).down('.icon-right');
                        el.set({"data-icon": '2'});
                        tBarSpinner.setHidden(false);
                        Parse.Cloud.run('friendRequest', { userId: record.get('objectId')}, {
                            success: function(result) {
                                console.log(result);
                                var friendsStore = Ext.getStore('friendsStore');
                                var usersStore = Ext.getStore('usersStore');
                                friendsStore.load({
                                    callback: function() {
                                        usersStore.load({
                                            callback: function(records, opt, success) {
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
                                                    }
                                                    else {
                                                        record.set('isFriend', '+');
                                                    }
                                                });
                                                tBarSpinner.setHidden(true);
                                            }
                                        })
                                    }
                                });
                            },
                            error: function(error) {
                                tBarSpinner.setHidden(true);
                                el.set({"data-icon": '+'});
                                console.log(error);
                            }
                        });
                        return false;
                    }
                }
            }
        }
    }
});