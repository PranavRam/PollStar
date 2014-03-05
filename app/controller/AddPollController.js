Ext.define('PollStar.controller.AddPollController', {
	extend: 'Ext.app.Controller',
	requires: [
		'PollStar.util.PollData'
	],
	config: {
		refs: {
			addPollView: 'addPollView',
			cancelAddPollBtn: 'button[action=cancelAddPoll]',
			addPollBtn: 'button[action=addPoll]',
			pollForm: 'formpanel[itemId=addPollForm]',
			pollQuestionsFieldset: 'formpanel #pollQuestionsFieldset',
			pollQuestionsOptionsCount: 'sliderfield'
		},
		control: {
			cancelAddPollBtn: {
				tap: function(self, e, eOpts){
					var me = this;
					var addPollView = me.getAddPollView();
					addPollView.hide();
				}
			},
			addPollBtn: {
				tap: function(self, e, eOpts){
					var me = this;
					var pollForm = me.getPollForm();
					var pollDataHelper = PollStar.util.PollData;
					var poll_data = pollDataHelper.preparePollData(pollForm.getValues());
					pollDataHelper.submitPoll(poll_data);

				}
			},
			addPollView: {
				hide: function(self, eOpts){
					Ext.Viewport.remove(self, true);
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