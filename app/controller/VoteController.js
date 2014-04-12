Ext.define('PollStar.controller.VoteController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.util.PollData',
        'PollStar.view.AddPollFriendsList'
    ],
    config: {
        refs: {
            pollVoteView: 'polldetails',
            pollVoteOptions: 'polldetails formpanel',
            voteBtn: 'button[action=voteForPoll]',
            pollList: 'pollList'
        },
        control: {
            voteBtn: {
                tap: function(self, e, eOpts) {
                    var me = this;
                    var options = me.getPollVoteOptions();
                    var pollVoteView = me.getPollVoteView();
                    var pollList = me.getPollList();
                    var pollId = pollVoteView.getRecord().get('objectId');
                    var voteDetails = {
                        pollId: pollId,
                        vote: options.getValues().vote
                    }
                    console.log('tapped vote!', voteDetails);
                    Parse.Cloud.run('pollSubmit', voteDetails, {
                        success: function(result) {
                            console.log(result);
                            pollVoteView.getRecord().set('voted', "voted");
                            var pollsVoted = JSON.parse(localStorage.getItem('pollsVoted'));
                            pollsVoted[pollId] = options.getValues().vote;
                            localStorage.setItem('pollsVoted', JSON.stringify(pollsVoted));
                            pollList.findVoted();

                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                }
            }
        }
    }
})