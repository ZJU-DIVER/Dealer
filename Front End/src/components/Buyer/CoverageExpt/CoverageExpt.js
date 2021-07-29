import React, { Component } from 'react'
import { InputNumber } from 'antd'

export default class CoverageExpt extends Component {

    onChange = (value) => {
        this.props.coverageExpt(value);
    }

    render() {
        return (
            <div className={'singleDisplayGrid'} style={{textAlign:'center'}}>
                <p className={'optionName'}>Coverage Expectation ：</p>
                <InputNumber allowClear style={{ width: '100%' }} min={0} step={0.01}
                    onChange={this.onChange} placeholder='Enter Your Coverage Expectation'/>
            </div>
        )
    }
}
