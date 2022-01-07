import React, { Component } from 'react'
import { InputNumber } from 'antd'
import '../../style/buyer.css'

export default class BuyerParams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budget: props.inputs.budget, 
            covexp: props.inputs.covexp, 
            covsen: props.inputs.covsen, 
            noiexp: props.inputs.noiexp, 
            noisen: props.inputs.noisen, 
        }
    }

    onChangeTB = (value) => {
        this.setState({budget:value});
        this.props.handleInputTB(value);
    }

    onChangeCE = (value) => {
        this.setState({covexp:value});
        this.props.handleInputCE(value);
    }
    
    onChangeCS = (value) => {
        this.setState({covsen:value});
        this.props.handleInputCS(value);
    }

    onChangeNE = (value) => {
        this.setState({noiexp:value});
        this.props.handleInputNE(value);
    }

    onChangeNS = (value) => {
        this.setState({noisen:value});
        this.props.handleInputNS(value);
    }
    
    render() {

        const { budget, covexp, covsen, noiexp, noisen } = this.state;

        return (
            <div style={{marginTop:'0.4rem'}}>
                {/* <span className="lineTitle">Enter the Options ：</span> */}
                <span className="lineTitle">请输入参数 ：</span>
                <div style={{padding:'8% 1%'}}>
                    <div className="inputLine">
                        {/* <p className="inputP">Total Budget ：</p> */}
                        <p className="inputP">总预算 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} precision={2}
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')} defaultValue={budget}
                            onChange={this.onChangeTB} />
                    </div>
                    <div className="inputLine">
                        {/* <p className="inputP">Coverage Expectation ：</p> */}
                        <p className="inputP">覆盖期望值 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={covexp}
                            onChange={this.onChangeCE} />
                    </div>
                    <div className="inputLine">
                        {/* <p className="inputP">Coverage Sensitivity ：</p> */}
                        <p className="inputP">覆盖敏感度 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={covsen}
                            onChange={this.onChangeCS} />
                    </div>
                    <div className="inputLine">
                        {/* <p className="inputP">Noise Expectation ：</p> */}
                        <p className="inputP">噪声期望值 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={noiexp}
                            onChange={this.onChangeNE} />
                    </div>
                    <div className="inputLine">
                        {/* <p className="inputP">Noise Sensitivity ：</p> */}
                        <p className="inputP">噪声敏感度 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={noisen}
                            onChange={this.onChangeNS} />
                    </div>
                </div>
            </div>
        )
    }
}
