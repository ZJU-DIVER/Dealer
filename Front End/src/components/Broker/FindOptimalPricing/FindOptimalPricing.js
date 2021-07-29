import React, { Component } from 'react'
import { Table, Tooltip } from 'antd'

const columns = [
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
        fixed: 'left',
        width: 60,
        // filters: [
        //     {
        //         text: 'Joe',
        //         value: 'Joe',
        //     },
        //     {
        //         text: 'John',
        //         value: 'John',
        //     },
        // ],
        // onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
        title: 'the jth lowest price point',
        children: [
            {
                title: '1',
                dataIndex: 'p1',
                key: '1',
                //width: 50,
                sorter: (a, b) => a.p1 - b.p1,
            },
            {
                title: '2',
                dataIndex: 'p2',
                key: '2',
                //width: 50,
                sorter: (a, b) => a.p2 - b.p2,
            },
            {
                title: '3',
                dataIndex: 'p3',
                key: '3',
                //width: 50,
                sorter: (a, b) => a.p3 - b.p3,
            },
            {
                title: '4',
                dataIndex: 'p4',
                key: '4',
                //width: 50,
                sorter: (a, b) => a.p4 - b.p4,
            },
            {
                title: '5',
                dataIndex: 'p5',
                key: '5',
                //width: 50,
                sorter: (a, b) => a.p5 - b.p5,
            },
            {
                title: '6',
                dataIndex: 'p6',
                key: '6',
                //width: 50,
                sorter: (a, b) => a.p6 - b.p6,
            },
        ],
    }
];

const data = [];
for (let i = 0; i < 27; i++) {
    data.push({
        key: i,
        model: 'M' + i,
        p1: i + 1,
        p2: i - 1,
        p3: i - 5,
        p4: i + 6,
        p5: i,
        p6: i + 3,
    });
}

const nullColumn = [
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
        fixed: 'left',
        width: 60,
    },
    {
        title: 'the jth lowest price point',
        children: [
        ],
    }
];

export default class FindOptimalPricing extends Component {

    formData = (max_r) => {
        //console.log("待处理数据", max_r);
        let res = [], j = 0;
        max_r.map((item) => {
            let point = {}, i = 0;
            item.map((index) => {
                //console.log("index", index);
                point[`_${++i}`] = index;
            });
            //console.log("point", point);
            res = [...res, { model: 'M' + j++, ...point}];
        });
        //console.log("处理后数据", res);
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
        })
        //console.log("dynamicCol",dynamicCol);
        let rescolumns = [
            {
                title: 'Model',
                dataIndex: 'model',
                key: 'model',
                fixed: 'left',
                width: 60,
            },
            {
                title: 'the jth lowest price point',
                children: 
                    dynamicCol
                ,
            }
        ];
        //console.log("rescolumns", rescolumns);
        return rescolumns;
    }


    render() {

        //获取并处理数据
        const { max_r } = this.props;
        const dataSource = this.formData(max_r);
        const dynamicColumn = this.formColumn(max_r[0]);

        return (
            <div className={'singleDisplayGrid'} >
                <p className={'optionName'}>Find Optimal Pricing ：</p>
                <Table columns={!dynamicColumn ? nullColumn: dynamicColumn} dataSource={dataSource} bordered size="small" 
                    pagination= {{pageSize: 6}} scroll={{ x: 60}}/>
            </div>
        )
    }
}
