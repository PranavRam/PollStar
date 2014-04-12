var pieChart;
Ext.define('PollStar.view.PieChart', {
    extend: 'Ext.Component',

    xtype: 'piechart',

    config: {
        chartData: [],
        layout: 'fit'
        /*height: '100%',
        width: '100%'*/
    },

    initialize: function() {
        //console.log(this.parent.getHeight());;
        var me = this;
        me.callParent(arguments);
        me.on('painted', function() {
            /*var p = Snap(".nv-pieWrap");
            var bbox = p.getBBox();
            p.attr({
                transform: "r160," + bbox.cx + ',' + bbox.cy,
            });
            p.animate({
                    transform: "r360," + bbox.cx + ',' + bbox.cy,
                    opacity: 1
                },
                800);*/
            /*var rectDim = Ext.DomQuery.select('.nv-pieWrap')[0].getBBox();
            var width = rectDim.width;
            var x = rectDim.x;
            var y = rectDim.y;
            var height = rectDim.height;
            var centerX = (width/2) + x;
            var centerY = (height/2) + y;
            console.log('painted');
            if (me.chart) {
                //me.chart.update();
                move('.nv-pieWrap')
                    .rotate(-200)
                    .duration(0)
                    .end(function(){
                        move('.nv-pieWrap')
                            .set('opacity', 1)
                            .rotate(0)
                            .duration('1s')
                            .end();
                    });
                d3.select('.nv-pieWrap')
                    .transition()
                    .duration(2000)
                    .style('opacity', 1)
                    .attr("transform", "rotate(40,"+centerY+","+centerX+")");
            }*/
            //console.log(me.getHeight(), me.getWidth());
            /*d3.select('.nv-pieWrap')
                .classed('animated rotateIn', true);*/
            /*var p = Snap(".nv-pieWrap");
            var bbox = p.getBBox();*/
            var rectDim = Ext.DomQuery.select('.nv-pieWrap')[0].getBBox();
            var width = rectDim.width;
            var x = rectDim.x;
            var y = rectDim.y;
            var height = rectDim.height;
            var centerX = (width / 2) + x;
            var centerY = (height / 2) + y;
            d3.select('.nv-pieWrap')
                .transition()
                .duration(1000)
                .style('opacity', 1)
                .attrTween("transform", tween);

            function tween(d, i, a) {
                return d3.interpolateString("rotate(-200," + centerX + "," + centerY + ")", "rotate(0," + centerX + "," + centerY + ")");
            }
        });

        function exampleData() {
            return [{
                "label": "One",
                "value": 29.765957771107
            }, {
                "label": "Two",
                "value": 0
            }, {
                "label": "Three",
                "value": 32.807804682612
            }, {
                "label": "Four",
                "value": 196.45946739256
            }, {
                "label": "Five",
                "value": 0.19434030906893
            }, {
                "label": "Six",
                "value": 98.079782601442
            }, {
                "label": "Seven",
                "value": 13.925743130903
            }, {
                "label": "Eight",
                "value": 5.1387322875705
            }];
        }
        // Init and add a bar chart
        nv.addGraph(Ext.bind(function() {
            var me = this;
            var chart = nv.models.pieChart()
                .x(function(d) {
                    return d.label
                })
                .y(function(d) {
                    return d.value
                })
                .donut(true);

            //console.log(this.innerElement.dom);
            d3.select(this.innerElement.dom).append('svg')
            //.style('opacity', 0)
            .on('click', function(d, i) {
                me.chart.dispatch.tooltipHide();
            })
                .attr('class', 'pie-chart-svg')
                .datum(exampleData())
            //.transition().duration(350)
            .call(chart);
            console.log('done');

            nv.utils.windowResize(chart.update);
            this.chart = chart;
            pieChart = chart;
            return chart;
        }, this));
    }
});