Ext.define('PollStar.controller.AddPollController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.util.PollData',
        'PollStar.view.AddPollFriendsList'
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
            addPollFriendsList: 'addPollFriendsList'
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
                    //var pollDataHelper = PollStar.util.PollData;
                    postCompleted = {
                        success: function() {
                            console.log('Fiished posting');
                            addPollView.onAfter('hide', function() {
                                console.log('say bye');
                                Ext.Viewport.remove(addPollView, true);
                            });
                            addPollView.hide();

                        },
                        failure: function() {
                            alert('failed post')
                            console.log('Problem posting');
                        }
                    }
                    var poll_data = PollStar.util.PollData.preparePollData(pollForm.getValues(),
                        timeToAdd,
                        addPollFriendsList.getSelection());
                    //pollDataHelper.submitPoll(poll_data);
                    PollStar.util.ImageUpload.uploadFile(poll_data,
                        addPollViewImage.getSrc(), "", postCompleted);
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
                                cls: 'options-input'
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
            }
        },
        onOrientationchange: function(viewport, orientation, width, height){
            console.log(viewport, orientation, width, height);
            var me = this;
            var pollView = me.getAddPollView;
            pollView.getNavigationBar().setHidden(true);
            pollView.element.dom.style.setProperty('-webkit-transform', "rotate(90deg)");

        }
    }
})