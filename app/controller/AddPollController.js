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
			pollQuestionsFieldset: 'formpanel #pollQuestionsFieldset',
			pollQuestionsOptionsCount: 'sliderfield',
			addPollFriendsList: 'addPollFriendsList'
		},
		control: {
			cancelAddPollBtn: {
				tap: function(self, e, eOpts){
					var me = this;
					var addPollView = me.getAddPollView();
					addPollView.onAfter('hide', function(){
						console.log('say bye');
						Ext.Viewport.remove(addPollView, true);
					});
					addPollView.hide();
				}
			},
			nextPollDataBtn: {
				tap: function(self, e, eOpts){
					var me = this;
					me.getAddPollView().push(Ext.create("PollStar.view.AddPollFriendsList"));
				}
			},
			addPollBtn: {
				tap: function(self, e, eOpts){
					var me = this;
					var pollForm = me.getPollForm();
					var addPollFriendsList = me.getAddPollFriendsList();
					var pollDataHelper = PollStar.util.PollData;
					var poll_data = pollDataHelper.preparePollData(pollForm.getValues(), 
						addPollFriendsList.getSelection());
					pollDataHelper.submitPoll(poll_data);

				}
			},
			addPollView: {
				show: function(self, eOpts){
					console.log('show view', self);
				},
				hide: function(self, eOpts){
					console.log('hide view', self, eOpts);
					//Ext.Viewport.remove(self, true);
				},
				activeitemchange: function(self, value, oldValue, eOpts){
					//console.log('activeitemchange', self, value, oldValue);
					if(value != 0){
						var me = this;
						me.getAddPollBtn().show();
						me.getNextPollDataBtn().hide();
					}
				},
				back: function(self, eOpts){
					var me = this;
					me.getAddPollBtn().hide();
					me.getNextPollDataBtn().show();
				},
				pop: function(navView, view, eOpts){
					//view.destroy();
				}
			},
			addPollFriendsList: {
				selectionchange: function(list, records, eOpts){
					//console.log(list.getSelectionCount());
				}
			},
			pollQuestionsOptionsCount: {
				change: function( me, sl, thumb, newValue, oldValue, eOpts ){
					//console.log(newValue);
					var me = this;
					var pollQuestionsFS = me.getPollQuestionsFieldset();
					if(oldValue < newValue){
						var numToAdd = newValue - oldValue;
						var optionsArr = [];
						for(var i = 0; i < numToAdd; i++){
							var options = {
								xtype: 'textfield',
								name: 'options',
								label: 'Option '+(i+oldValue+1),
								action: 'optionsSlider'
							}
							optionsArr.push(options);
						}
						pollQuestionsFS.add(optionsArr);
						console.log('Need to add a few');
					}
					else{
						//console.log('Need to remove a few');
						//console.log(Ext.ComponentQuery.query('textfield[action=optionsSlider]'));
						var optionsSliderArray = Ext.ComponentQuery.query('textfield[action=optionsSlider]');
						var optionsSliderArrayLength = optionsSliderArray.length;
						var numToRemove = oldValue - newValue;
						for(var i = 0; i < numToRemove; i++){
							var optionsSliderToRemove = optionsSliderArray[optionsSliderArrayLength - 1 - i];
							pollQuestionsFS.remove(optionsSliderToRemove, true);
						}
						//console.log(Ext.ComponentQuery.query('textfield[action=optionsSlider]'));
					}
				}
			}
		}
	}
})