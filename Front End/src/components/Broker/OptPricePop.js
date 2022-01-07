import React, { Component } from 'react'
import { Table, Tooltip } from 'antd'

const nullColumn = [
    {
        title: '模型',
        dataIndex: 'model',
        key: 'model',
        fixed: 'left',
        width: 60,
    },
    {
        title: '第j个最低价格点',
        children: [
        ],
    }
];

export default class OptPricePop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingTable: props.loadingTable,
        }
    }

    formData = (max_r) => {
        // console.log("待处理数据", max_r);
        let res = [], j = 0;
        max_r.map((item) => {
            let point = {}, i = 0;
            item.map((index) => {
                //console.log("index", index);
                point[`_${++i}`] = index;
                point.key = j;
                return 0;
            });
            res = [...res, { model: 'M' + ++j, ...point}];
            return 0;
        });
        // console.log("处理后数据", res);
        return res;
    }

    formColumn = (len) => {
        let dynamicCol = [], i = 0;
        if(!len) 
            return ;        
        len.map((item) => {
            dynamicCol = [...dynamicCol, {
                title: `${i + 1}`,
                dataIndex: '_' + (i+1),
                key: i + 1,
                //sorter: (a, b) => `a.p${i+1} - b.p${i+1}`,
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: value => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            }];
            i++;
            return 0;
        })
        //console.log("dynamicCol",dynamicCol);
        let rescolumns = [
            {
                title: '模型',
                dataIndex: 'model',
                key: 'model',
                fixed: 'left',
                width: 60,
            },
            {
                title: '第j个最低价格点',
                children: 
                    dynamicCol
                ,
            }
        ];
        //console.log("rescolumns", rescolumns);
        return rescolumns;
    }

    //关闭Modal
    closeModal = () => {
        this.props.closeModal(true);
    }

    render() {

        //获取并处理数据
        const { maxRevenue } = this.props;
        const dataSource = this.formData(maxRevenue);
        const dynamicColumn = this.formColumn(maxRevenue[0]);

        return (
            <div>
                <div className="modalBackPrice">
                    <span className="close-pop" onClick={this.closeModal}></span>   
                    {/* <h2 className="popTitle">Find Optimal Pricing</h2> */}
                    <h2 className="popTitle">寻找最优定价</h2>
                    <Table columns={!dynamicColumn ? nullColumn: dynamicColumn} dataSource={dataSource} 
                        bordered size="small" pagination= {{pageSize: 6}} scroll={{ x: 60}}/>
                </div>
            </div>
        )
    }
}
