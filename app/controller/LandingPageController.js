Ext.define('PollStar.controller.LandingPageController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.view.AddPoll',
        'PollStar.view.ImageSelectionSheet',
        'PollStar.view.PollDetail',
        'PollStar.view.poll_detail.Vote',
        'PollStar.view.poll_detail.Results',
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
            mainNavView: 'main',
            cameraButton: 'button[action=activateCamera]',
            addPollBtn: 'button[action=activateImageSelect]',
            photoLibraryButton: 'button[action=activatePhotoLibrary]',
            navToUsersBtn: 'button[action=navToUsers]',
            addPollView: 'addPollView',
            addPollViewImage: 'image[itemId=addPollImage]',
            pollList: 'pollList',
            friendsMainView: 'friendsMain',
            imageSelectionSheet: '#imageselectionsheet'
        },
        control: {
            addPollBtn: {
                tap: function(btn, e, eOpts) {
                    var actionSheet = this.getImageSelectionSheet();
                    if (!actionSheet) {
                        actionSheet = Ext.create('PollStar.view.ImageSelectionSheet');
                        Ext.Viewport.add(actionSheet);
                    }
                    actionSheet.show();
                }
            },
            pollList: {
                itemtap: function(list, index, target, record, e, eOpts) {
                    var me = this;
                    var mainNavView = me.getMainNavView();
                    //var image = record.get('image').url;
                    /*var pollDetail = Ext.create('PollStar.view.PollDetail', {
                        record: record,
                        title: Ext.util.Format.ellipsis(record.get('question'), 15)
                    }); */

                    console.log(record.get('voted'));
                    var pollDetail = Ext.create('PollStar.view.poll_detail.Vote', {
                        record: record,
                        title: Ext.util.Format.ellipsis(record.get('question'), 15)
                    });
                    //console.log('parti', record.get('participants'));
                    /*var pollDetail = Ext.create('PollStar.view.poll_detail.Results', {
                        record: record,
                        title: Ext.util.Format.ellipsis(record.get('question'), 15)
                    });*/
                    /*Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Please Wait...'
                    });*/
                    mainNavView.push(pollDetail);
                }
            },
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
                    me.selectImage('camera')
                }
            },
            photoLibraryButton: {
                tap: function(self, e, eOpts) {
                    var me = this;

                    me.selectImage('library')
                    //me.switchToAddPollView();
                }
            }
        }
    },
    selectImage: function(source) {
        var me = this;
        var actionSheet = me.getImageSelectionSheet();
        actionSheet.hide();

        function success(image_uri) {
            //console.log('image data',image_uri);
            console.log('before image blb');
            me.getImageBlob(image_uri);
        }

        function fail(message) {
            //alert("Failed: " + message);
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
                quality: 75,
                destination: 'file',
                source: source,
                encoding: 'jpg'
            });
        }
        //console.log(Ext.ux.parse.data.ParseConnector.getRequiredHeaders());
        //console.log(Ext.ux.parse.util.File);
        console.log('here in cam');
        // me.getImageBlob('resources/images/2.JPG');
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
    },
    getImageBlob: function(image_uri) {
        console.log(image_uri);
        console.log('in image blob');
        var me = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', image_uri, true);
        xhr.responseType = 'blob';

        xhr.onreadystatechange = function() {
            console.log('loaded image file');
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Note: .response instead of .responseText
                //var blob = new Blob([this.response], {type: 'image/jpeg'});
                var imageBlob = this.response;
                console.log('loaded image blob');
                loadImage.parseMetaData(
                    imageBlob,
                    function(data) {
                        if (!data.imageHead) {
                            return;
                        }
                        // Combine data.imageHead with the image body of a resized file
                        // to create scaled images with the original image meta data, e.g.:
                        var orientation = data.exif.get('Orientation');
                        console.log('after orientation');
                        loadImage(
                            imageBlob,
                            function(img) {
                                var imgData = img.toDataURL("image/jpeg");
                                console.log(orientation);
                                console.log(imgData);
                                me.switchToAddPollView(imgData);
                            }, {
                                maxWidth: 640,
                                maxHeight: 640,
                                canvas: true,
                                orientation: orientation
                            }
                        );
                    }, {
                        maxMetaDataSize: 262144,
                        disableImageHead: false
                    }
                );

            }
        };

        xhr.send();
    }
});