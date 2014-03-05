Ext.define('PollStar.util.ImageUpload',{
	singleton: true,
	requires: [
	    'Ext.ux.parse.ParseAjax'
	],
	BASE64PREFIX: "data:image/jpeg;base64,",

	uploadFile: function(image_uri, image_name){
		var me = this;
		//image_data = me.BASE64PREFIX + image_data;
		//console.log(image_data);
		me.convertImgToBase64(image_data, function(base64Img){
			Ext.ux.parse.util.File.uploadDataURI(base64Img, image_name, 'image/jpeg', {
			    success: function(response) {
			        //var json = Ext.JSON.decode(response);
			        console.log('in success ' + response.responseText);
			        var data = response.responseText;
			        //me.addPointerToImage(data);

			    },
			    failure: function(response) {
			        //var jsonUp = Ext.JSON.decode(response);
			        console.log("failure upload image" + response.responseText);
			    }
			});
		});
	},
	convertImgToBase64: function(url, callback, outputFormat){
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			canvas.height = img.height;
			canvas.width = img.width;
		  	ctx.drawImage(img,0,0);
		  	var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
		  	callback.call(this, dataURL);
	        // Clean up
		  	canvas = null; 
		};
		img.src = url;
	}
});