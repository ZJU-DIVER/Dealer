import React, { Component } from 'react'
import { InputNumber, Col } from 'antd'

export default class BrokerBudget extends Component {

    onChange = (value) => {
        this.props.budget(value);
    }

    render() {
        return (
            <div className={'singleDisplayGrid'} style={{textAlign:'center'}}>
                <p className={'optionName'}>Enter Budget ：</p>
                <InputNumber style={{ width: '100%' }} min={0} step={0.01} precision={2}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange} placeholder='Enter Your Budget'/>
            </div>
            // <Col span={24}>
            //     <p className={'optionName'}>Enter Budget ：</p>
            //     <InputNumber style={{ width: '100%' }} min={0} step={0.01} precision={2}
            //         formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            //         parser={value => value.replace(/\$\s?|(,*)/g, '')}
            //         onChange={this.onChange} placeholder='Enter Your Budget'/>
            // </Col>
        )
    }
}
