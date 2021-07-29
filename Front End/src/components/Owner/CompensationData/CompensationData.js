import React, { Component } from 'react'
import { Table, Row, Col, Tooltip } from 'antd'

const columnsp = [
    {
        title: 'P',
        dataIndex: 'p',
        width : 50,
    },
    // {
    //     title: 'ID',
    //     dataIndex: 'id',
    //     width : 50,
    // },
    {
        title: 'SV',
        dataIndex: 'sv',
        sorter: {
            compare: (a, b) => a.sv - b.sv,
            multiple: 1,
        },
        //align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: value => (
            <Tooltip placement="topLeft" title={value}>
                {value}
            </Tooltip>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        ellipsis: true,
        sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 1,
        },
        //align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: value => (
            <Tooltip placement="topLeft" title={value}>
                {value}
            </Tooltip>
        ),
    }
];

const columnsn = [
    {
        title: 'N',
        dataIndex: 'n',
        width : 60,
    },
    // {
    //     title: 'ID',
    //     dataIndex: 'id',
    //     width : 50,
    // },
    {
        title: 'SV',
        dataIndex: 'sv',
        sorter: {
            compare: (a, b) => a.value - b.value,
            multiple: 1,
        },
        //align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: value => (
            <Tooltip placement="topLeft" title={value}>
                {value}
            </Tooltip>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 1,
        },
        //align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: value => (
            <Tooltip placement="topLeft" title={value}>
                {value}
            </Tooltip>
        ),
    }
];



export default class CompensationData extends Component {

    onChange = (pagination, filters, sorter, extra) => {
        //console.log('params', pagination, filters, sorter, extra);
    }

    divideData = (compensationData) => {
        //console.log("CompensationData表格获取的参数",compensationData);
        let resData = { pData:[], nData:[] };
        if(compensationData) {
            compensationData.map((item) => {
                if(item.label === 0) {
                    const res = {
                        key: item.id,
                        p: 'P' + item.id,
                        id: item.id,
                        sv: item.sv,
                        price: item.price
                    }
                    resData.pData = [ ...resData.pData, res];
                } else if (item.label === 1){
                    const res = {
                        key: item.id,
                        n: 'N' + item.id,
                        id: item.id,
                        sv: item.sv,
                        price: item.price
                    }
                    resData.nData = [ ...resData.nData, res];
                }
            })
        }
        return resData;
    }

    render() {

        //获取原始数据并加工
        const { compensationData } = this.props;
        //console.log("传入Compensation表格的数据,", compensationData);
        const divideData = this.divideData(compensationData);

        return (
            // <div className={'singleDisplayGrid'}>
            <div style={{ margin:"7% auto 0" }}>
                <p className={'optionName'}>Chosen Data ：</p>
                <div style={{clear:'both'}}>
                    <Row gutter={6}>
                        <Col span={12}>
                            <Table columns={columnsp} dataSource={divideData.pData} onChange={this.onChange} 
                                pagination={{hideOnSinglePage:true, pageSize: 5}} size='small' bordered/>
                        </Col>
                        <Col span={12}>
                            <Table columns={columnsn} dataSource={divideData.nData} onChange={this.onChange} 
                                pagination={{hideOnSinglePage:true, pageSize: 5}} size='small' bordered/>
                        </Col>    
                    </Row>
                </div>
            </div>
        )
    }
}
