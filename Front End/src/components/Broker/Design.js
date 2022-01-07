import React, { Component } from 'react'
import { InputNumber, Select, Switch, message } from 'antd'
import axios from 'axios'
import DesignPopup from './DesignPopup'
import Modal from '../Modal'

const { Option } = Select
const column = [
    {title:"id", dataIndex: "id"},
    {title:"噪声", dataIndex: "epsilon"},
    {title:"准确率", dataIndex: "accuracy"},
    {title:"覆盖率", dataIndex: "coverage"},
    {title:"价格", dataIndex: "price"},
]
export default class Design extends Component {

    state = {
        algo: '',
        // budget: 1000,
        budget: '',
        checked: false,
        loadingAlg: false,
        ampRes: '',
        showModal: false,
    }

    //调用AMP算法
    calAMP = () => {
        this.setState({ loadingAlg: true});
        const ampParams = this.formAMPParams();
        if(!ampParams ||!ampParams.dataset || !ampParams.shapley_mode) {
            // message.info("Please choose the dataset and AMP Algorithm");
            message.info("请选择数据集和AMP算法")
            this.setState({ loadingAlg: false});
            return ;
        }
        if(!ampParams.price || ampParams.price.length === 0) {
            // message.info("Please add survey data and find optimal pricing first");
            message.info("请先添加调研数据并寻找最佳定价")
            this.setState({ loadingAlg: false});
            return ;
        }
        if(ampParams.shapley_mode === 'ALL') {
            this.ampAllAlg(ampParams);
        } else {
            this.ampShapleyAlg(ampParams);
        }

    }

    //选择了all算法
    ampAllAlg = (ampParams) => {
        axios.post('/dealer/amp',{
            dataset: ampParams.dataset,
            num_repeats: 1,
            epsilon: ampParams.epsilon,
        }).then(
            response => {
                //console.log("请求all成功", response.data.payload);
                let res = [], i = 0;
                ampParams.price.map((item) => {
                    res = [...res, {
                        id: i,
                        epsilon: ampParams.epsilon[i],
                        coverage: 1,
                        price: ampParams.price[i],
                    }];
                    i++;
                    return 0;
                })
                this.setState({ampRes:res})
                this.setState({ loadingAlg: false});
            },
            error => {
                // console.log("请求all失败", error);
                this.setState({ampRes:''})
                // message.info('No result');
                message.info("无计算结果")
                this.setState({ loadingAlg: false});
            }
        )
    }

    //选择了其他算法
    ampShapleyAlg = (ampParams) => {
        if(ampParams.budget === 0 || ampParams.shapley_mode === null || ampParams.budget === null 
            || ampParams.bp === null || ampParams.ps === null ) {
            // message.info("Please enter the budget/ base price/ privacy sensitivity");
            message.info("请输入预算/基本价/隐私敏感度")
            this.setState({ loadingAlg: false});
            return ;
        }
        axios.post('/dealer/amp_shapley',{
            dataset: ampParams.dataset,
            shapley_mode: ampParams.shapley_mode,
            num_repeats: 1,
            epsilon: ampParams.epsilon,
            price: ampParams.price,
            budget: ampParams.budget,
            bp: ampParams.bp,
            ps: ampParams.ps
        }).then(
            response => {
                //console.log("请求"+ampParams.shapley_mode+"成功", response.data.payload);
                this.setState({ampRes: response.data.payload})
                this.setState({ loadingAlg: false});
            },
            error => {
                // console.log("请求"+ampParams.shapley_mode+"失败", error);
                this.setState({ampRes:''})
                // message.info('No result');
                message.info("无计算结果")
                this.setState({ loadingAlg: false});
            }
        )
    }

    //格式化AMP算法参数
    formAMPParams = () => {
        const { budget, algo } = this.state;
        const { price, dataset, bp, ps } = this.props;
        // console.log("AMP参数1:", " price--", price, " budget--", budget, " algo--", algo, " dataset--", dataset, " bp--", bp, " ps--",ps);
        let ampParams = [];
        if(!price || !dataset)
            return ;
        let eps = [], p = [];
        price.map((item) => {
            eps = [...eps, item[0]];
            p = [...p, item[1]];
            return 0;
        });
        ampParams = {
            dataset: dataset,
            shapley_mode: algo,
            epsilon: eps,
            price: p,
            budget: budget,
            bp: bp,
            ps: ps
        };
        // console.log("AMP参数2",ampParams);
        return ampParams;
    }

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

    //获取AMP算法名称
    onChangeAlgo = (value) => {
        this.setState({algo:value});
    }

    //获取输入的预算值
    onChangeBudget = (value) => {
        this.setState({budget:value});
    }

    //判断每个参数是否都不为空
    isDisabled = () => {
        let isDisabled = false;
        const { budget, algo } = this.state
        if(budget === null || algo === null || algo === '') {
            isDisabled = true;
        }
        return isDisabled;
    }
    
    //在页面展示样本数据
    getSample = (rawData) => {
        let sampleData = [];
        // console.log("rawData", rawData);
        if(rawData.length!==0) {
            for (let i = 0; i < 3; i++) {
                if(rawData.length>i) {
                    rawData[i].accuracy = Number(rawData[i].accuracy).toFixed(3);
                    rawData[i].coverage = Number(rawData[i].coverage).toFixed(3);
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

        const { budget, loadingAlg, checked, ampRes } = this.state;
        const isDisabled = this.isDisabled();

        const sampleData = this.getSample(ampRes).map((row, index) => (
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
                    <DesignPopup modelData={ampRes} closeModal={this.handleHide}/>
                </div>
            </Modal>
        ) : null;

        return (
            <div>
                <div className="line" style={{marginTop:'0.1rem'}}>
                    <span className="lineTitle" style={{width:'40%',float:'left', textAlign:'left'}}>
                        {/* Choose AMP Algorithm :  */}
                        选择AMP算法 ：
                    </span>
                    <div style={{width:'60%',float:'right'}}>
                        <Select className="selectBroker" onChange={this.onChangeAlgo} size="small">
                            <Option value="GREEDY">GREEDY</Option>
                            <Option value="DP">DP</Option>
                            <Option value="GUE-GRD">GUE-GRD</Option>
                            <Option value="RANDOM">RANDOM</Option>
                        </Select>
                    </div>
                </div>
                <div className="line" style={{marginTop:'0.6rem'}}>
                    <span className="lineTitle" style={{width:'40%',float:'left', textAlign:'left'}}>
                        {/* Enter Budget ： */}
                        输入预算 ：
                    </span>
                    <div style={{width:'60%',float:'right'}}>
                        <Switch className="switchBroker" size="small" loading={loadingAlg} disabled={isDisabled}
                            checked={checked} onChange={this.calAMP}/>
                        <InputNumber className="inputBroker" size="small" min={0} step={0.01} precision={2}
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')} defaultValue={budget}
                            onChange={this.onChangeBudget} />
                    </div>
                </div>
                <div className="line" style={{marginTop:'0.6rem'}}>
                    {/* <span className="lineTitle">Trained Models ：</span> */}
                    <span className="lineTitle">训练模型 ：</span>
                    <div className="tb tb_left">
                        <table>
                            <thead>
                                <tr className="tb_title">
                                    {column.map((col, index) => (
                                        <td key={index}>{col.title}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn-a" style={{float:'right'}} onClick={() => this.handleShow("price")}>{"详情 >"}</button>
                    {modal}
                </div>
            </div>
        )
    }
}
