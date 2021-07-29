import React, { Component } from 'react'
import { InputNumber } from 'antd'

export default class TotalBudget extends Component {

    onChange = (value) => {
        this.props.totalBudget(value);
    }
    
    render() {
        return (
            <div className={'singleDisplayGrid'} style={{textAlign:'center'}}>
                <p className={'optionName'}>Total Budget ：</p>
                <InputNumber allowClear style={{ width: '100%' }} min={0} step={0.01} precision={2}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange} placeholder='Enter Your Budget'/>
            </div>
        )
    }
}
