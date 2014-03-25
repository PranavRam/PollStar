Ext.define('PollStar.controller.VoteController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.util.PollData',
        'PollStar.view.AddPollFriendsList'
    ],
    config: {
        refs: {
            pollVoteView: 'polldetailvote',
            pollVoteOptions: 'polldetailvote formpanel',
            voteBtn: 'button[action=voteForPoll]'
        },
        control: {
            voteBtn: {
                tap: function(self, e, eOpts) {
                    var me = this;
                    var options = me.getPollVoteOptions();
                    var pollVoteView = me.getPollVoteView();
                    var voteDetails = {
                        pollId: pollVoteView.getRecord().get('objectId'),
                        vote: options.getValues().vote
                    }
                    console.log('tapped vote!', voteDetails);
                    Parse.Cloud.run('pollSubmit', voteDetails, {
                        success: function(result) {
                            console.log(result)
                        },
                        error: function(error) {}
                    });
                }
            }            
        }
    }
})