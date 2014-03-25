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
        'PollStar.util.ImageUpload'
    ],
    models: [
        'Poll',
        'User'
    ],

    stores: [
        'Polls',
        'Friends',
        'Users'
    ],

    views: [
        'Main',
        'Login',
        'AddPoll',
        'FriendsMain',
        'AddPoll'
    ],
    controllers: [
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
        function showScreen() {
            Ext.Viewport.add([
                //Ext.create('PollStar.view.Login'),
                Ext.create('PollStar.view.Main'),
                //Ext.create('PollStar.view.FriendsMain')
                //Ext.create('PollStar.view.AddPoll')
            ]);
        }
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
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
          showScreen();
        } else {
          console.log('not logged in');
            Parse.User.logIn("Pranav Ram", "12345", {
                success: function(user) {
                    // Do stuff after successful login.
                    showScreen();
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                }
            });
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