import React, { Component } from 'react'
import { Col, InputNumber } from 'antd'

export default class Epsilon extends Component {

    onChange = (value) => {
        this.props.epsilon(value);
        //console.log(value);
    }

    render() {
        return (
            <Col span={12}>
                <p className={'optionName'}>Epsilon ：</p>
                <InputNumber style={{ width: '100%' }}  min={0} step={0.01}
                    onChange={this.onChange} placeholder='Enter Epsilon'/>
            </Col>
        )
    }
}
