Ext.define('PollStar.util.PollData', {
    singleton: true,
    requires: [
        //'Ext.ux.parse.ParseAjax'
    ],
    _getEndTime: function(timeToAdd){
        var currentDate = new Date();
        var endTime = currentDate.setHours(currentDate.getHours() + timeToAdd);
        console.log(endTime);
        return new Date(endTime);
    },
    preparePollData: function(poll_data, timeToAdd, friendsSelection) {
        var me = this;
        var friends = [];
        friends = Ext.Array.map(friendsSelection, function(record, index) {
            var friend = Parse.Object("User");
            friend.id = record.get('objectId');
            return friend;
        });
        /*var owner = Parse.Object("User");
        owner.id = "UO2sjYOKjp";*/
        poll_data.owner = Parse.User.current();
        poll_data.participants = friends;
        poll_data.endTime = me._getEndTime(timeToAdd);
        return poll_data;
    },
    submitPoll: function(poll_data, callback) {
        var Poll = Parse.Object.extend('Poll');
        var poll = new Poll();
        //var relation = poll.relation("participants");

        poll.set('question', poll_data.question);
        poll.set('options', poll_data.options);
        poll.set('image', poll_data.image);
        poll.set('owner', poll_data.owner);
        poll.set('participants', poll_data.participants);
        poll.set('endTime', poll_data.endTime);
        poll.set('friendsVoted', []);
        poll.set('results', []);
        //relation.add(poll_data.participants);
        poll.save().then(function() {
            callback.success.call();
        }, function(error) {
            callback.failure.call();
        });
        //callback.success.call();

    }
    /*,
    submitPollAjax: function(poll_data) {
        Ext.ux.parse.ParseAjax.request({
            url: '/classes/Poll',
            jsonData: poll_data,
            success: function(response) {
                //var jsonUp = Ext.JSON.decode(response);
                console.log('Success ' + response.responseText);
                //alert('success');
            },
            failure: function(response) {
                //var jsonUp = Ext.JSON.decode(response);
                console.log('Failed ' + response.responseText);
                //alert('failure');
            }
        });
    },
    preparePollDataAjax: function(poll_data, friendsSelection) {
        var friends = [];
        friends = Ext.Array.map(friendsSelection, function(record, index) {
            //var friend = Parse.Object("User");
            //friend.id = record.get('objectId');
            var friend = {
                "__type": "Pointer",
                "className": "_User",
                "objectId": record.get('objectId')
            }
            return friend;
        });
        poll_data.participants = {
            "__op": "AddRelation",
            "objects": friends
        }
        //var owner = Parse.Object("User");
        var owner = {
            "__type": "Pointer",
            "className": "_User",
            "objectId": "UO2sjYOKjp"
        }
        //owner.id = "UO2sjYOKjp";
        poll_data.owner = owner;
        //poll_data.participants = friends
        console.log(poll_data);
        return poll_data;
    }*/
});