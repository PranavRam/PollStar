Ext.define('PollStar.controller.LandingPageController', {
    extend: 'Ext.app.Controller',
    requires: [
        'PollStar.view.AddPoll',
        'PollStar.view.ImageSelectionSheet',
        'PollStar.view.PollDetail',
        'PollStar.view.poll_detail.Vote',
        'PollStar.view.poll_detail.Results',
        'PollStar.view.poll_detail.Owner',
        'PollStar.view.poll_detail.PollDetails',
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
            addPollViewImage: 'pollimage[itemId=addPollImage]',
            pollList: 'pollList',
            friendsMainView: 'friendsMain',
            imageSelectionSheet: '#imageselectionsheet'
        },
        control: {
            'main titlebar': {
                back: function(view, eOpts) {
                    (Ext.ComponentQuery
                        .query('main titlebar button[category=hideOffMain]'))
                        .forEach(function(button) {
                            button.show();
                        });
                    Ext.ComponentQuery.
                    query('button[action=voteForPoll]')[0].setHidden(true);
                }
            },
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
                    //console.log(e);
                    var me = this;
                    //list.setDisabled(true);
                    var mainNavView = me.getMainNavView();
                    var previousPollDetail = mainNavView.down('polldetails');
                    if (Ext.isEmpty(previousPollDetail)) {
                        var pollDetail;

                        //var image = record.get('image').url;
                        /*var pollDetail = Ext.create('PollStar.view.PollDetail', {
                            record: record,
                            title: Ext.util.Format.ellipsis(record.get('question'), 15)
                        }); */

                        //console.log(record.get('voted'));
                        var endTime = new Date(record.get('endTime').iso);
                        var currentTime = new Date();
                        //console.log(currentTime, endTime, currentTime < endTime);
                        //console.log(record.get('owner').username);
                        
                        //console.log(endTime, currentTime);
                        //console.log(currentTime < endTime);
                        if (currentTime < endTime) {
                            if (Parse.User.current().id == record.get('owner').objectId)
                                pollDetail = me.showOwnerView(record);
                            else{
                                pollDetail = me.showVoteView(record);
                            }
                        } else {
                            //console.log('parti', record.get('participants'));
                            pollDetail = me.showResultsView(record);
                        }
                        /*Ext.Viewport.setMasked({
                            xtype: 'loadmask',
                            message: 'Please Wait...'
                        });*/
                        mainNavView.push(pollDetail);
                        (Ext.ComponentQuery
                            .query('main titlebar button[category=hideOffMain]'))
                            .forEach(function(button) {
                                button.hide();
                            });
                    }
                    return false;
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
        if (actionSheet) actionSheet.hide();

        function success(image_uri) {
            //console.log('image data',image_uri);
            var imageData = "data:image/jpeg;base64," + image_uri;
            me.switchToAddPollView(imageData);
            //console.log('before image blb');
            //me.getImageBlob(image_uri);
        }

        function fail(message) {
            //alert("Failed: " + message);
        }

        /*navigator.camera.getPicture(me.imagePicked, fail, {
            quality: 75,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });*/
        if (Ext.device.Camera) {
            Ext.device.Camera.capture({
                success: success,
                failure: fail,
                quality: 15,
                destination: 'data',
                source: source,
                encoding: 'jpg',
                width: 640,
                height: 640,
                //correctOrientation: true
            });
        }
        //console.log(Ext.ux.parse.data.ParseConnector.getRequiredHeaders());
        //console.log(Ext.ux.parse.util.File);
        console.log('here in cam');
        // me.getImageBlob('resources/images/2.JPG');
    },
    switchToAddPollView: function(image_uri, orientation) {
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
        //addPollViewImage.setImageOrientation(orientation);
        //console.log('in switching');
        addPollView.show();
    },
    getImageBlob: function(image_uri) {
        var me = this;

        var request = {
            url: image_uri,
            responseType: "blob",
            xhr2: true,
            //progress: progressIndicator,
            success: function(response) {
                //console.log(response);
                me.getImageMetaData(response.responseBytes);

            },
            failure: function(response) {
                console.log(response.requestId);
                if (response.status == 0)
                    me.getImageMetaData(response.responseBytes);
                else
                    console.log('Could not select the image, Please try again');
            }
        };
        //Ext.Viewport.add(progressIndicator);
        Ext.Ajax.request(request);
        console.log('request sent');
    },
    getImageMetaData: function(blob) {
        var me = this;
        loadImage.parseMetaData(
            blob,
            function(data) {
                if (!data.imageHead) {
                    return;
                }
                // Combine data.imageHead with the image body of a resized file
                // to create scaled images with the original image meta data, e.g.:
                var orientation = data.exif.get('Orientation');
                console.log('after orientation');
                loadImage(
                    blob,
                    function(img) {
                        var imgData = img.toDataURL("image/jpeg");
                        console.log(orientation);
                        //console.log(imgData);
                        me.switchToAddPollView(imgData, orientation);
                    }, {
                        maxWidth: 1280,
                        maxHeight: 1280,
                        canvas: true,
                        orientation: orientation
                    }
                );
            }, {
                maxMetaDataSize: 262144,
                disableImageHead: false
            }
        );
    },
    showVoteView: function(record) {
        Ext.ComponentQuery.
        query('button[action=voteForPoll]')[0].setHidden(false);
        return Ext.create('PollStar.view.poll_detail.PollDetails', {
            record: record,
            title: Ext.util.Format.ellipsis(record.get('question'), 15),
            // title: 'Vote',
            canVote: true
        });
    },
    showResultsView: function(record) {
        return Ext.create('PollStar.view.poll_detail.Results', {
            record: record,
            // title: Ext.util.Format.ellipsis(record.get('question'), 15)
            title: 'Results'
        });
    },
    showOwnerView: function(record) {
        return Ext.create('PollStar.view.poll_detail.PollDetails', {
            record: record,
            // title: Ext.util.Format.ellipsis(record.get('question'), 15),
            //title: 'View',
            owner: true
        });
    }
});