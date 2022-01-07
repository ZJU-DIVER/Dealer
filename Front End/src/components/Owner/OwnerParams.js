import React, { Component } from 'react'
import { InputNumber } from 'antd'

export default class OwnerParams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bp: props.inputs.bp, 
            ps: props.inputs.ps, 
            ep: props.inputs.ep, 
            sn: props.inputs.sn, 
        }
    }

    componentDidMount() {
        const { bp, ps } = this.props.inputs
        this.onChangeBP(bp);
        this.onChangePS(ps);
    }

    onChangeBP = (value) => {
        this.setState({bp:value});
        this.props.handleInputBP(value);
    }

    onChangePS = (value) => {
        this.setState({ps:value});
        this.props.handleInputPS(value);
    }
    
    onChangeEP = (value) => {
        this.setState({ep:value});
        this.props.handleInputEP(value);
    }

    onChangeSN = (value) => {
        this.setState({sn:value});
        this.props.handleInputSN(value);
    }
    
    render() {

        const { bp, ps, ep, sn } = this.state;

        return (
            <div>
                <span className="lineTitle" style={{marginTop:'-1.0rem'}}>
                    {/* Enter the Options ： */}
                    请输入参数 ：
                </span>
                <div style={{padding:'1%'}}>
                    <div className="inputLine">
                        <p className="inputP">{/*Base Price*/}基本价 ：</p> 
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} precision={2}
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')} defaultValue={bp}
                            onChange={this.onChangeBP} />
                    </div>
                    <div className="inputLine">
                        <p className="inputP">{/*Privacy Sensitivity*/}隐私敏感度 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={ps}
                            onChange={this.onChangePS} />
                    </div>
                    <div className="inputLine">
                        <p className="inputP">{/*Epsilon*/}噪声 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={ep}
                            onChange={this.onChangeEP} />
                    </div>
                    
                    <div className="inputLine">
                        <p className="inputP">{/*Sample Number*/}采样数 ：</p>
                        <InputNumber className="inputNumber" size="small" min={0} step={1} precision={0} defaultValue={sn}
                            onChange={this.onChangeSN} />
                    </div>
                </div>
            </div>
        )
    }
}
