import React, { Component } from 'react'
import { Table, Tag, Tooltip, Space, Button } from 'antd'

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
        width: '17%',
        align: 'center',
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
        width: '21%',
        align: 'center',
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
        width: '13%',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render:(text, value) => {
            <Tooltip placement="topLeft" title={value}>
                {value}
            </Tooltip>
            return '$ ' + text;
        }
    },
    {
        title: 'Suggestion',
        key: 'suggestion',
        dataIndex: 'suggestion',
        width: '23%',
        align: 'center',
        render: (text, record) => (
            <Tag color={ record.suggestion === 'true'? 'green':'volcano'} key={record.suggestion}>
                {record.suggestion.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        width: '15%',
        align: 'center',
        render: (text, record) => (
            // <Space size={5}>
                <a herf="javascript:void(0);">Pay</a>
                // /* <a herf="javascript:void(0);" onClick={() => this.releaseModel(record.id)}>Release</a> */
                // /* <Button type="link" size="small" >Download</Button>
                // <Button type="link" size="small" onClick={() => this.releaseModel(record.id)}>Release</Button> */
            // </Space>
        ),
    },
];
  
const data = [
    {
        key: '0',
        id: '0',
        coverage: 'model1',
        epsilon: '1%',
        price: '32',
        suggestion: 'true',
    },
    {
        key: '1',
        id: '1',
        epsilon: '20%',
        coverage: 'model2',
        price: '42',
        suggestion: 'true',
    },
    {
        key: '3',
        id: '3',
        coverage: 'model3',
        epsilon: '91%',
        price: '87',
        suggestion: 'false',
    },
];

export default class ModelData extends Component {

    handleData = () => {
        const { modelData } = this.props;
        let handled = [];
        modelData.map((item) => {
            item.suggestion === true ?
            handled = [...handled, {
                id: item.id,
                epsilon: item.epsilon,
                coverage: item.coverage,
                price: item.price,
                suggestion: 'true',
            }] :
            handled = [...handled, {
                id: item.id,
                epsilon: item.epsilon,
                coverage: item.coverage,
                price: item.price,
                suggestion: 'false',
            }];
        })
        return handled;
    }


    render() {

        const handled = this.handleData();

        return (
            <div style={{margin:'9% auto 0'}}>
                <p className={'optionName'}>Trained Models :</p>
                <Table columns={columns} dataSource={ handled } size='small'/>
            </div>
        )
    }
}
