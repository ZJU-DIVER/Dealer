import React, { Component } from 'react'
import { InputNumber } from 'antd'

export default class NoiseSens extends Component {

    onChange = (value) => {
        this.props.noiseSens(value);
    }

    render() {
        return (
            <div className={'singleDisplayGrid'} style={{textAlign:'center'}}>
                <p className={'optionName'}>Noise Sensitivity ：</p>
                <InputNumber allowClear style={{ width: '100%' }} min={0} step={0.01}
                    onChange={this.onChange} placeholder='Enter Your Noise Sensitivity'/>
            </div>
        )
    }
}
