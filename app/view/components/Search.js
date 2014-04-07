Ext.define('PollStar.view.components.Search', {
	extend: 'Ext.field.Search',
	xtype: 'seachpollstar',
	config: {
		placeHolder: 'Search',
		disabled: true,
		listeners: {
		    blur: function() {
		        var me = this;
		        me.setDisabled(true);
		    },
		    painted: function(cmp) {
		        //console.log(cmp);
		        var me = this;
		        cmp.on('tap', function(e) {
		            console.log('before focus search');
		            var target = e.getTarget('.x-field-search');
		            if (target) {
		                console.log(target);
		                //console.log(button);
		                me.setDisabled(false);
		                me.focus();
		            }
		        });
		    }
		}
	}
});