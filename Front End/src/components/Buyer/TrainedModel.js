import React, { Component } from 'react'
import Modal from '../Modal'
import ModelPopup from './ModelPopup';

const column = [
    {title: 'id', dataIndex: 'id'}, 
    {title: '噪声', dataIndex: 'epsilon'}, 
    {title: '覆盖率', dataIndex: 'coverage'}, 
    {title: '价格', dataIndex: 'price'}
];

export default class TrainedModel extends Component {

    state = {
        showModal: false,
    };
    
    //modal打开
    handleShow = () => {
        this.setState({showModal: true});
    }
      
    //modal关闭
    handleHide = (flag) => {
        if(flag) {
            this.setState({showModal: false});
        }
    }

    //在页面展示样本数据
    getSample = (rawData) => {
        let sampleData = [];
        // console.log("rawData", rawData);
        if(rawData.length!==0) {
            for (let i = 0; i < 5; i++) {
                if(rawData.length>i) {
                    rawData[i].coverage = Number(rawData[i].coverage).toFixed(3);
                    sampleData = [...sampleData, rawData[i]];
                } else {
                    sampleData = [...sampleData, {}];
                }
            }
            return sampleData;
        }
        return [{},{},{},{},{}];
    }

    render() {

        const { modelData } = this.props

        //页面上展示的modelData
        const sampleData = this.getSample(modelData).map((row, index) => (
            <tr key={index}>
                {column.map((col, i) => (
                    <td key={i}>{row[col.dataIndex]}</td>
                ))}
            </tr>
        ));
        
        //弹出层
        const modal = this.state.showModal ? (
            <Modal>
                <div className="modal">
                    <ModelPopup modelData={modelData} closeModal={this.handleHide}/>
                </div>
            </Modal>
        ) : null;

        return (
            <div>
                <div className="tb tb_left">
					<table>
                        <thead>
                            <tr className="tb_title">
                                {column.map((item, index) => (
                                    <td key={index}>{item.title}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData}
                        </tbody>
					</table>
				</div>
                <div>
                    <button className="btn-a" style={{float:'right'}} onClick={this.handleShow}>{"详情 >"}</button>
                    {modal}
                </div>
            </div>
        )
    }
}
