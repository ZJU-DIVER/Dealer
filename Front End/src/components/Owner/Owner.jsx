import React, { Component } from 'react'
import { Switch, message } from 'antd'
import axios from 'axios'
import '../../style/general.css'
import '../../style/owner.css'
import ChooseDataset from '../ChooseDataset'
import SelectData from './SelectData'
import OwnerParams from './OwnerParams'

const cancerColumns = [
    'radius_mean',
    'texture_mean',
];

const chessColumns = [
    'arr1',
    'arr2',
];

const irisColumns = [
    'sepallength',
    'sepalwidth',
];

export default class Owner extends Component {

    state = {
        dataset: null,
        allData: [],
        selectedData: [0, 1, 4, 5, 8, 9, 12, 13, 16, 17, 44, 45, 48, 49, 58, 59, 62, 63, 64, 65],    //预设值
        loadingTable: false,
        bp: '',
        ps: '',
        ep: '',
        sn: '',
        // bp: 1000,
        // ps: 0.4,
        // ep: 0.1,
        // sn: 20,
        checked: false,
        loadingAlg: false,
        compensation: null,
    }

    //接收组件返回的数据集名称
    getChosenDataset = (dataset) => {
        this.setState({dataset});
        this.props.handleDataset(dataset);
        this.getAllData(dataset);
    }

    //发送请求获取数据
    getAllData = (dataset) => {
        this.setState({loadingTable:true});
        axios.get(`/dealer/${dataset}/all`).then(
			response => {
                this.setState({dataset:dataset, allData:response.data.payload, loadingTable:false});
                //console.log("请求成功，向数据表传入的数据 in getAllData", this.state.dataset, this.state.allData);
            },
		    error => {
                // console.log("获取数据失败，向数据表传入的数据 in getAllData", this.state.dataset, this.state.allData);
            }
        )
    }

    //获取已选数据
    getSelectedData = (selectedData) => {
        // console.log("Owner收到选取的数据", selectedData);
        this.setState({selectedData});
    }

    //获取输入的bp
    getInputBP = (bp) => {
        this.setState({bp});
        this.props.handleBp(bp);
    }

    //获取输入的ps
    getInputPS = (ps) => {
        this.setState({ps});
        this.props.handlePs(ps);
    }

    //获取输入的ep
    getInputEP = (ep) => {
        this.setState({ep})
    }

    //获取输入的sn
    getInputSN = (sn) => {
        this.setState({sn})
    }

    //计算compensation
    calCompensation = (checked) => {
        // console.log(checked);
        //设置开关
        this.setState({checked});
        if(!checked){
            return ;
        }
        //开关打开则发送请求
        this.setState({loadingAlg: true});
        const { dataset, selectedData, bp, ps, ep, sn } = this.state
        //未选中数据
        if(selectedData.length === 0) {
            // message.info("Please select the data");
            message.info("请选取数据")
            this.setState({loadingAlg:false, checked:false,});
            return ;
        }
        axios.post('/dealer/shapley', {
            "dataset": dataset,
            "id": selectedData,
            "bp": bp,
            "ps": ps,
            "eps": ep,
            "sample": sn
        }).then(
            response => {
                // console.log("计算Compensation成功，返回值", response.data);
                this.setState({loadingAlg:false, checked:false, compensation: response.data.payload});
                this.formSV(response.data.payload, selectedData);
            },
            error => {
                // console.log("计算Compensation失败", error);
                this.setState({loadingAlg:false, checked:false});
            }
        );
    }

    //判断每个参数是否都不为空
    isDisabled = () => {
        let isDisabled = false;
        const { dataset, bp, ps, ep, sn } = this.state
        if(dataset === null || bp === null || ps === null|| ep === null || sn === null ) {
            isDisabled = true;
        }
        return isDisabled;
    }

    //发送给子组件的参数
    formParams = () => {
        const { bp, ps, ep, sn } = this.state
        const inputParams = {
            bp: bp,
            ps: ps,
            ep: ep,
            sn: sn
        }
        return inputParams;
    }

    //将Shapley图表需要的参数传过去
    formSV = (payload, selectedData) => {
        const { allData, dataset } = this.state;
        const column = (dataset === 'cancer'? cancerColumns : 
            dataset === 'chess' ? chessColumns : irisColumns);
        let items = [];
        selectedData.map((id, index) => {
            items = [ ...items, {
                x_axis: allData[id].fields[column[0]],
                y_axis: allData[id].fields[column[1]],
                id: id,
                sv: payload.sv[id],
                price: payload.price[id],
                label: allData[id].fields.label === 1 ? 'P':'N'
            }];
            return 0;
        });
        let shapv = {};
        shapv.x = column[0];
        shapv.y = column[1];
        shapv.items = items;
        this.props.handelSV(shapv);
        // console.log("Owner打包过去的ShapleyValue:", shapv);
    }
    

    render() {

        const { dataset, allData, loadingTable, selectedData, loadingAlg, checked} = this.state;
        
        const inputParams = this.formParams();
        const isDisabled = this.isDisabled();
        
        // console.log(isDisabled)
        
        return (
            <div>
                <div className="boxall" style={{height:'46rem'}}>
                    <div className="alltitle">数据拥有者</div>
                    <div className="line">
                        <ChooseDataset chosenDataset={this.getChosenDataset}/>
                    </div>
                    <div className="line">
                        <SelectData dataset={dataset} allData={allData} selectedData={selectedData} 
                        handleSelect={this.getSelectedData} loadingTable={loadingTable}/>
                    </div>
                    <div className="line">
                        <OwnerParams inputs={inputParams} handleInputBP={this.getInputBP} handleInputPS={this.getInputPS}
                            handleInputEP={this.getInputEP} handleInputSN={this.getInputSN}/>
                    </div>
                    <div className="line">
                        <span className="lineTitle" style={{marginTop:'-0.0rem'}}>
                            {/* Check Out the Compensation ： */}
                            查看补偿 ：
                        </span>
                        <div className="inputLine switchLine">
                            <Switch className="switch" size="small" loading={loadingAlg} disabled={isDisabled}
                                checked={checked} onChange={this.calCompensation}/>
                            {/* <p>Submit my own data and options to gain direct insight into data valuation.</p> */}
                            <p>提交我自己的数据和输入选项，以直接了解数据价值评估。</p>
                        </div>
                    </div>
                    <div className="boxfoot"></div>
                </div>
            </div>
        )
    }
}
