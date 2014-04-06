Ext.define('PollStar.util.ImageUpload', {
    singleton: true,
    requires: [
        'PollStar.util.PollData'
    ],
    uploadFile: function(poll_data, base64Img, image_name, callback) {
        var me = this;
        //console.log(image_uri);
        var file = new Parse.File(Parse.User.current().id+".jpg", {
            base64: base64Img
        });
        file.save().then(function() {
            console.log("Success saving image", file.name());
            poll_data.image = file;
            PollStar.util.PollData.submitPoll(poll_data, callback);
        }, function(error) {
            console.log("Error Saving Image", error);
            callback.failure();
        });
        //PollStar.util.PollData.submitPoll(poll_data, callback);
    }
});