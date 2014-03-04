Ext.define('PollStar.controller.LandingPageController', {
    extend: 'Ext.app.Controller',
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
                        alert("Success: ");
                    }

                    function fail(message) {
                        alert("Failed: " + message);
                    }
                    navigator.camera.getPicture(success, fail, {
                        quality: 75,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    });
                    //console.log('Camera Bitcheszzz');
                }
            }
        }
    }
});