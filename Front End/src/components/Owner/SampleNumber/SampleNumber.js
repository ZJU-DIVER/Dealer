import React, { Component } from 'react'
import { Col, InputNumber } from 'antd'

export default class SampleNumber extends Component {

    onChange = (value) => {
        this.props.sampleNumber(value);
        //console.log(value);
    }

    render() {
        return (
            <Col span={12}>
                <p className={'optionName'}>Sample Number ：</p>
                <InputNumber style={{ width: '100%' }}  min={0} step={1} precision={0}
                    onChange={this.onChange} placeholder='Enter Sample Number'/>
            </Col>
        )
    }
}
