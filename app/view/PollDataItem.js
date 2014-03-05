Ext.define('PollStar.view.PollDataItem', {
    extend: 'Ext.dataview.component.ListItem',
    requires: [
    	'Ext.Img'
    ],
    xtype: 'polldataitem',
    config: {
    		baseCls: 'pollList-list-item',
        padding: 10,
        layout: {
            type: 'hbox'
        },
        defaults: {
            margin: 5
        },
        items: [{
            xtype: 'image',
            src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
            flex: 1
        },{
        	xtype: 'component',
        	flex: 10,
        	itemId: 'textCmp'
        }]
    },
    updateRecord: function(record) {
    	var me = this;
    	me.down('#textCmp').setHtml(record.get('question'));
    	me.callParent(arguments);
    }
});