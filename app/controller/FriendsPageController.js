Ext.define('PollStar.controller.FriendsPageController', {
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
            //cameraButton: 'button[action=activateCamera]',
            //photoLibraryButton: 'button[action=activatePhotoLibrary]',
            navToPollsBtn: 'button[action=navToPolls]',
            //addPollViewImage: 'image[itemId=addPollImage]',
            //pollList: 'pollsList',
            pollsMainView: 'main'
        },
        control: {
            navToPollsBtn: {
                tap: function(btn, e, eOpts) {
                    var me = this;
                    var pollsMainView = me.getPollsMainView();
                    Ext.Viewport.animateActiveItem(pollsMainView,
                        me.getAnims().right
                    );
                    Ext.Viewport.hideKeyboard && Ext.Viewport.hideKeyboard();
                }
            }
        }
    }
});