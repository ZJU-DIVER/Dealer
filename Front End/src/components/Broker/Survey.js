import React, { Component } from 'react'
import { message } from 'antd';
import axios from 'axios';
import { AddDataPop } from './AddDataPop'
import OptPricePop from './OptPricePop';
import Modal from '../Modal';

export default class Survey extends Component {

    state = {
        surveyData : [
            { id: 1, key: 1, epsilon: 1, price: 100},
            { id: 2, key: 2, epsilon: 1, price: 400},
            { id: 3, key: 3, epsilon: 2, price: 300},
            { id: 4, key: 4, epsilon: 2, price: 700},
            { id: 5, key: 5, epsilon: 3, price: 500},
            { id: 6, key: 6, epsilon: 3, price: 800},
        ],
        loadingTable: false,
        completePriceSpace: [],   //暂时用不上
        maxRevenue: [],
        price: [],
        showModal: 0,    // 0为关闭，1为surveydata，2为optprice
    }

    componentDidMount() {
        this.calMaxRevenue(this.state.surveyData);
    }

    //modal打开
    handleShow = (value) => {
        // console.log(value);
        this.setState({showModal: value});
    }
      
    //modal关闭
    handleHide = (flag) => {
        if(flag) {
            this.setState({showModal: 0});
        }
    }

    //处理传回来的surveyData
    handleSurveyData = (value) => {
        // console.log("get survey data", value);
        this.setState({surveyData:value});
        this.calMaxRevenue(value);    //state更新不及时
    }

    //调用Max Renenue函数
    calMaxRevenue = (surveyData) => {
        //处理数据
        this.setState({loadingTable:true});
        const survey = this.formSurveyData(surveyData);
        // console.log("请求参数", survey);
        //发送请求
        if(survey.length === 0 || !survey) {
            this.setState({ loadingTable: false });
            // message.info("Please add survey data");
            message.info("请添加调研数据");
            return ;
        }
        axios.post('/dealer/write_survey', {
            "survey": survey,
        }).then(
            response => {
                // console.log("发送请求成功", response.data.payload);
                this.setState({ loadingTable: false, maxRevenue: response.data.payload.max_revenue,
                    completePriceSpace:response.data.payload.complete_price_space , 
                    price: response.data.payload.price 
                });
                this.props.handlePrice(response.data.payload.price);
            },
            error => {
                // console.log("发送请求失败", error);
                this.setState({ loadingTable: false, maxRevenue: [], completePriceSpace: [], price: []});
                // message.info("Finding max revenue failed.");
                // message.info("寻找最佳定价失败")

            }
        )
    };

    //处理survey数据
    formSurveyData = (surveyData) => {
        let resData = [];
        surveyData.map((item) => {
            resData =  [...resData, {
                eps: item.epsilon,
                pri: item.price,
            }]
            return 0;
        })
        return resData;
    }

    //在页面展示样本数据
    getSample = (rawData) => {
        let sampleData = [];
        // console.log("rawData", rawData);
        if(rawData.length!==0) {
            for (let i = 0; i < 3; i++) {
                if(rawData.length>i) {
                    sampleData = [...sampleData, rawData[i]];
                } else {
                    sampleData = [...sampleData, {}];
                }
            }
            return sampleData;
        }
        return [{},{},{}];
    }

    render() {

        const { surveyData, maxRevenue, loadingTable } = this.state;
        const optPrice = this.getSample(maxRevenue).map((row, index) => (
            <tr key={index}>
                <td>{"M" + (index+1)}</td>
                {Array.from(row).map((col, i) => (
                    <td key={i}>{col}</td>
                ))}
            </tr>
        ));

        const modalSurveyData = this.state.showModal==="data" ? (
            <Modal>
                <div className="modal">
                    <AddDataPop surveyData={surveyData} handleSurveyData={this.handleSurveyData} 
                        closeModal={this.handleHide} />
                </div>
            </Modal>
        ) : null;

        const modalOptPrice = this.state.showModal==="price" ? (
            <Modal>
                <div className="modal">
                    <OptPricePop maxRevenue={maxRevenue} loadingTable={loadingTable} 
                        closeModal={this.handleHide} />
                </div>
            </Modal>
        ) : null;

        return (
            <div>
                <div className="line" style={{marginTop:'0.1rem'}}>
                    <span className="lineTitle title-a" onClick={() => this.handleShow("data")}>
                        {/* {"Click to Edit Survey Data >"} */}
                        { "点击以编辑调研数据 >" }
                    </span>
                </div>
                <div className="line" style={{marginTop:'0.5rem'}}>
                    <span className="lineTitle">
                        {/* Find Optimal Pricing ： */}
                        寻找最优定价 ：
                    </span>
                    <div className="tb tb_left">
                        <table>
                            <thead>
                                <tr className="tb_title">
                                    {/* <td colSpan="1" rowSpan="2">Model</td>
                                    <td colSpan={surveyData.length}>the jth lowest price point</td> */}
                                    <td colSpan="1" rowSpan="2">模型</td>
                                    <td colSpan={surveyData.length}>第j个最低价格点</td>
                                </tr>
                                <tr className="tb_title">
                                    {surveyData.map((data, index) => (
                                        <td key={index}>{data.id}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {optPrice}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn-a" style={{float:'right'}} onClick={() => this.handleShow("price")}>{"详情 >"}</button>
                    {modalSurveyData}
                    {modalOptPrice}
                </div>
            </div>
        )
    }
}
