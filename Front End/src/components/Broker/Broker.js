import React, { Component } from 'react'
import { Col, Divider, Image, Row } from 'antd'
import PubSub from 'pubsub-js'

import { EditableTable } from './AddData/EditableTable'
import FindOptimalPricing from './FindOptimalPricing/FindOptimalPricing'
import TrainedModel from './TrainedModel/TrainedModel'
import ChooseAMPAlg from './ChooseAMPAlg/ChooseAMPAlg'
import BrokerBudget from './BrokerBudget/BrokerBudget'
import PriceSandMaxRAlg from './PriceSandMaxRAlg/PriceSandMaxRAlg'
import RunAMPRAlg from './RunAMPAlg/RunAMPAlg'

export default class Broker extends Component {

    state = {
        surveyData: [],
        complete_ps: [],
        max_r: [],
        price: [],
        dataset: null,
        budget: null,
        ampAlg: null,
        ampAlgResult: [],
        bp: null,
        ps: null,
    }

    componentDidMount(){
		this.token = PubSub.subscribe('datasetMessage',(_,msgObj)=>{
			//console.log("订阅消息",msgObj);
            this.setState({ dataset: msgObj });
		});
        this.token1 = PubSub.subscribe('bpMessage',(_,msgObj)=>{
			//console.log("订阅消息",msgObj);
            this.setState({ bp: msgObj });
		});
        this.token2 = PubSub.subscribe('psMessage',(_,msgObj)=>{
			//console.log("订阅消息",msgObj);
            this.setState({ ps: msgObj });
		});
	}

	componentWillUnmount(){
		PubSub.unsubscribe(this.token);
        PubSub.unsubscribe(this.token1);
        PubSub.unsubscribe(this.token2);
	}

    //获取添加的surveyData
    getSurveyData = (surveyData) => {
        //console.log("父组件收到传值", surveyData);
        this.setState({surveyData});
    }
    
    //获取Complete Price Space和Max Renenue算法结果
    getPSMRAlgResult = (res) => {
        this.setState({
            complete_ps: res.complete_price_space,
            max_r: res.max_revenue,
            price: res.price,
        })
    }

    //获取输入的budget
    getBudget = (budget) => {
        //console.log("输入的budget", budget);
        this.setState({budget});
    }

    //获取选择的AMP算法
    getAMPAlg = (ampAlg) => {
        //console.log("选择的AMP算法", ampAlg);
        this.setState({ampAlg});
    }

    //AMP算法返回的结果
    getAMPAlgResult = (ampAlgResult) => {
        //console.log("AMP算法返回的结果",ampAlgResult);
        this.setState({ampAlgResult});
    }

    //格式化AMP算法参数
    formAMPParams = () => {
        const { price, budget, ampAlg, dataset, bp, ps } = this.state;
        console.log(price, budget, ampAlg, dataset, bp, ps);
        let ampParams = [];
        if(!price || !dataset)
            return ;
        let eps = [], p = [];
        price.map((item) => {
            eps = [...eps, item[0]];
            p = [...p, item[1]];
        });
        ampParams = {
            dataset: dataset,
            shapley_mode: ampAlg,
            epsilon: eps,
            price: p,
            budget: budget,
            bp: bp,
            ps: ps
        };
        //console.log("AMP参数",ampParams);
        return ampParams;
    }
    
    
    render() {
        
        const { surveyData, max_r, ampAlgResult } = this.state;
        const ampParams = this.formAMPParams();

        return (
            <div className={'panel'}>
                
                <EditableTable surveyData={ this.getSurveyData }/>

                <PriceSandMaxRAlg surveyData={surveyData} psmrAlgResult={this.getPSMRAlgResult}/>

                {/* <div style={{ margin:'9% auto 0'}}>
                    <p className={'optionName'}>Price Space ：</p>
                    <Image width={'90%'} src="./picture2.png"/>
                </div> */}

                <FindOptimalPricing max_r={max_r}/>

                <Divider orientation="middle"></Divider>

                <BrokerBudget budget={this.getBudget}/>

                <div className={'singleDisplayGrid'}>
                    <p className={'optionName'}>Choose Data Coverage Maximation Algorithm ：</p> 
                    <div style={{clear:'both'}}>
                        <Row>
                            <Col span={21}>
                                <ChooseAMPAlg ampAlg={this.getAMPAlg}/>
                            </Col>
                            <Col span={3}>
                                <RunAMPRAlg ampParams={ampParams} ampAlgResult={this.getAMPAlgResult}/>
                            </Col>
                        </Row>
                    </div>
                </div>

                <TrainedModel data={ampAlgResult}/>

            </div>
        )
    }
}
