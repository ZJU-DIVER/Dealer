import React, { Component } from 'react'
import { Table, Tag, Tooltip } from 'antd'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
    },
    {
        title: '噪声',
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
        title: '覆盖率',
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
        title: '价格',
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
            // return '$ ' + text;
            return '￥ ' + text;
        }
    },
    {
        title: '建议',
        key: 'suggestion',
        dataIndex: 'suggestion',
        width: '23%',
        align: 'center',
        render: (text, record) => (
            <Tag color={ record.suggestion === 'true'? 'green':'volcano'} key={record.suggestion}>
                {/* {record.suggestion.toUpperCase()} */}
                { record.suggestion === 'true'? "是": "否" }
            </Tag>
        ),
    },
    {
        title: '操作',
        key: 'action',
        width: '15%',
        align: 'center',
        render: (text, record) => (
            <button className="btn-a-blue">购买</button>
        ),
    },
];

export default class ModelPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingTable: props.loadingTable,
        }
    }

    //处理传来的数据
    handleData = () => {
        const { modelData } = this.props;
        let handled = [];
        modelData.map((item) => {
            item.suggestion === true ?
            handled = [...handled, {
                id: item.id,
                key: item.id,
                epsilon: item.epsilon,
                coverage: item.coverage,
                price: item.price,
                suggestion: 'true',
            }] :
            handled = [...handled, {
                id: item.id,
                key: item.id,
                epsilon: item.epsilon,
                coverage: item.coverage,
                price: item.price,
                suggestion: 'false',
            }];
            return 0;
        })
        return handled;
    }

    //关闭Model
    closeModal = () => {
        this.props.closeModal(true);
    }

    render() {

        const handled = this.handleData();

        return (
            <div>
                <div className="modalBackModel">
                    <span className="close-pop" onClick={this.closeModal}></span>   
                    <h2 className="popTitle">Models</h2>
                    <Table columns={columns} dataSource={handled} size='small' bordered pagination= {{pageSize: 5}}/>
                </div>
            </div>
        )
    }
}
