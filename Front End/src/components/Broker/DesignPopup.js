import React, { Component } from 'react'
import { Table, Space, Tooltip, message } from 'antd'
import axios from 'axios'

export default class DesignPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingTable: props.loadingTable,
        }
    }

    //发布模型
    releaseModel = (id) => {
        axios.post('/dealer/model/release', {
            id: id,
        }).then(
            response => {
                //console.log("release成功");
                // message.info("Release success");
                message.info("发布成功")
            },
            error => {
                //console.log("release失败");
                // message.info("Release failed");
                message.info("发布失败");
            }
        )
    }

    //关闭Model
    closeModal = () => {
        this.props.closeModal(true);
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
                title: '噪声',
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
                title: '覆盖率',
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
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                align: 'center',
                width: '17%',
                render: (text, value) => {
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                    // return '$ ' + text;
                    return '￥ ' + text;
                },
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <Space size={5}>
                        <button className="btn-a-blue">下载</button>
                        <button className="btn-a-blue" onClick={() => this.releaseModel(record.id)}>发布</button>
                    </Space>
                ),
            },
        ];

        const { modelData } = this.props;

        return (
            <div>
                <div className="modalBackPrice">
                    <span className="close-pop" onClick={this.closeModal}></span>   
                    {/* <h2 className="popTitle">Models</h2> */}
                    <h2 className="popTitle">模型</h2>
                    <Table columns={columns} dataSource={modelData} size='small' bordered pagination= {{pageSize: 4}}/>
                </div>
            </div>
        )
    }
}
