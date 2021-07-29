import React, { Component } from 'react'
import { Divider, Image, Row, } from 'antd'
import axios from 'axios'
import ChooseDataset from '../ChooseDataset/ChooseDataset'
import BasePrice from '../BasePrice/BasePrice'
import PrivacySensitivity from '../PrivacySensitivity/PrivacySensitivity'
import ChooseData from './ChooseData/ChooseData'
import CompensationData from './CompensationData/CompensationData'

import Epsilon from './Epsilon/Epsilon'
import SampleNumber from './SampleNumber/SampleNumber'
import CompensationAlg from './CompensationAlg/CompensationAlg'

export default class Owner extends Component {

    state = {
        dataset: '',
        allData: [],
        chosenDataKey: [],
        bp: null,
        ps: null,
        eps: null,
        sample: null,
        compensationData: null,
        // imgname: '',
        imgName: '',
        loadingTable: false
    }

    //接收组件返回的数据集名称
    getChosenDataset = (dataset) => {
        console.log('ChooseDataset组件返回的数据集', dataset);
        this.setState({allData: null});
        this.setState({loadingTable: true});
        this.getAllData(dataset);
    }

    //发送请求获取 数据
    getAllData = (dataset) => {
        axios.get(`http://47.114.83.154:8080/${dataset}/all`).then(
			response => {
                this.setState({dataset:dataset, allData:response.data.payload, loadingTable: false});
                //console.log("请求成功，向数据表传入的数据 in getAllData", this.state.dataset, this.state.allData);
            },
		    error => {
                //console.log("获取数据失败，向数据表传入的数据 in getAllData", this.state.dataset, this.state.allData);
            }
        )
    }

    //获取已选数据
    getChosenDataKey = (chosenDataKey) => {
        //console.log("Owner收到选取的数据", chosenDataKey);
        this.setState({chosenDataKey});
    }

    //获取BasePrice
    getBasePrice = (bp) => {
        this.setState({bp});
    }

    //获取PrivacySensitivity
    getPrivacySensitivity = (ps) => {
        this.setState({ps});
    }

    //获取Epsilon
    getEpsilon = (eps) => {
        this.setState({eps});
    }

    //获取SampleNumber
    getSampleNumber = (sample) => {
        this.setState({sample});
    }

    //获取所有点的compensationValue，并形成compensationData(预处理，准备好label)
    getCompensationData = (compensationValue) => {
        console.log("获取的值 compensationValue", compensationValue);
        let resData = [];
        const { allData, dataset, chosenDataKey } = this.state;
        //console.log("alldata", allData, "chosenDataKey", chosenDataKey);
        if(!allData || !dataset || !chosenDataKey)
            return ;
        chosenDataKey.map((item) => {
            resData = [...resData, {
                id: item,
                label: dataset==='cancer'? allData[item].fields.diagnosis:allData[item].fields.label,
                sv: compensationValue.sv[item],
                price: compensationValue.price[item],
            }]
        });
        this.setState({ compensationData: resData});
        //this.setState({ imgname: compensationValue.name });
        this.setState({ imgName: compensationValue.name});
    }


    render() {

        //数据表所需
        const { dataset, allData, loadingTable } = this.state;
        //console.log("再次确认传入的数据", dataset, allData)

        //计算compensation所需，形成参数
        const { chosenDataKey, bp, ps, eps, sample } = this.state;
        const comParams = { dataset: dataset, id:chosenDataKey, bp:bp, ps:ps , eps:eps, sample: sample};
        //console.log("计算参数comParams", comParams);

        //展示compensation所需
        const { compensationData } = this.state;

        //展示img所需
        const { imgName } = this.state;

        return (
            <div className={'panel'}>     

                <ChooseDataset chosenDataset={this.getChosenDataset}/>

                <ChooseData dataset={dataset} allData={allData} loadingTable={loadingTable} chosenData={this.getChosenDataKey}/>

                {/* <div style={{ marginTop : ( !allData ? '4%' : '9%') }}> */}
                <div style={{ marginTop : '4%' }}>
                    <Row gutter={12}>
                        <BasePrice basePrice={this.getBasePrice}/>
                        <PrivacySensitivity privacySensitivity={this.getPrivacySensitivity}/>
                    </Row>
                    <Row gutter={12} style={{ marginTop: '2%'}}>
                        <Epsilon epsilon={this.getEpsilon}/>
                        <SampleNumber sampleNumber={this.getSampleNumber}/>
                    </Row>
                </div>

                <CompensationAlg comParams={comParams} compensationValue={this.getCompensationData}/>
                
                <Divider orientation="middle"></Divider>
                
                <CompensationData compensationData={compensationData}/>

                <div style={{ margin: !compensationData? '9% auto 0':'5% auto 0' }} >
                    <p className={'optionName'} style={{marginBottom:'0%'}}>Shapley Value ：</p>
                    <Image width={'100%'} height={"50%"} src={ imgName === ''? "http://47.114.83.154/images/empty.svg": `http://47.114.83.154/images/${imgName}.svg`}/>
                    {/* <Image width={'100%'} height={"50%"} src={ imgnameRandom === ''? "http://47.114.83.154/empty.svg": `http://47.114.83.154/sv.svg?${imgnameRandom}`}/> */}
                    {/* <Image width={'100%'} src={ imgname === ''? "http://59.111.99.144/empty.svg":"http://59.111.99.144/" + imgname +".svg"}/> */}
                </div>
                

            </div>
        )
    }
}
