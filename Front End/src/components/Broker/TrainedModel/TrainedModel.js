import React, { Component } from 'react'
import { Table, Space, Button, Tooltip, message } from 'antd'
import axios from 'axios'

const data2 = [
    {
        key: '0',
        id: '0',
        coverage: 'model1',
        epsilon: '1%',
        price: '32',
        tags: ['Buy'],
    },
    {
        key: '1',
        id: '1',
        epsilon: '20%',
        coverage: 'model2',
        price: '42',
        tags: ['Buy'],
    },
    {
        key: '3',
        id: '3',
        coverage: 'model3',
        epsilon: '91%',
        price: '87',
        tags: ['Do not'],
    },
];

export default class TrainedModel extends Component {

    releaseModel = (id) => {
        axios.post('http://47.114.83.154:8080/model/release', {
            id: id,
        }).then(
            response => {
                //console.log("release成功");
                message.info("Release success");
            },
            error => {
                //console.log("release失败");
                message.info("Release failed");
            }
        )
    }

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
                // render: text => <a>{text}</a>,
            },
            {
                title: 'Epsilon',
                dataIndex: 'epsilon',
                key: 'epsilon',
                align: 'center',
                width: '17%',
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
                title: 'Coverage',
                dataIndex: 'coverage',
                key: 'coverage',
                align: 'center',
                width: '25%',
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
                key: 'price',
                align: 'center',
                width: '17%',
                render: (text, value) => {
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                    return '$ ' + text;
                },
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <Space size={5}>
                        <a herf="javascript:void(0);">Download</a>
                        <a herf="javascript:void(0);" onClick={() => this.releaseModel(record.id)}>Release</a>
                        {/* <Button type="link" size="small" >Download</Button>
                        <Button type="link" size="small" onClick={() => this.releaseModel(record.id)}>Release</Button> */}
                    </Space>
                ),
            },
        ];

        const { data } = this.props;

        return (
            <div className={'singleDisplayGrid'}>
                <p className={'optionName'}>Trained Models :</p>
                <div style={{clear:'both', margin: 'auto'}}>
                    <Table columns={columns} dataSource={data} size='small' 
                        pagination={{pageSize: 5}}/>
                </div>
            </div>
        )
    }
}
