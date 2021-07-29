import React, { Component } from 'react'
import { Col, InputNumber } from 'antd'
import PubSub from 'pubsub-js'

export default class PrivacySensitivity extends Component {

    onChange = (value) => {
        this.props.privacySensitivity(value);
        PubSub.publish('psMessage', value);
        //console.log(value);
    }

    render() {
        return (
            <Col span={12}>
                <p className={'optionName'}>Privacy Sensitivity ：</p>
                <InputNumber style={{ width: '100%' }}  min={0} step={0.01}
                    onChange={this.onChange} placeholder='Enter Privacy Sensitivity'/>
            </Col>
        )
    }
}
