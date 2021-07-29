import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Select } from 'antd'

const { Option } = Select

export default class ChooseDataset extends Component {

    handleChange = (value) => {
        this.props.chosenDataset(value);
        PubSub.publish('datasetMessage', value)
    }

    render() {
        return (
            <div className={'singleDisplayGrid'}>
                <p className={'optionName'}>Choose Dataset ：</p>
                <Select allowClear placeholder="Choose a Dataset" style={{ width: '100%' }} onChange={this.handleChange}>
                    <Option value="cancer">Breast Cancer</Option>
                    <Option value="iris">Iris</Option>
                    <Option value="chess">Chess</Option>
                </Select>
            </div>
        )
    }
}
