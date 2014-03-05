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
            photoLibraryButton: 'button[action=activatePhotoLibrary]',
            addPollViewImage: 'image[itemId=addPollImage]'
        },
        control: {
            cameraButton: {
                tap: function(self, e, eOpts) {
                    var me = this;

                    function success(image_data) {
                        me.uploadImageToServer(image_data);
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
                    var me = this;

                    function success(image_uri) {
                        //me.uploadImageToServer(image_data);
                        //addPollViewImage.setSrc("data:image/jpeg;base64," + imageData);
                        me.switchToAddPollView(image_uri);
                        //PollStar.util.ImageUpload.uploadFile(image_data, 'Johnny Cash.jpg');
                    }

                    function fail(message) {
                        alert("Failed: " + message);
                    }

                    navigator.camera.getPicture(success, fail, {
                        quality: 75,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    });
                    //console.log(Ext.ux.parse.data.ParseConnector.getRequiredHeaders());
                    //console.log(Ext.ux.parse.util.File);
                    console.log('here in cam');
                    //success('yay')
                }
            }
        }
    },
    addPointerToImage: function(data) {
        Ext.ux.parse.ParseAjax.request({
            url: '/classes/Image',
            jsonData: data,
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
    switchToAddPollView: function(image_uri) {
        var me = this;
        var addPollView = Ext.create("PollStar.view.AddPoll");
        var addPollViewImage = me.getAddPollViewImage();
        Ext.Viewport.add(addPollView);
        //addPollViewImage.setSrc("data:image/jpeg;base64," + image_data);
        addPollViewImage.setSrc(image_uri);
        console.log('in switching');
        addPollView.show();
    }
});