Ext.define('PollStar.controller.LandingPageController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.ux.parse.util.File'
    ],
    config: {
        anims: {
            right: {
                type: 'slide',
                direction: 'left'
            },
            left: {
                type: 'slide',
                direction: 'right'
            }
        },
        refs: {
            cameraButton: 'button[action=activateCamera]',
            photoLibraryButton: 'button[action=activatePhotoLibrary]'
        },
        control: {
            cameraButton: {
                tap: function(self, e, eOpts) {
                    function success(image_uri) {
                        //var img = Ext.ComponentQuery.query("image")[0];
                        //img.setSrc(image_uri);
                        //alert("Success: ");
                    }

                    function fail(message) {
                        alert("Failed: " + message);
                    }
                    navigator.camera.getPicture(success, fail, {
                        quality: 75,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.CAMERA
                    });
                    //console.log('Camera Bitcheszzz');
                }
            },
            photoLibraryButton: {
                tap: function(self, e, eOpts) {
                    function success(image_uri) {
                        //console.log(this);
                        //console.log(image_uri);
                        /*var headers = Ext.ux.parse.data.ParseConnector.getRequiredHeaders();

                        Ext.Ajax.request({
                        	url: 'https://api.parse.com/1/classes/Image',
                        	jsonData: {
                        		"name": "Ram"
                        	},
                        	method: 'POST',
                        	headers: headers,
                        	success: function(response) {
                        	    //var jsonUp = Ext.JSON.decode(response);
                        	    console.log('Success ' + response.responseText);
                        	    alert('success');
                        	},
                        	failure: function(response) {
                        	    //var jsonUp = Ext.JSON.decode(response);
                        	    console.log('Failed ' + response);
                        	    alert('failure');
                        	}
                        });*/
                        /*Ext.ux.parse.ParseAjax.request({
                            url: '/classes/Image',
                            jsonData: {
                                "name": "don"
                            },
                            success: function(response) {
                                //var jsonUp = Ext.JSON.decode(response);
                                console.log('Success ' + response.responseText);
                                alert('success');
                            },
                            failure: function(response) {
                                //var jsonUp = Ext.JSON.decode(response);
                                console.log('Failed ' + response.responseText);
                                alert('failure');
                            }
                        });*/

                        //var currentController = PollStar.app.getController('LandingPageController');
                        //var imageBlob = currentController.b64toBlob(image_uri, 'image/jpeg');
                        //console.log('what', imageBlob);
                        console.log(image_uri);
                        image_uri = "data:image/jpeg;base64," + image_uri;
                        Ext.ux.parse.util.File.uploadDataURI(image_uri, 'dayum.jpg', 'image/jpeg', {
                            success: function(response) {
                                //var json = Ext.JSON.decode(response);
                                console.log('in success ' + response.responseText);
                                alert('bit');
                                Ext.ux.parse.ParseAjax.request({
                                    url: '/classes/Image',
                                    jsonData: {
                                        "name": "don"
                                    },
                                    success: function(response) {
                                        //var jsonUp = Ext.JSON.decode(response);
                                        console.log('Success ' + response.responseText);
                                        alert('success');
                                    },
                                    failure: function(response) {
                                        //var jsonUp = Ext.JSON.decode(response);
                                        console.log('Failed ' + response.responseText);
                                        alert('failure');
                                    }
                                });
                            },
                            failure: function(response) {
                                //var jsonUp = Ext.JSON.decode(response);
                                console.log("failure upload image" + response.responseText);
                            }
                        });

                    }

                    function fail(message) {
                        alert("Failed: " + message);
                    }

                    navigator.camera.getPicture(success, fail, {
                        quality: 75,
                        destinationType: navigator.camera.DestinationType.DATA_URL,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    });
                    //console.log(Ext.ux.parse.data.ParseConnector.getRequiredHeaders());
                    //console.log(Ext.ux.parse.util.File);
                    console.log('here in cam');
                }
            }
        }
    },
    b64toBlob: function(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, {
            type: contentType
        });
    }
});