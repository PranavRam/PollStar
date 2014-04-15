Ext.define('PollStar.controller.AddPollController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.util.PollData',
        'PollStar.view.AddPollFriendsList',
        'PollStar.view.components.FriendsList'
    ],
    config: {
        refs: {
            addPollView: 'addPollView',
            cancelAddPollBtn: 'button[action=cancelAddPoll]',
            nextPollDataBtn: 'button[action=nextPollData]',
            addPollBtn: 'button[action=addPoll]',
            pollForm: 'formpanel[itemId=addPollForm]',
            addPollViewImage: 'image[itemId=addPollImage]',
            pollQuestionsFieldset: 'formpanel #pollQuestionsFieldset',
            pollQuestionsOptionsCount: 'sliderfield',
            endPollTimeBtn: 'addPollView segmentedbutton',
            addPollFriendsList: 'addPollFriendsList',
            pollList: 'pollList',
            tBarSpinner: 'tbarspinner',
            optionsField: 'textfield[action=optionsSlider]',
            addFriendsListModal: 'addfriendslist'
        },
        control: {
            'addPollView titlebar': {
                back: function(view, eOpts) {
                    var me = this;
                    me.getCancelAddPollBtn().show();
                }
            },
            cancelAddPollBtn: {
                tap: function(self, e, eOpts) {
                    var me = this;
                    var addPollView = me.getAddPollView();
                    addPollView.onAfter('hide', function() {
                        //console.log('say bye');
                        Ext.Viewport.remove(addPollView, true);
                    });
                    addPollView.hide();
                }
            },
            nextPollDataBtn: {
                tap: function(self, e, eOpts) {
                    var me = this;
                    me.getAddPollView().push(Ext.create("PollStar.view.AddPollFriendsList"));
                    me.getCancelAddPollBtn().hide();
                }
            },
            addPollBtn: {
                tap: function(self, e, eOpts) {
                    var me = this;
                    var addPollView = me.getAddPollView();
                    var segBtn = me.getEndPollTimeBtn();
                    var timeToAdd = segBtn.getPressedButtons()[0].getData();
                    var pollForm = me.getPollForm();
                    var addPollFriendsList = me.getAddPollFriendsList();
                    var addPollViewImage = me.getAddPollViewImage();
                    var pollList = me.getPollList();
                    var tBarSpinner = me.getTBarSpinner();
                    //var pollDataHelper = PollStar.util.PollData;
                    postCompleted = {
                        success: function() {
                            console.log('Fiished posting');
                            /*addPollView.onAfter('hide', function() {
                                console.log('say bye');
                                Ext.Viewport.remove(addPollView, true);
                            });
                            addPollView.hide();*/
                            Ext.getStore('pollsStore').load({
                                callback: function(records, operation, success) {
                                    console.log('loaded back');
                                    var pollsVoted = JSON.parse(localStorage.getItem('pollsVoted'));

                                    Ext.Array.forEach(records, function(record, index) {
                                        var pollId = record.get('objectId');
                                        //console.log(pollId, pollsVoted);
                                        if (pollId in pollsVoted) {
                                            console.log('voted');
                                            record.set('voted', "voted");
                                        }
                                    });
                                    pollList.findVoted();
                                }
                            });
                            tBarSpinner.setHidden(true);

                        },
                        failure: function() {
                            tBarSpinner.setHidden(true);
                            Ext.Msg.alert('Error', 'failed post', Ext.emptyFn)
                            console.log('Problem posting');
                        }
                    }
                    var poll_data = PollStar.util.PollData.preparePollData(pollForm.getValues(),
                        timeToAdd,
                        addPollFriendsList.getSelection());

                    //pollDataHelper.submitPoll(poll_data);
                    PollStar.util.ImageUpload.uploadFile(poll_data,
                        addPollViewImage.getSrc(), "", postCompleted);

                    addPollView.onAfter('hide', function() {
                        console.log('say bye');
                        Ext.Viewport.remove(addPollView, true);
                        tBarSpinner.setHidden(false);
                    });
                    addPollView.hide();
                }
            },
            addPollView: {
                show: function(self, eOpts) {
                    //console.log('show view', self);
                },
                hide: function(self, eOpts) {
                    //console.log('hide view', self, eOpts);
                    //Ext.Viewport.remove(self, true);
                },
                activeitemchange: function(self, value, oldValue, eOpts) {
                    //console.log('activeitemchange', self, value, oldValue);
                    if (value != 0) {
                        var me = this;
                        me.getAddPollBtn().show();
                        me.getNextPollDataBtn().hide();
                    }
                },
                back: function(self, eOpts) {
                    var me = this;
                    me.getAddPollBtn().hide();
                    me.getNextPollDataBtn().show();
                },
                pop: function(navView, view, eOpts) {
                    //view.destroy();
                }
            },
            addPollFriendsList: {
                selectionchange: function(list, records, eOpts) {
                    //console.log(list.getSelectionCount());
                }
            },
            pollQuestionsOptionsCount: {
                change: function(me, sl, thumb, newValue, oldValue, eOpts) {
                    //console.log(newValue);
                    var me = this;
                    var pollQuestionsFS = me.getPollQuestionsFieldset();
                    if (oldValue < newValue) {
                        var numToAdd = newValue - oldValue;
                        var optionsArr = [];
                        for (var i = 0; i < numToAdd; i++) {
                            var options = {
                                xtype: 'textfield',
                                name: 'options',
                                placeHolder: 'Option ' + (i + oldValue + 1),
                                action: 'optionsSlider',
                                cls: 'options-input',
                                data: (i + oldValue + 1)
                            }
                            optionsArr.push(options);
                        }
                        pollQuestionsFS.add(optionsArr);
                        console.log('Need to add a few');
                    } else {
                        //console.log('Need to remove a few');
                        //console.log(Ext.ComponentQuery.query('textfield[action=optionsSlider]'));
                        var optionsSliderArray = Ext.ComponentQuery.query('textfield[action=optionsSlider]');
                        var optionsSliderArrayLength = optionsSliderArray.length;
                        var numToRemove = oldValue - newValue;
                        for (var i = 0; i < numToRemove; i++) {
                            var optionsSliderToRemove = optionsSliderArray[optionsSliderArrayLength - 1 - i];
                            pollQuestionsFS.remove(optionsSliderToRemove, true);
                        }
                        //console.log(Ext.ComponentQuery.query('textfield[action=optionsSlider]'));
                    }
                }
            },
            'viewport': {
                //capture the orientation change event
                orientationchange: 'onOrientationchange'
            },
            optionsField: {
                keyup: function(textfield, e, eOpts) {
                    var rx = /(^@|,$)/;
                    var value = textfield.getValue();
                    if (rx.test(value)) {
                        var name = value.substring(1);
                        var friendsList = Ext.Viewport.down('addfriendslist');
                        if (Ext.isEmpty(friendsList)) {
                            friendsList = Ext.create('PollStar.view.components.FriendsList');
                        }
                        friendsList.setTextfield(textfield);
                        friendsList.showBy(textfield, "br-tr?");
                    }
                    //console.log(rx.test(textfield.getValue()));
                    //console.log(textfield.getValue());


                },
                clearicontap: function(textfield, e, eOpts) {
                    var friendsList = Ext.Viewport.down('addfriendslist');
                    if (!Ext.isEmpty(friendsList)) {
                        friendsList.setHidden(true);
                    }
                },
                blur: function(textfield, e, eOpts){
                   /* var friendsList = Ext.Viewport.down('addfriendslist');
                    if (!Ext.isEmpty(friendsList)) {
                        friendsList.setHidden(true);
                    }*/
                }
            },
            addFriendsListModal: {
                itemtap: function(list, index, target, record, event) {
                    var focusedField = list.getTextfield();
                    var data = focusedField.getData();
                    var hiddenField = focusedField.up().down('hiddenfield[data='+data+']');
                    //console.log(focusedField);
                    focusedField.setValue('@'+record.get('username'));
                    hiddenField.setValue(record.get('objectId'));
                    list.hide();
                    return false;
                }
            }
        }
    }
})