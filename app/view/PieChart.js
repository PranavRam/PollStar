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
                    //return d.label
                    return d.option
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
                //.datum(exampleData())
                .datum(me.getChartData())
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