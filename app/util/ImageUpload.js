Ext.define('PollStar.util.ImageUpload', {
    singleton: true,
    requires: [
        'PollStar.util.PollData'
    ],
    uploadFile: function(poll_data, image_uri, image_name, callback) {
        var me = this;
        //console.log(image_uri);
        me.convertImgToBase64(image_uri, function(base64Img) {
            //c//onsole.log(base64Img);
            var file = new Parse.File("PranavR.jpg", {
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
        });
        //PollStar.util.PollData.submitPoll(poll_data, callback);
    },
    convertImgToBase64: function(url, callback, outputFormat) {
        /*var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            canvas.height = 240;
            canvas.width = 320;
            ctx.drawImage(img, 0, 0, 320, 240);
            var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
            callback.call(this, dataURL);
            // Clean up
            canvas = null;
        };
        img.src = url;*/
        /*canvasResize(url, {
            width: 640,
            height: 0,
            crop: false,
            quality: 80,
            //rotate: 90,
            callback: function(data, width, height) {
                console.log(data, width, height);
                callback(data);
            }
        });*/
        /*loadImage(
            url,
            function (img) {
                var imgData = img.toDataURL("image/jpeg");
                callback(imgData);
            },
            {maxWidth: 640, maxHeight: 480, canvas: true}
        );*/
        callback(url);
    }
});