Ext.define('PollStar.view.components.ImageMask',{
	extend: 'Ext.LoadMask',
	xtype: 'imagemask',
	config: {
		cls: 'imagemask'
	},
	getTemplate: function(){
		var prefix = Ext.baseCSSPrefix;

		return [
		    {
		        //it needs an inner so it can be centered within the mask, and have a background
		        reference: 'innerElement',
		        cls: prefix + 'mask-inner',
		        children: [
		            //the elements required for the CSS loading {@link #indicator}
		            {
		                reference: 'indicatorElement',
		                cls: prefix + 'loading-spinner-outer',
		                children: [
		                    {
		                        cls: 'spinner',
		                        children: [
		                            { tag: 'div', cls: 'dot1'},
		                            { tag: 'div', cls: 'dot2'},
		                        ]
		                    }
		                ]
		            },
		            //the element used to display the {@link #message}
		            {
		                reference: 'messageElement'
		            }
		        ]
		    }
		];
	}
});