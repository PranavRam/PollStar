Ext.define('PollStar.view.components.ToolbarSpinner', {
    extend: 'Ext.Component',
    xtype: 'tbarspinner',

    config: {
        style: 'font-size: 60%;',
        align: 'left',
        html: [
            '<div class="x-loading-spinner">',
            '<span class="x-loading-top"></span>',
            '<span class="x-loading-right"></span>',
            '<span class="x-loading-bottom"></span>',
            '<span class="x-loading-left"></span>',
            '</div>'
        ].join('')
    },

    // showSpinner: function() {
    // 	this.show();
    // },
    // 
    // hideSpinner: function() {
    // 	this.hide();
    // }
});