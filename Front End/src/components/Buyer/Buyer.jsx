import React, { Component } from 'react'
import axios from 'axios'
import { Switch, message } from 'antd'
import '../../style/general.css'
import '../../style/buyer.css'
import ChooseDataset from '../ChooseDataset'
import BuyerParams from './BuyerParams'
import TrainedModel from './TrainedModel'

export default class Buyer extends Component {

    state = {
        dataset: null,
        // totalBudget: 1600,
        // coverageExpt: 0.004,
        // coverageSens: 0.01,
        // noiseExpt: 0.6,
        // noiseSens: 0.01,
        totalBudget: '',
        coverageExpt: '',
        coverageSens: '',
        noiseExpt: '',
        noiseSens: '',
        modelData: [],
        loadingAlg: false,
        checked: false,
    }

    //获取数据集
    getChosenDataset = (dataset) => {
        this.setState({dataset})
    }

    //开始运行
    startAlg = (checked) => {
        this.setState({checked});
        if(!checked){
            return ;
        }
        this.setState({loadingAlg: true});
        const { dataset, totalBudget, coverageExpt, coverageSens, noiseExpt, noiseSens } = this.state;
            if( dataset===null || totalBudget===null || coverageExpt===null || 
                coverageSens===null || noiseExpt===null || noiseSens===null ) {
                this.modelAll();
                return ;
            }
        this.modelExp(dataset, totalBudget, coverageExpt, coverageSens, noiseExpt, noiseSens);
    };

    modelAll = () => {
        // message.info("Some options not filled in, all models are shown");
        message.info("一些参数未填写，查询所有模型");
        axios.get('/dealer/model/all').then(
            response => {
                // console.log("请求所有模型成功",response.data.payload);
                this.setState({ loadingAlg: false, checked: false, modelData: response.data.payload });
            },
            error => {
                // console.log("请求所有模型失败");
                this.setState({ loadingAlg: false, checked: false });            
            }
        )
    }

    modelExp = (dataset, totalBudget, coverageExpt, coverageSens, noiseExpt, noiseSens) => {
        axios.post('/dealer/model/exp', {
            "dataset": dataset,
            "budget": totalBudget,
            "covexp": coverageExpt,
            "covsen": coverageSens,
            "noiexp": noiseExpt,
            "noisen": noiseSens,
        }).then(
            response => {
                // console.log("请求预算内模型成功", response.data.payload);
                if(response.data.payload.length === 0) {
                    // message.info("There is no model satisfied");
                    message.info("未查询到符合条件的模型")
                }
                this.setState({ loadingAlg: false, checked: false, modelData: response.data.payload });
            },
            error => {
                // console.log("请求预算内模型失败");
                this.setState({ loadingAlg: false, checked: false, });
            }
        )
    }

    //创建参数
    formInputParams = () => {
        const { totalBudget, coverageExpt, coverageSens, noiseExpt, noiseSens } = this.state;
        const inputParams = {
            budget: totalBudget,
            covexp: coverageExpt,
            covsen: coverageSens,
            noiexp: noiseExpt,
            noisen: noiseSens
        }
        return inputParams;
    }

    //获取输入参数
    getInputTB = (totalBudget) => {
        this.setState({totalBudget});
    }

    getInputCE = (coverageExpt) => {
        this.setState({coverageExpt});
    }

    getInputCS = (coverageSens) => {
        this.setState({coverageSens});
    }

    getInputNE = (noiseExpt) => {
        this.setState({noiseExpt});
    }

    getInputNS = (noiseSens) => {
        this.setState({noiseSens});
    }

    render() {

        const { loadingAlg, checked, modelData } = this.state
        const inputParams = this.formInputParams();

        return (
            <div>
                <div className="boxall" style={{height:'46rem'}}>
                    <div className="alltitle">模型购买者</div>
                    <div className="line">
                        <ChooseDataset chosenDataset={this.getChosenDataset}/>
                    </div>
                    <div className="line" >
                        <BuyerParams inputs={inputParams} handleInputTB={this.getInputTB} handleInputCE={this.getInputCE}
                            handleInputCS={this.getInputCS} handleInputNE={this.getInputNE} handleInputNS={this.getInputNS}/>
                    </div>
                    <div className="line">
                        <span className="lineTitle" style={{marginTop:'-0.0rem'}}>
                            {/* Get the Released Models  ： */}
                            获取发布的模型 ：
                        </span>
                        <div className="inputLine switchLine">
                            <Switch className="switch" size="small" loading={loadingAlg}
                                checked={checked} onChange={this.startAlg}/>
                            {/* <p> Submit basic requirements and browse various versions of models to make the purchase decision.</p> */}
                            <p> 提交基本需求，浏览各版本模型以确定是否购买。</p>
                        </div>
                        <TrainedModel modelData={modelData}></TrainedModel>
                    </div>
                    <div className="boxfoot"></div>
                </div>
            </div>
        )
    }
}