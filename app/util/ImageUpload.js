Ext.define('PollStar.util.ImageUpload', {
    singleton: true,
    uploadFile: function(image_uri, image_name) {
        var me = this;
        me.convertImgToBase64(image_uri, function(base64Img) {
        		var file = new Parse.File("Pranav.jpg", { base64: base64Img });
        		file.save().then(function(){
        			console.log("Success saving image", file.name());
        		}, function(error){
        			console.log("Error Saving Image", error);
        		});
        });
    },
    convertImgToBase64: function(url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
            callback.call(this, dataURL);
            // Clean up
            canvas = null;
        };
        img.src = url;
    }
});