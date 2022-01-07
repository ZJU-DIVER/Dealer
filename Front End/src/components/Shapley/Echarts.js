import React, { Component } from 'react'
import * as echarts from 'echarts';

const schema = [
    { name: 'x_axis', index: 0, text: 'X轴' },
    { name: 'y_axis', index: 1, text: 'Y轴' },
    { name: 'id', index: 2, text: 'id' },
    { name: 'sv', index: 3, text: 'sv值' },
    { name: 'price', index: 4, text: '价格' },
    { name: 'label', index: 5, text: '标签' }
];

const dataDefault =  [
    [
        [0, 0, 44, 0.03823529411764706, 39.79570607206191, 'P'],
    ],
    [
        [0, 0, 0, 0.045588235294117645, 47.44872647053534, 'N'],
    ]
    
]

export default class Echarts extends Component {

    componentDidMount() {
        this.initEcharts();
    }

    componentDidUpdate() {
        this.initEcharts();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.shapleyValue !== nextProps.shapleyValue) {
            return true;
        }
        return false;
    }

    initEcharts = () => {

        const { shapleyValue } = this.props
        const data = shapleyValue.items;
        const dataShown = data? this.seperateData(data):dataDefault;
        // console.log("获取的数据格式：", dataShown);

        let myChart = echarts.init(document.getElementById("svEcharts"))

        myChart.setOption({
            backgroundColor: new echarts.graphic.RadialGradient(0.0, 0.0, 0.0),
            title: {
                text: 'Shapley值',
                left: '4%',
                top: '3%',
                bottom: '20%',
                textStyle: {
                    color: '#fff',
                },
            },
            legend: {
                right: '10%',
                top: '3%',
                data: ['P', 'N'],
                textStyle: {
                    fontSize: 16,
                    color: '#fff',
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.7)',
                formatter: function (param) {
                    var value = param.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + param.seriesName + ' ' + value[2]
                        + '</div>'
                        + schema[3].text + '：' + value[3].toFixed(3) + '<br>'
                        + schema[4].text + '：' + value[4].toFixed(2) + '<br>';
                }
            },
            xAxis: {
                name: shapleyValue.x,
                nameLocation: "middle",
                nameTextStyle: {
                    fontSize: 15,
                    lineHeight: 35,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                },
                scale: true
            },
            yAxis: {
                name: shapleyValue.y,
                nameLocation: "middle",
                nameTextStyle: {
                    fontSize: 13,
                    lineHeight: 40,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                },
                scale: true
            },
            series: [
                {
                    name: 'P',
                    data: dataShown[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        // return data[4]/3;
                        return 20;
                    },
                    itemStyle: {
                        shadowBlur: 100,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(251, 118, 123)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(204, 46, 72)'
                        }]),
                    }
                },
                {
                    name: 'N',
                    data: dataShown[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return 20;
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(129, 227, 238)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(25, 183, 207)'
                        }]),
                    }
                }
            ]
        })
    }
    

    seperateData = (shapleyValue) => {
        let dataP = [], dataN = [];
        Array.from(shapleyValue).map((item, index) => {
            if(item.label === 'P') {
                dataP = [ ...dataP, 
                    [item.x_axis, item.y_axis, item.id, item.sv, item.price, item.label]
                ];
            } else {
                dataN = [ ...dataN, 
                    [item.x_axis, item.y_axis, item.id, item.sv, item.price, item.label]
                ];
            }
            return 0;
        });
        return [dataP, dataN];
    }

    render() {

        return (
            <div id="svEcharts"></div>
        )
    }
}
