/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setPath({
    'Ext.ux': 'vendor/ux'
});

Ext.application({
    name: 'PollStar',

    requires: [
        'Ext.ux.parse.app.Application',
        'Ext.MessageBox',
        'PollStar.util.ImageUpload',
        'Ext.Anim'
    ],
    models: [
        'Poll',
        'User'
    ],

    views: [
        'Main',
        'Login',
        'AddPoll',
        'FriendsMain',
        'AddPoll'
    ],
    controllers: [
        'LoginController',
        'LandingPageController',
        'AddPollController',
        'FriendsPageController',
        'VoteController'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    parseConfig: {
        applicationId: 'TiXE1VVZv2QrUJTyJsXlZQ4MhnoygRXJRIxTjk26',
        apiKey: 'MQGUH1VVnC4aTIaVCxs9fYGfjkni9fKhwizJ8CbR'
    },

    launch: function() {
        //Ext.Msg.alert("Orientation");
        // Destroy the #appLoadingIndicator element
        //console.log(Ext.app.parseConfig().applicationId);
        // Initialize Parse
        Parse.initialize("TiXE1VVZv2QrUJTyJsXlZQ4MhnoygRXJRIxTjk26", "bkdRkgavzxlC6z2vZUFoxONuSHhJyoisdXzvKvh7");
        /*Ext.Viewport.add([
            //Ext.create('PollStar.view.Login'),
            Ext.create('PollStar.view.Main'),
            Ext.create('PollStar.view.FriendsMain')
        ]);*/
        var currentUser = Parse.User.current();
        if (currentUser) {
            /*Ext.Viewport.setMasked({
              xtype: 'loadmask',
              message: 'Loading...'
            });*/
            
            if(!Ext.isEmpty(localStorage.getItem('pollsVoted'))){
                Ext.ux.parse.data.ParseConnector._sessionToken = currentUser.getSessionToken();
                PollStar.app.fireEvent('userLoggedIn');
            }
            else {
                currentUser.fetch().then(function(user) {
                    //showScreen(false);
                    var pollsVoted = Parse.User.current().get('pollsVoted');
                    localStorage.setItem('pollsVoted', JSON.stringify(pollsVoted));
                    Ext.ux.parse.data.ParseConnector._sessionToken = user.getSessionToken();
                    PollStar.app.fireEvent('userLoggedIn');
                }, function(err, user) {
                    console.log("Session Login Failure: " + JSON.stringify(err));
                    Ext.ux.parse.data.ParseConnector._sessionToken = currentUser.getSessionToken();
                    PollStar.app.fireEvent('userLoggedIn');
                });
            }
        } else {
            console.log('not logged in');
            Ext.fly('spinner').destroy();
            Ext.Viewport.add([
                Ext.create('PollStar.view.Login')
            ]);
        }

        // Initialize the main view
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});