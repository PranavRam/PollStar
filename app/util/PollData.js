Ext.define('PollStar.util.PollData',{
	singleton: true,
	preparePollData: function(poll_data, friendsSelection){
		var friendsIds = [];
		friends = Ext.Array.map(friendsSelection, function(record, index){
			return record.get('objectId');
		});
		console.log(friends);
		return poll_data;
	},
	submitPoll: function(poll_data){
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
	}
});