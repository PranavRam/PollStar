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
            photoLibraryButton: 'button[action=activatePhotoLibrary]',
            navToUsersBtn: 'button[action=navToUsers]',
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

                    function fail(message) {
                        alert("Failed: " + message);
                    }
                    navigator.camera.getPicture(me.imagePicked, fail, {
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

                    function fail(message) {
                        alert("Failed: " + message);
                    }

                    navigator.camera.getPicture(me.imagePicked, fail, {
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
    switchToAddPollView: function(image_uri) {
        var me = this;
        var addPollView = Ext.create("PollStar.view.AddPoll");
        var addPollViewImage = me.getAddPollViewImage();
        Ext.Viewport.add(addPollView);
        //addPollViewImage.setSrc("data:image/jpeg;base64," + image_data);
        addPollViewImage.setSrc(image_uri);
        console.log('in switching');
        addPollView.show();
    },
    imagePicked: function(image_uri) {
        console.log('Success Image Select 1');
        //PollStar.util.ImageUpload.uploadFile(image_uri, 'Johnny Cash.jpg');
        me.switchToAddPollView(image_uri);
    }
});