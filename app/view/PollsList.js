Ext.define('PollStar.view.PollsList',{
	extend: 'Ext.dataview.List',
	requires: [
		'PollStar.view.PollDataItem'
	],
	xtype: 'pollsList',
	config: {
		defaultType: 'polldataitem',
		useComponents: true,
		store: 'pollsStore',
		baseCls: 'pollList-list',
		pressedCls: 'pollList-list-item-pressed'
	}
});
