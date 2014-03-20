var css_style;
Ext.define('PollStar.view.PollDetail', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Img',
        'Ext.form.Panel',
        'Ext.field.Radio',
        'Ext.form.FieldSet',
        'Ext.Carousel'
    ],
    config: {
        layout: 'vbox',
        imageUrl: null,
        question: null,
        options: null,
        participants: null,
        record: null
    },
    initialize: function() {
        var me = this;
        //console.log(me.getImageUrl());
        me.populateConfig();
        var record = me.getRecord();
        var imageUrl = record.get('image').url;

        me.callParent(arguments);
    },
    populateConfig: function() {
        var me = this;
        var record = me.getRecord();
        var imageUrl = record.get('image').url;
        var question = record.get('question');
        var options = record.get('options');

        me.setImageUrl(imageUrl);
        me.setQuestion(question);
        me.setOptions(options)

        me.addItems(imageUrl);
    },
    addItems: function(imgUrl) {
        var me = this;
        var imageStyle = me.getColorGradient(me.getImageUrl());
        //console.log(imageStyle);
        var items = [{
            xtype: 'carousel',
            items: [{
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                    xtype: 'image',
                    flex: 7,
                    //cls: 'poll-detail-image',
                    //style: imageStyle,
                    masked: {
                    	xtype: 'loadmask',
                    	message: 'loading',
                    	indicator: true
                    },
                    listeners: {
                    	initialize: function(){
                    		var img = this;
                    		var el = img.element;
                    	  css_style = el;
                    	  el.dom.onload = function(){
                    			console.log('here in img');
                    		}
                    		el.dom.setAttribute('style', imageStyle);
                    		console.log(el, el.dom);
                    		//img.callParent(arguments);
                    		
                    		//me.setMasked(true);
                    	},
                    	tap: function(){
                    		console.log('tapped');
                    	}
                    }
                }, {
                    html: 'Z',
                    //width: '2em',
                    flex: 1,
                    cls: 'purple-right-indicator'
                }]
                //src: me.getImageUrl()
            }, {
                xtype: 'panel',
                //src: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/576/overrides/space207-trifid-nebula_57668_600x450.jpg'
                layout: 'hbox',
                items: [{
                    html: 'P',
                    //width: '2em',
                    flex: 1,
                    cls: 'green-left-indicator'
                }, {
                    xtype: 'image',
                    //src: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/576/overrides/space207-trifid-nebula_57668_600x450.jpg'
                    src: 'resources/images/1.JPG',
                    flex: 7
                }]
            }],
            flex: 2
        }, {
            xtype: 'label',
            html: 'Q. ' + me.getQuestion(),
            //margin: '5px auto 0 auto',
            height: '36px',
            style: 'text-align: center; padding: 0.5em; background-color: RGB(234, 244, 246)'
        }]
        me.prepareOptionsRadio(items);
        me.add(items);
    },
    prepareOptionsRadio: function(items) {
        var me = this;
        var options = me.getOptions();
        var innerItems = [];
        Ext.Array.forEach(options, function(item, index) {
            var item = {
                xtype: 'radiofield',
                name: 'vote',
                value: item,
                label: item,
                checked: (index == 0)
            }
            innerItems.push(item);
        });
        var btn = Ext.create('Ext.Button', {
            text: 'Vote',
            action: 'voteForPoll'
        });
        innerItems.push(btn);
        var formpanel = {
            xtype: 'formpanel',
            flex: 3,
            items: [{
                xtype: 'fieldset',
                title: 'Options',
                instructions: 'Select an option and tap Vote',
                items: innerItems,
                cls: 'poll-detail-form'
            }]
        }
        items.push(formpanel);
        return items;
    },
    getColorGradient: function(imageUrl) {
    	var me = this;
    		var backgroundImage = "url('"+imageUrl+"')";
    		var backgroundColor = me.createBrowserSpecifics(backgroundImage, "-webkit-linear-gradient(left,  #5bb7b1 0%,#9e6a90 100%);");
        var backgroundCoor = "background-color: #5bb7b1; /* Old browsers */"+
backgroundImage+"background-image: -webkit-gradient(linear, left top, right top, color-stop(0%,#5bb7b1), color-stop(100%,#9e6a90)); /* Chrome,Safari4+ */"+
backgroundImage+"background-image: -webkit-linear-gradient(left,  #5bb7b1 0%,#9e6a90 100%); /* Chrome10+,Safari5.1+ */"+
backgroundImage+"background-image: -ms-linear-gradient(left,  #5bb7b1 0%,#9e6a90 100%); /* IE10+ */"+
backgroundImage+"background-image: linear-gradient(to right,  #5bb7b1 0%,#9e6a90 100%); /* W3C */";

//console.log(backgroundColor);
	return backgroundColor;
    },
    createBrowserSpecifics: function(url, type){
    	//var backgroundImage = "background-image: "+url;
    	var backgroundImage = "background-image: "+url;
    	backgroundImage += ", " + type
    	return backgroundImage;
    }
});