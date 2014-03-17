Ext.define('PollStar.controller.LandingPageController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.view.AddPoll',
        'Ext.util.DelayedTask'
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
            },
            flip: {
                type: 'flip',
                duration: 300,
                direction: 'right'
            }
        },
        refs: {
            cameraButton: 'button[action=activateCamera]',
            photoLibraryButton: 'button[action=activatePhotoLibrary]',
            navToUsersBtn: 'button[action=navToUsers]',
            addPollView: 'addPollView',
            addPollViewImage: 'image[itemId=addPollImage]',
            pollList: 'pollsList',
            friendsMainView: 'friendsMain'
        },
        control: {
            navToUsersBtn: {
                tap: function(btn, e, eOpts) {
                    var me = this;
                    var friendsMainView = me.getFriendsMainView();
                    Ext.Viewport.animateActiveItem(friendsMainView,
                        me.getAnims().right
                    );
                }
            },
            cameraButton: {
                tap: function(self, e, eOpts) {
                    var me = this;

                    function success(image_uri){
                      me.switchToAddPollView(image_uri);
                    }

                    function fail(message) {
                        alert("Failed: " + message);
                    }
                    /*navigator.camera.getPicture(me.imagePicked, fail, {
                        quality: 75,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.CAMERA
                    });*/
                    if (Ext.device) {
                        Ext.device.Camera.capture({
                            success: success,
                            failure: fail,
                            quality: 75,
                            destination: 'file',
                            source: 'camera',
                            encoding: 'jpg'
                        });
                    }
                }
            },
            photoLibraryButton: {
                tap: function(self, e, eOpts) {
                    var me = this;

                    function success(image_uri){
                      //console.log('image data',image_uri);
                      me.switchToAddPollView(image_uri);
                    }

                    function fail(message) {
                        alert("Failed: " + message);
                    }

                    /*navigator.camera.getPicture(me.imagePicked, fail, {
                        quality: 75,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    });*/
                    if (Ext.device) {
                        Ext.device.Camera.capture({
                            success: success,
                            failure: fail,
                            quality: 50,
                            destination: 'file',
                            source: 'library',
                            encoding: 'jpg'
                        });
                    }
                    //console.log(Ext.ux.parse.data.ParseConnector.getRequiredHeaders());
                    //console.log(Ext.ux.parse.util.File);
                    console.log('here in cam');
                    //me.switchToAddPollView();
                }
            }
        }
    },
    switchToAddPollView: function(image_uri) {
        //console.log('in switch', image_uri);
        var me = this;
        //console.log('before add poll');
        var addPollView = Ext.create("PollStar.view.AddPoll");
        //console.log(addPollView);
        //console.log('after add poll');
        var addPollViewImage = me.getAddPollViewImage();
        Ext.Viewport.add(addPollView);
        //Ext.Viewport.animateActiveItem(addPollView, me.getAnims().flip);
        //console.log('before setting iamge');
        //console.log(image_uri);
        //addPollViewImage.setSrc("data:image/jpeg;base64," + image_data);
        addPollViewImage.setSrc(image_uri);
        //console.log('in switching');
        addPollView.show();
    }
});