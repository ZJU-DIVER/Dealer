import React, { Component } from 'react'
import { Col, InputNumber } from 'antd'
import PubSub from 'pubsub-js'

export default class BasePrice extends Component {

    onChange = (value) => {
        this.props.basePrice(value);
        PubSub.publish('bpMessage', value);
        //console.log(value);
    }

    render() {
        return (
            <Col span={12}>
                <p className={'optionName'}>Base Price ：</p>
                <InputNumber style={{ width: '100%' }} min={0} step={0.01} precision={2}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange} placeholder='Enter Base Price'/>
            </Col>
        )
    }
}
