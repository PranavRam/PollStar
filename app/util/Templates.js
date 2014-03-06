Ext.define('PollStar.util.Templates', {
	singleton: true,
	pollList: function(){
		var tpl = new Ext.XTemplate(Ext.select('#tpl_poll_list').elements[0].innerHTML);
		return tpl;
	}
});